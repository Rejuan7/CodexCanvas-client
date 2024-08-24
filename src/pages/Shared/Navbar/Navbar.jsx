import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect, useContext } from "react";
import { TfiMenuAlt } from "react-icons/tfi";
import { ImCross } from "react-icons/im";
import { AuthContext } from "../../../Providers/AuthProvider";

const Navbar = () => {
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const { user, logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };

  const controlNavbar = () => {
    if (typeof window !== "undefined") {
      if (window.scrollY > lastScrollY) {
        // if scroll down hide the navbar
        setShowNavbar(false);
      } else {
        // if scroll up show the navbar
        setShowNavbar(true);
      }
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);

      return () => {
        window.removeEventListener("scroll", controlNavbar);
      };
    }
  }, [lastScrollY]);

  const navOptions = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/blog">Blog</Link>
      </li>
      <li>
        <Link to="/course">Course</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
    </>
  );

  return (
    <div
      className={`border-b-[1px] border-b-gray-200 bg-white fixed top-0 w-full h-20 z-50 shadow-sm transition-transform duration-500 ${
        showNavbar ? "transform translate-y-0" : "transform -translate-y-full"
      } ${
        openMobileMenu &&
        "before:absolute before:bg-black before:w-screen before:h-screen before:bg-opacity-80"
      }`}
    >
      <nav className="flex items-center container mx-auto justify-between h-full text-3xl font-bold">
        <Link to="/">CodexCanvas</Link>

        {/* nav routes */}
        <motion.ul
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="items-center hidden lg:flex"
        ></motion.ul>
        <ul className="menu lg:flex  hidden menu-horizontal ">
          {navOptions}

          {user ? (
            <>
              <button onClick={handleLogOut} className="btn btn-ghost">
                LogOut
              </button>
            </>
          ) : (
            <></>
          )}
        </ul>

        <div
          onClick={() => setOpenMobileMenu(true)}
          className="block mr-5 cursor-pointer lg:hidden"
        >
          <TfiMenuAlt className="w-7 h-7" />
        </div>
      </nav>

      {/* mobile navbar(side drawer) start*/}
      <nav
        className={`fixed top-0 z-10 transition-all duration-500 h-screen lg:hidden bg-primeColor w-80 space-y-5 ${
          openMobileMenu
            ? "-translate-x-0 opacity-100"
            : "-translate-x-[110%] opacity-0"
        }`}
      >
        {/* logo */}
        <div>
          <Link to="/">
            {/* <img src={logo} alt="" className="object-cover mt-5 w-28" /> */}
          </Link>
          <div
            onClick={() => setOpenMobileMenu(false)}
            className="absolute px-3 py-4 cursor-pointer -right-8 top-5 bg-primeColor rounded-tr-md rounded-br-md"
          >
            <ImCross className="text-gray-300 " />
          </div>
        </div>

        <div className="px-5 mt-4">
          <hr />
          <ul className="text-gray-200">
            <ul className="menu px-1">{navOptions}</ul>
          </ul>
        </div>
      </nav>
      {/* mobile navbar(side drawer) end*/}
    </div>
  );
};

export default Navbar;
