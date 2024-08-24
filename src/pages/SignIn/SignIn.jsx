import { useContext, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet-async";

const SignIn = () => {
  const { signIn, signInWithGoogle, signInWithGitHub } =
    useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    const password = form.get("password");
    console.log(email, password);

    signIn(email, password)
      .then((result) => {
        console.log(result.user);
        e.target.reset();
        toast.success("Login successful!");
        setTimeout(function () {
          navigate("/");
          location.reload();
        }, 2000);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Password or user not correct");
      });
  };
  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        console.log(result.user);
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleGitHubSignIn = () => {
    signInWithGitHub()
      .then((result) => {
        console.log(result.user);
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };
  return (
    <div className="animate__animated animate__backInDown">
      <Helmet>
        <title>Food Unity | LogIn</title>
      </Helmet>
      <h2 className=" text-3xl font-bold text-center mb-4 mt-20">SignIn Here</h2>
      <form
        onSubmit={handleLogin}
        className="md:w-3/4 lg:w-1/2 mx-auto border-2 border-purple-500 rounded-xl p-8 "
      >
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            name="email"
            placeholder="email"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control relative">
          <label className="label">
            <span className="label-text">Password</span>
          </label>

          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="password"
            className="input input-bordered"
            required
          />
          <span
            className="absolute top-12 right-0 lg:right-4 animate__animated animate__bounceInDown text-2xl"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <RiEyeOffFill /> : <RiEyeFill />}
          </span>
        </div>

        <div className="form-control mt-6">
          <button className="btn btn-primary">Login</button>
        </div>
      </form>
      <p className=" text-xl text-center mt-3">
        Do not have an account please{" "}
        <Link className=" text-blue-600" to="/signup">
          SignUp
        </Link>
      </p>
      <p className="text-xl font-medium text-center mt-3 mb-3">Sign In with</p>
      <div className="flex justify-center mb-3">
        <p>
          <button
            onClick={handleGoogleSignIn}
            className="btn btn-ghost   text-2xl"
          >
            {" "}
            <FaGoogle />
          </button>
        </p>
        <p>
          <button
            onClick={handleGitHubSignIn}
            className="btn btn-ghost   text-2xl"
          >
            {" "}
            <FaGithub />
          </button>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignIn;
