import React, { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const AddBlogs = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const handleAddBlog = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const category = form.category.value;
    const description = form.description.value;
    const url = form.photo.value;
    const email = user.email;
    const UserPhoto = user.photoURL;
    const userName = user.displayName;
    const postInfo = {
      title,
      category,
      url,
      description,
      email,
      UserPhoto,
      userName,
    };

    axiosPublic
      .post("/addBlog", postInfo)
      .then((res) => {
        if (res?.data?.acknowledged) {
          Swal.fire({
            title: "Success",
            text: "Your Blog Posted Successfully",
            icon: "success",
            confirmButtonText: "Done",
          }).then(() => {
            form.reset();
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="bg-[#11192BA8] py-20 mb-5  p-1 md:p-16  max-w-[1800px] m-auto">
      <h2 className="text-3xl font-extrabold text-center mb-5">
        Add Blog
      </h2>
      <form onSubmit={handleAddBlog}>
        <div className="md:flex md:mb-5">
          <div className="form-control md:w-full">
            <label className="label">
              <span className="label-text text-xl text-white">Title</span>
            </label>
            <label className="input-group  ">
              <input
                type="text"
                name="title"
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
              defaultValue="Phone"
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
                placeholder="Photo URL"
                className="input input-bordered w-full h-16 text-lg"
                required
              />
            </label>
          </div>
        </div>
        <input
          type="submit"
          value="Post Blog"
          className="btn btn-neutral w-full "
        />
      </form>
    </div>
  );
};

export default AddBlogs;
