import React, { useContext } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { MdBookmarkAdd } from "react-icons/md";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const AllBlogs = () => {
  const axiosPublic = useAxiosPublic();

  const myBlogFn = async () => {
    const res = await axiosPublic.get("/addBlog");
    return res?.data;
  };

  const {
    data: myBlog = [],
    refetch,
    isLoading,
    isPending,
  } = useQuery({
    queryKey: ["myBlog"],
    queryFn: myBlogFn,
  });

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
        const res = await axiosPublic.delete(`/addBlog/${_id}`);
        console.log(res);

        if (res.data.deletedCount > 0) {
          refetch();
          Swal.fire("Deleted!", "Your Blog has been deleted.", "success");
        }
      }
    });
  };

  return (
    <div>
      <div className="max-w-xl mx-auto mt-28">
        <hr />
        <h1 className="text-center text-4xl font-bold mb-2">Our Blogs</h1>
        <hr />
      </div>
      <div className="grid grid-cols-1 mt-5 mb-5 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {myBlog?.map((blog) => (
          <div
            key={blog._id}
            className="mt-5 max-w-[400px] h-[525px] border bg-gray-100 "
          >
            <div>
              <div>
                <img className="h-[266px] w-full" src={blog.url} alt="" />
              </div>
              <div className="px-2">
                <h3 className="mt-4 text-lg font-semibold">{blog.title}</h3>
                <p className="mt-2 text-lg font-normal">{blog.description}</p>
                <h4 className="mt-2 text-lg font-normal">
                  <span className="font-semibold">Category</span> :{" "}
                  {blog.category}
                </h4>
              </div>
            </div>
            <div className="mt-4 px-2 items-center">
              <div className="flex gap-2">
                <img
                  className="w-10 h-10 rounded-full"
                  src={blog.UserPhoto}
                  alt=""
                />
                <h1>
                  {" "}
                  <span className="mt-2 text-xl font-medium">
                    {blog.userName}
                  </span>{" "}
                  <span className="mt-2 text-xl"> (Author)</span>{" "}
                </h1>
              </div>
              <div className="mt-2 text-xl ">Posted Date : </div>
            </div>
            <div className="my-2 mx-2">
              <div className="flex justify-between">
                <Link to={`/updateBlog/${blog._id}`}>
                  <div>
                    <button className="btn btn-sm bg-yellow-500">Edit</button>
                  </div>
                </Link>
                <div>
                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="btn btn-sm bg-red-500"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllBlogs;
