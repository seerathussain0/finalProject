import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";

const Login = () => {
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false); // State for Login popup
  const [formData, setFormData] = useState({
    cnic: "",
    email: "",
    name: "",
    password: "", // Added password for registration
  });
  const [loginData, setLoginData] = useState({
    email: "",
    password: "", // Password for login
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const response = await fetch("https://final-project-backend-beige.vercel.app/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("User Registration successful!");
        setIsRegisterPopupOpen(false); // Close popup after successful submission
      } else {
        alert("Failed to register. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    console.log(loginData);

    try {
      const response = await fetch("https://final-project-backend-beige.vercel.app/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
        credentials: "include", // Ensure this is set to "include"
      });
      
      
      if (response.ok) {
        alert("Login successful!");
        setIsLoginPopupOpen(false); // Close popup after successful login
      } else {
        alert("Failed to login. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-extrabold text-white cursor-pointer">
            <Link to={'/'}>

              Saylani Loan App
            </Link>
          </h1>
          <nav>
            <ul className="flex space-x-6">
              <li><a href="#features" className="text-white text-lg hover:underline">Features</a></li>
              <li><a href="#calculator" className="text-white text-lg hover:underline">Loan Calculator</a></li>
              <li><a href="#contact" className="text-white text-lg hover:underline">Contact</a></li>
              <li>
                <button
                  onClick={() => setIsRegisterPopupOpen(true)}
                  className="bg-white text-blue-600 font-semibold px-4 py-2 rounded-lg hover:bg-gray-200"
                >
                  Proceed
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsLoginPopupOpen(true)} // Open login popup
                  className="bg-white text-blue-600 font-semibold px-4 py-2 rounded-lg hover:bg-gray-200"
                >
                  Login
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Register Popup Form */}
      {isRegisterPopupOpen && (
        <motion.div
          className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center"
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
            <form onSubmit={handleRegisterSubmit}>
              <div className="mb-4">
                <label htmlFor="cnic" className="block text-gray-700 font-semibold">CNIC</label>
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
                <label htmlFor="email" className="block text-gray-700 font-semibold">Email</label>
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
                <label htmlFor="name" className="block text-gray-700 font-semibold">Name</label>
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
              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700 font-semibold">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg shadow-sm"
                  placeholder="Enter Password"
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
      )}

      {/* Login Popup Form */}
      {isLoginPopupOpen && (
        <motion.div
          className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center"
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
            <h3 className="text-2xl font-bold mb-4 text-center">Login</h3>
            <form onSubmit={handleLoginSubmit}>
              <div className="mb-4">
                <label htmlFor="loginEmail" className="block text-gray-700 font-semibold">Email</label>
                <input
                  type="email"
                  id="loginEmail"
                  name="email"
                  value={loginData.email}
                  onChange={handleLoginChange}
                  className="w-full px-4 py-2 border rounded-lg shadow-sm"
                  placeholder="Enter Email"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="loginPassword" className="block text-gray-700 font-semibold">Password</label>
                <input
                  type="password"
                  id="loginPassword"
                  name="password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  className="w-full px-4 py-2 border rounded-lg shadow-sm"
                  placeholder="Enter Password"
                  required
                />
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-blue-600 text-white font-bold px-6 py-2 rounded-lg hover:bg-blue-700"
                >
                  Login
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-20 text-center">
          <div className="container mx-auto px-4">
            <motion.h2
              className="text-5xl font-extrabold mb-6"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Simplify Your Loan Process
            </motion.h2>
            <motion.p
              className="text-xl mb-8"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              A fast and reliable way to manage your loans with Saylani Loan App.
            </motion.p>
            <button className="bg-white text-blue-600 font-bold px-8 py-4 rounded-lg shadow-lg hover:bg-gray-200">
              Get Started
            </button>
          </div>
        </section>

        {/* Other Sections */}
        {/* ... */}
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg font-light">&copy; {new Date().getFullYear()} Saylani Loan App. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Login;
