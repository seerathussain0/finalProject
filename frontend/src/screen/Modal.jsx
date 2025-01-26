import React, { useState } from "react";
import { motion } from "framer-motion";

const Modal = () => {
  const [formData, setFormData] = useState({
    cnic: "",
    email: "",
    name: "",
  });

  // Function to handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    alert("Details submitted successfully!");
    // Clear the form
    setFormData({ cnic: "", email: "", name: "" });
  };

  return (
    <div>
      <motion.div
        className="fixed inset-0 px-3 bg-gray-900 bg-opacity-50 flex justify-center items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white p-8 rounded-lg w-96 shadow-xl"
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          exit={{ y: -50 }}
        >
          <h3 className="text-2xl font-bold mb-4 text-center">Enter Details</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="cnic" className="block text-gray-700 font-semibold">
                CNIC
              </label>
              <input
                type="text"
                id="cnic"
                name="cnic"
                value={formData.cnic}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg shadow-sm"
                placeholder="Enter CNIC"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-semibold">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg shadow-sm"
                placeholder="Enter Email"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-semibold">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg shadow-sm"
                placeholder="Enter Name"
                required
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-blue-600 text-white font-bold px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Modal;
