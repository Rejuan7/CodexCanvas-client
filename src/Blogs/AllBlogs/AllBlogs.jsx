import React, { useContext } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { MdBookmarkAdd } from "react-icons/md";

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

  return (
    <div>
      {myBlog?.map((blog) => (
        <div
          key={blog._id}
          className="mt-5 max-w-[400px] h-[510px] border bg-gray-100 "
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
          <div className="mt-4 px-2 flex items-center gap-3">
            <img
              className="w-10 h-10 rounded-full"
              src={blog.UserPhoto}
              alt=""
            />
            <h1 className="flex w-1/2 justify-end cursor-pointer">
              <button>
                <MdBookmarkAdd className="text-3xl"></MdBookmarkAdd>
              </button>
            </h1>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllBlogs;
