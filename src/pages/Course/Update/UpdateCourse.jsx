import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateCourse = () => {
  const axiosPublic = useAxiosPublic();
  const { _id } = useParams(); 
  const navigate = useNavigate();

  const myCourseFn = async () => {
    const res = await axiosPublic.get("/course");
    return res?.data;
  };

  const {
    data: myCourse = [], 
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["myCourse"],
    queryFn: myCourseFn,
  });

//   console.log("Course ID from URL:", _id);
//   console.log("Fetched Courses:", myCourse);

  const course = myCourse.find((item) => item._id === _id);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading course data.</p>;
  if (!course) return <p>Course not found</p>;

  const handUpdateCourse = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const details = form.details.value;
    let price = form.price.value;
    const category = form.category.value;
    const duration = form.duration.value;
    const image = form.image.value;

    price = price.replace("$", "");

    const updatedCourse = {
      title,
      details,
      price,
      category,
      duration,
      image,
    };

    axiosPublic.patch(`/course/${_id}`, updatedCourse).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Course updated successfully!`,
          showConfirmButton: false,
          timer: 1500,
        }).then(() =>{
            navigate('/course')
        });
      }
    });
  };

  return (
    <div>
      <div className="mb-8 p-8 bg-gradient-to-r from-green-300 to-amber-300 rounded-lg shadow-lg max-w-2xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">Update Course</h2>
        <form onSubmit={handUpdateCourse}>
          <input
            type="text"
            name="title"
            placeholder="Course Title"
            defaultValue={course.title}
            onChange={(e) => handleChange(index, e)}
            className="w-full p-4 mb-5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <textarea
            name="details"
            placeholder="Course Details"
            defaultValue={course.details}
            onChange={(e) => handleChange(index, e)}
            className="w-full p-4 mb-5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="price"
            placeholder="Price"
            defaultValue={course.price}
            onChange={(e) => handleChange(index, e)}
            className="w-full p-4 mb-5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <select
            name="category"
            defaultValue={course.category}
            onChange={(e) => handleChange(index, e)}
            className="w-full p-4 mb-5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="" disabled>
              Select Course Category
            </option>
            <option value="Artificial Intelligence & Automation">
              Artificial Intelligence & Automation
            </option>
            <option value="Cybersecurity">Cybersecurity</option>
            <option value="Programming Languages">Programming Languages</option>
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
            defaultValue={course.duration}
            onChange={(e) => handleChange(index, e)}
            className="w-full p-4 mb-5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="url"
            name="image"
            defaultValue={course.image}
            placeholder="Image URL"
            onChange={(e) => handleChange(index, e)}
            className="w-full p-4 mb-5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full p-4 bg-blue-400 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateCourse;
