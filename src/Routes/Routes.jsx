import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";
import About from "../pages/About/About";
import Course from "../pages/Course/Course";
import PrivateRoutes from "./PrivateRoutes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
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
        element: (
          <PrivateRoutes>
            <About></About>
          </PrivateRoutes>
        ),
      },
      {
        path: "/course",
        element: 
          
            <Course></Course>
         
        ,
      },
      // {
      //   path: "/blog",
      //   element: (
      //     <PrivateRoutes>
      //       <Course></Course>
      //     </PrivateRoutes>
      //   ),
      // },
    ],
  },
]);
