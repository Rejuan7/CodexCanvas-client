import React, { useState, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";

const Course = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const axiosPublic = useAxiosPublic();
  

  const handleChange = (index, e) => {
    const { name, value, files } = e.target;
    const updatedCourses = [...courses];
    updatedCourses[index] = {
      ...updatedCourses[index],
      [name]: name === "image" ? URL.createObjectURL(files[0]) : value,
    };
    setCourses(updatedCourses);
  };

  const addNewCourse = async (e) => {
    if (!user) {
      navigate("/signin");
      return;
    }
    setCourses([
      ...courses,
      {
        title: "",
        details: "",
        price: "",
        category: "",
        duration: "",
        image: "",
      },
    ]);
  };

  const handleAddCourse = async (e) => {
    if (!user) {
      navigate("/signin");
      return;
    }

    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const details = form.details.value;
    const price = form.price.value;
    const category = form.category.value;
    const duration = form.duration.value;
    const image = form.image.value;

    const newCourse = {
      title,
      details,
      price,
      category,
      duration,
      image,
    };

    const res = await axiosPublic.post("/course", newCourse);
    if (res?.data?.acknowledged) {
      Swal.fire({
        title: "Success",
        text: "Successfully added to the database",
        icon: "success",
        confirmButtonText: "Done",
      }).then(() => {
        // Reload the page after navigating
        location.reload();
      });
    }
  };

  const myCourseFn = async () => {
    const res = await axiosPublic.get("/course");
    return res?.data;
  };
  const {
    data: myCourse = [],
    refetch,
    isLoading,
    isPending,
  } = useQuery({
    queryKey: ["myCourse"],
    queryFn: myCourseFn,
  });

  if (isLoading || isPending) {
    return <Skeleton count={10}></Skeleton>;
  }

  const handleDelete = async (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosPublic.delete(`/course/${_id}`);
        console.log(res);

        if (res.data.deletedCount > 0) {
          refetch();
          Swal.fire("Deleted!", "Your Course has been deleted.", "success");
        }
      }
    });
  };

  // const addCourses = () => {
  //   if (
  //     courses.some((course) =>
  //       Object.values(course).some((field) => field === "")
  //     )
  //   ) {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Oops...",
  //       text: "Please fill in all fields to add course.",
  //       position: "top-end",
  //       timer: 1500,
  //       showConfirmButton: false,
  //     });
  //     return;
  //   }

  //   Swal.fire({
  //     position: "top-end",
  //     icon: "success",
  //     title: "Courses added successfully!",
  //     showConfirmButton: false,
  //     timer: 1500,
  //   });

  //   setCourses([]);
  // };

  return (
    <div>
      <div className="max-w-4xl mx-auto p-6">
        <hr className="mt-2 text-blue-500" />
        <h1 className="text-center text-4xl font-bold text-gray-800">
          Our Courses
        </h1>
        <hr className="mb-8 mt-2 text-blue-500" />
        <form onSubmit={handleAddCourse}>
          {courses.map((courseData, index) => (
            <div
              key={index}
              className="mb-6 p-6 bg-gray-100 rounded-lg shadow-md"
            >
              <input
                type="text"
                name="title"
                placeholder="Course Title"
                value={courseData.title}
                onChange={(e) => handleChange(index, e)}
                className="w-full p-3 mb-4 border border-gray-300 rounded"
                required
              />
              <textarea
                name="details"
                placeholder="Course Details"
                value={courseData.details}
                onChange={(e) => handleChange(index, e)}
                className="w-full p-3 mb-4 border border-gray-300 rounded"
                required
              />
              <input
                type="text"
                name="price"
                placeholder="Price"
                value={courseData.price}
                onChange={(e) => handleChange(index, e)}
                className="w-full p-3 mb-4 border border-gray-300 rounded"
                required
              />
              <select
                name="category"
                value={courseData.category}
                onChange={(e) => handleChange(index, e)}
                className="w-full p-3 mb-4 border border-gray-300 rounded"
                required
              >
                <option value="">Select Course Category</option>
                <option value="Artificial Intelligence & Automation">
                  Artificial Intelligence & Automation
                </option>
                <option value="Cybersecurity">Cybersecurity</option>
                <option value="Programming Languages">
                  Programming Languages
                </option>
                <option value="Data Science & Machine Learning">
                  Data Science & Machine Learning
                </option>
                <option value="Cloud Security">Cloud Security</option>
                <option value="Ethical Hacking">Ethical Hacking</option>
                <option value="Web Development">Web Development</option>
              </select>

              <input
                type="text"
                name="duration"
                placeholder="Duration"
                value={courseData.duration}
                onChange={(e) => handleChange(index, e)}
                className="w-full p-3 mb-4 border border-gray-300 rounded"
                required
              />
              <input
                type="url"
                name="image"
                placeholder="Image url"
                onChange={(e) => handleChange(index, e)}
                className="w-full p-3 mb-4 border border-gray-300 rounded"
                required
              />
            </div>
          ))}

          {/* Conditionally render the "Add New Course" button */}
          <div className="flex justify-center">
            {courses.length === 0 && (
              <button
                onClick={addNewCourse}
                className="w-60 bg-blue-500 text-white py-2 px-4 rounded mb-4 hover:bg-blue-600"
              >
                Add New Course
              </button>
            )}
          </div>

          {/* Show "Submit All Courses" button if there are any courses */}
          {courses.length > 0 && (
            <button className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
              Add Course
            </button>
          )}
        </form>
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:gap-10 max-w-[1300px] mx-auto my-5">
        {myCourse?.map((course) => (
          <div
            key={course?._id}
            className="card card-compact bg-base-100 w-96 shadow-xl"
          >
            <figure>
              <img className="h-[250px]" src={course?.image} alt="Shoes" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{course?.title}</h2>
              <p>
                <span className="text-lg font-medium">Category</span> :{" "}
                <span className="font-normal text-lg">{course?.category}</span>
              </p>
              <p className="text-xl font-medium">Details:</p>
              <p>{course?.details}</p>
              <p>
                <span className="text-lg font-normal">Duration</span> :{" "}
                {course?.duration}
              </p>
              <p>
                <span className="text-lg font-normal">Price</span> :{" "}
                {course?.price}
              </p>
              <div className="flex justify-between">
                <div>
                  <button className="btn p-2 btn-sm bg-green-500">
                    Buy Now
                  </button>
                </div>
                <div className="flex gap-5">
                  <Link to={`/update/${course._id}`}>
                    <div>
                      <button className="btn btn-sm bg-yellow-500">Edit</button>
                    </div>
                  </Link>
                  <div>
                    <button onClick={()=>handleDelete(course._id)} className="btn btn-sm bg-red-500">Delete</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Course;
