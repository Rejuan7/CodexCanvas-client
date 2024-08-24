import { useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const About = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    designation: "",
    currentInstitute: "",
    _id: "", // Keep the _id here for internal use
  });

  const axiosPublic = useAxiosPublic();

  const { data: admins = [], refetch } = useQuery({
    queryKey: ["admin"],
    queryFn: async () => {
      const res = await axiosPublic.get("/admin");
      return res.data;
    },
  });

  const handleEditToggle = (adminData) => {
    setIsEditing(!isEditing);

    if (!isEditing) {
      setFormData({
        companyName: adminData.companyName || "",
        designation: adminData.designation || "",
        currentInstitute: adminData.currentInstitute || "",
        _id: adminData._id || "", // Set the _id internally
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = async () => {
    try {
      const response = await axiosPublic.patch(`/admin/${formData._id}`, {
        companyName: formData.companyName,
        designation: formData.designation,
        currentInstitute: formData.currentInstitute,
      });

      console.log("Profile saved:", response.data);

      if (response.status === 200) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Profile Updated Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      }

      setIsEditing(false);
      refetch();
    } catch (error) {
      console.error(
        "Error saving profile:",
        error.response ? error.response.data : error.message
      );
    }
  };

  if (admins.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 shadow-2xl rounded-lg p-8">
        {admins.map((adminData) => (
          <div
            key={adminData._id}
            className="flex flex-col lg:flex-row lg:space-x-6 items-center mb-12"
          >
            <div className="w-full lg:w-1/3 flex justify-center lg:justify-start">
              <img
                className="h-32 w-32 rounded-full object-cover border-4 border-white shadow-md transition-transform transform hover:scale-105 duration-300"
                src={adminData.photoURL}
                alt="Admin"
              />
            </div>
            <div className="w-full lg:w-2/3 mt-6 lg:mt-0">
              <h1 className="text-4xl font-extrabold text-white mb-2">
                {adminData.displayName}
              </h1>
              <p className="text-lg text-gray-200 mb-4">{adminData.email}</p>

              {isEditing && formData._id === adminData._id ? (
                <>
                  <div className="mb-4">
                    <label
                      className="block text-sm font-medium text-gray-200"
                      htmlFor="companyName"
                    >
                      Company Name
                    </label>
                    <input
                      required
                      type="text"
                      name="companyName"
                      placeholder="Company Name"
                      value={formData.companyName}
                      onChange={handleChange}
                      className="mt-1 block w-full p-3 border border-gray-400 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-sm font-medium text-gray-200"
                      htmlFor="designation"
                    >
                      Designation
                    </label>
                    <input
                      required
                      type="text"
                      name="designation"
                      placeholder="Designation"
                      value={formData.designation}
                      onChange={handleChange}
                      className="mt-1 block w-full p-3 border border-gray-400 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-sm font-medium text-gray-200"
                      htmlFor="currentInstitute"
                    >
                      Current Study Institute
                    </label>
                    <input
                      required
                      type="text"
                      name="currentInstitute"
                      placeholder="Current Study Institute"
                      value={formData.currentInstitute}
                      onChange={handleChange}
                      className="mt-1 block w-full p-3 border border-gray-400 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                </>
              ) : (
                <>
                  {adminData.companyName && (
                    <p className="text-lg text-gray-200 mt-2">
                      <span className="font-semibold">Company:</span>{" "}
                      {adminData.companyName}
                    </p>
                  )}
                  {adminData.designation && (
                    <p className="text-lg text-gray-200 mt-2">
                      <span className="font-semibold">Designation:</span>{" "}
                      {adminData.designation}
                    </p>
                  )}
                  {adminData.currentInstitute && (
                    <p className="text-lg text-gray-200 mt-2">
                      <span className="font-semibold">
                        Current Study Institute:
                      </span>{" "}
                      {adminData.currentInstitute}
                    </p>
                  )}
                </>
              )}
            </div>
            <div>
              <div className="flex justify-end mt-6">
                {isEditing && formData._id === adminData._id ? (
                  <button
                    onClick={handleSave}
                    className="bg-white text-purple-600 px-6 py-3 rounded-lg shadow-lg hover:bg-gray-200 transition duration-300"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEditToggle(adminData)}
                    className="bg-gray-300 text-gray-800 px-6 py-3 rounded-lg shadow-lg hover:bg-gray-400 transition duration-300"
                  >
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
