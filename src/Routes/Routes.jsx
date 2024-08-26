import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";
import About from "../pages/About/About";
import Course from "../pages/Course/Course";
import PrivateRoutes from "./PrivateRoutes";
import UpdateCourse from "../pages/Course/Update/UpdateCourse";
import ErrorPage from "../ErrorPage/ErrorPage";
import AddBlogs from "../Blogs/AddBlogs/AddBlogs";
import AllBlogs from "../Blogs/AllBlogs/AllBlogs";
import UpdateBlog from "../Blogs/UpdateBlog/UpdateBlog";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/signin",
        element: <SignIn></SignIn>,
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "/about",
        element: <About></About>
      },
      {
        path: "/course",
        element: <Course></Course>,
      },
      {
        path:'/update/:_id',
        element: <UpdateCourse></UpdateCourse>
      },
      {
        path: '/addBlog',
        element: <AddBlogs></AddBlogs>
      },
      {
        path: '/blog',
        element: <AllBlogs></AllBlogs>
      },
      {
        path: '/updateBlog/:_id',
        element: <UpdateBlog></UpdateBlog>
      }
    ],
  },
]);
