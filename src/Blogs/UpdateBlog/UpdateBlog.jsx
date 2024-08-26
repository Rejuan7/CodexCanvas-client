import React from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const UpdateBlog = () => {

  const axiosPublic = useAxiosPublic();
  const { _id } = useParams(); 
  const navigate = useNavigate();

  const myCourseFn = async () => {
    const res = await axiosPublic.get("/addBlog");
    return res?.data;
  };

  const {
    data: myBlog = [], 
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["myBlog"],
    queryFn: myCourseFn,
  });


  const blog = myBlog.find((item) => item._id === _id);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading course data.</p>;
  if (!blog) return <p>Course not found</p>;

  const handUpdateBlog = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;
    const category = form.category.value;
    const url = form.photo.value;
  

    const updatedBlog = {
      title,
      category,
      url,
      description,
    };

    axiosPublic.patch(`/addBlog/${_id}`, updatedBlog).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Blog updated successfully!`,
          showConfirmButton: false,
          timer: 1500,
        }).then(() =>{
            navigate('/blog')
        });
      }
    });
  };


  return (
    <div>
      <div className="bg-[#11192BA8] py-20 mb-5  p-1 md:p-16  max-w-[1800px] m-auto">
        <h2 className="text-3xl font-extrabold text-center  mb-5">
          Add Blog
        </h2>
        <form onSubmit={handUpdateBlog}>
          <div className="md:flex md:mb-5">
            <div className="form-control md:w-full">
              <label className="label">
                <span className="label-text text-xl text-white">Title</span>
              </label>
              <label className="input-group  ">
                <input
                  type="text"
                  name="title"
                  defaultValue={blog.title}
                  placeholder="Title"
                  className="input w-full h-16  input-bordered  text-lg "
                  required
                />
              </label>
            </div>

            <div className="form-control  md:w-full md:ml-4">
              <label className="label">
                <span className="label-text text-xl text-white">
                  Select Category
                </span>
              </label>
              <select
                defaultValue={blog.category}
                name="category"
                className="select text-lg select-bordered join-item w-full h-16 "
              >
                <option value="Travel Adventures">Travel Adventures</option>
                <option>Health and Wellness</option>
                <option>Lifestyle and Fashion</option>
                <option>Cooking and Recipes</option>
              </select>
            </div>
          </div>
          <div className="md:flex md:mb-8">
            <div className="form-control md:w-1/2 ">
              <label className="label">
                <span className="label-text text-xl text-white ">
                  Description
                </span>
              </label>
              <label className="input-group">
                <input
                  type="text"
                  name="description"
                  defaultValue={blog.description}
                  placeholder="text...."
                  className="input input-bordered  w-full h-16 text-lg  "
                  required
                />
              </label>
            </div>
            <div className="form-control md:w-1/2 md:ml-4">
              <label className="label">
                <span className="label-text text-xl text-white">Photo URL</span>
              </label>
              <label className="input-group">
                <input
                  type="text"
                  name="photo"
                  defaultValue={blog.url}
                  placeholder="Photo URL"
                  className="input input-bordered w-full h-16 text-lg"
                  required
                />
              </label>
            </div>
          </div>
          <input
            type="submit"
            value="Update Blog"
            className="btn btn-neutral w-full "
          />
        </form>
      </div>
    </div>
  );
};

export default UpdateBlog;
