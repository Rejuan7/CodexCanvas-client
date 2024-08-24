
import { FaGithub, FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";

const SocialLogin = () => {
  const { googleSignIn, githubSignIn } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    googleSignIn().then((result) => {
      console.log(result.user);
      const userInfo = {
        role: "member",
        email: result.user?.email,
        name: result.user?.displayName,
      };
      axiosPublic.post("/users", userInfo).then((res) => {
        console.log(res.data);
        navigate("/");
      });
    });
  };
  const handleGithubSignIn = () => {
    githubSignIn().then((result) => {
      console.log(result.user);
      const userInfo = {
        role: "member",
        email: result.user?.email,
        name: result.user?.displayName,
      };
      axiosPublic.post("/users", userInfo).then((res) => {
        console.log(res.data);
        navigate("/");
      });
    });
  };

  return (
    <div className="p-8">
      <div className="divider"></div>
      <div>
        <button onClick={handleGoogleSignIn} className="btn mr-8">
          <FaGoogle className="mr-2"></FaGoogle>
          Google
        </button>
        <button onClick={handleGithubSignIn} className="btn">
          <FaGithub className="mr-2"></FaGithub>
          GitHub
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
