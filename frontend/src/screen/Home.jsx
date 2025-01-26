import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };



  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-extrabold text-white cursor-pointer">
            <Link to={"/"}>
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
                  onClick={() => navigate("/modal")} 
                  className="bg-white text-blue-600 font-semibold px-4 py-2 rounded-lg hover:bg-gray-200"
                >
                  Proceed
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>



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

        {/* Features Section */}
        <section id="features" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-extrabold text-gray-800 mb-10">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {["Easy Loan Requests", "Dynamic Loan Calculator", "Admin Dashboard"].map((feature, index) => (
                <div key={index} className="bg-white shadow-lg rounded-xl p-8">
                  <h3 className="text-2xl font-bold text-blue-600 mb-4">{feature}</h3>
                  <p className="text-gray-600">Explore how our app streamlines the loan process to save you time and effort.</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Loan Calculator Section */}
        <section id="calculator" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-extrabold text-gray-800 text-center mb-10">Loan Calculator</h2>
            <div className="bg-gray-100 p-10 rounded-xl shadow-xl">
              <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Category</label>
                  <select className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Select Category</option>
                    <option>Personal Loan</option>
                    <option>Business Loan</option>
                    <option>Education Loan</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Initial Deposit</label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter amount"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Loan Period (Years)</label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter period"
                  />
                </div>
                <div className="flex items-center">
                  <button
                    type="button"
                    className="w-full bg-blue-600 text-white font-bold px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700"
                  >
                    Calculate
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-blue-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-extrabold mb-6">Contact Us</h2>
            <p className="mb-6">Have questions? Reach out to our support team for assistance.</p>
            <button className="bg-white text-blue-600 font-bold px-8 py-4 rounded-lg shadow-lg hover:bg-gray-200">
              Contact Support
            </button>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg font-light">&copy; {new Date().getFullYear()} Saylani Loan App. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
