import React, { useState } from "react";

const LoanFormPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    cnic: "",
    email: "",
    address: "",
    phone: "",
    loanAmount: "",
    category: "",
    subCategory: "",
    loanPeriod: "",
    initialDeposit: "",
    guarantor1: { name: "", email: "", cnic: "", location: "" },
    guarantor2: { name: "", email: "", cnic: "", location: "" },
  });

  // Loan categories and subcategories
  const categories = {
    "Wedding Loans": ["Valima", "Furniture", "Valima Food", "Jahez"],
    "Home Construction Loans": ["Structure", "Finishing", "Foundation", "Renovation"],
    "Business Startup Loans": [
      "Buy Stall",
      "Advance Rent for Shop",
      "Shop Assets",
      "Shop Machinery",
      "Marketing Budget",
    ],
    "Education Loans": ["University Fees", "Child Fees Loan", "School Supplies"],
    "Medical Loans": ["Surgery", "Medicine", "Hospital Stay", "Rehabilitation"],
    "Emergency Loans": ["Natural Disasters", "Accident Recovery", "Legal Expenses"],
  };

  // Handle category change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSubCategories(categories[category] || []);
    setFormData((prev) => ({ ...prev, category, subCategory: "" })); // Reset subcategory
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle guarantor input change
  const handleGuarantorChange = (index, name, value) => {
    setFormData((prev) => ({
      ...prev,
      [`guarantor${index}`]: {
        ...prev[`guarantor${index}`],
        [name]: value,
      },
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/api/loan/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Pass the token here
        },
        body: JSON.stringify(formData),
      });


      if (response.ok) {
        alert("Loan application submitted successfully!");
        console.log("Form Submitted: ", formData);
      } else {
        throw new Error('Failed to submit the loan application');
      }
    } catch (error) {
      console.error("Error submitting loan request", error);
      alert("Failed to submit the loan application.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Loan Application Form</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Personal Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md p-2 w-full"
                placeholder="Full Name"
                required
              />
              <input
                type="text"
                name="cnic"
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md p-2 w-full"
                placeholder="CNIC"
                required
              />
              <input
                type="email"
                name="email"
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md p-2 w-full"
                placeholder="Email"
                required
              />
              <input
                type="text"
                name="phone"
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md p-2 w-full"
                placeholder="Phone Number"
                required
              />
              <input
                type="text"
                name="address"
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md p-2 w-full sm:col-span-2"
                placeholder="Address"
                required
              />
            </div>
          </div>

          {/* Loan Details */}
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Loan Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <select
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="border border-gray-300 rounded-md p-2 w-full"
                required
              >
                <option value="">Select Loan Category</option>
                {Object.keys(categories).map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <select
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, subCategory: e.target.value }))}
                className="border border-gray-300 rounded-md p-2 w-full"
                value={formData.subCategory}
                required
                disabled={!selectedCategory}
              >
                <option value="">Select Subcategory</option>
                {subCategories.map((subCategory, index) => (
                  <option key={index} value={subCategory}>
                    {subCategory}
                  </option>
                ))}
              </select>
              <input
                type="number"
                name="loanAmount"
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md p-2 w-full"
                placeholder="Loan Amount (PKR)"
                required
              />
              <input
                type="number"
                name="loanPeriod"
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md p-2 w-full"
                placeholder="Loan Period (Months)"
                required
              />
              <input
                type="number"
                name="initialDeposit"
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md p-2 w-full"
                placeholder="Initial Deposit (PKR)"
                required
              />
            </div>
          </div>

          {/* Guarantor Information */}
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Guarantor Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Guarantor 1 */}
              <div>
                <h3 className="font-semibold text-gray-600">Guarantor 1</h3>
                <input
                  type="text"
                  onChange={(e) =>
                    handleGuarantorChange(1, "name", e.target.value)
                  }
                  className="border border-gray-300 rounded-md p-2 w-full"
                  placeholder="Full Name"
                  required
                />
                <input
                  type="email"
                  onChange={(e) =>
                    handleGuarantorChange(1, "email", e.target.value)
                  }
                  className="border border-gray-300 rounded-md p-2 w-full mt-2"
                  placeholder="Email"
                  required
                />
                <input
                  type="text"
                  onChange={(e) =>
                    handleGuarantorChange(1, "cnic", e.target.value)
                  }
                  className="border border-gray-300 rounded-md p-2 w-full mt-2"
                  placeholder="CNIC"
                  required
                />
                <input
                  type="text"
                  onChange={(e) =>
                    handleGuarantorChange(1, "location", e.target.value)
                  }
                  className="border border-gray-300 rounded-md p-2 w-full mt-2"
                  placeholder="Location"
                  required
                />
              </div>

              {/* Guarantor 2 */}
              <div>
                <h3 className="font-semibold text-gray-600">Guarantor 2</h3>
                <input
                  type="text"
                  onChange={(e) =>
                    handleGuarantorChange(2, "name", e.target.value)
                  }
                  className="border border-gray-300 rounded-md p-2 w-full"
                  placeholder="Full Name"
                  required
                />
                <input
                  type="email"
                  onChange={(e) =>
                    handleGuarantorChange(2, "email", e.target.value)
                  }
                  className="border border-gray-300 rounded-md p-2 w-full mt-2"
                  placeholder="Email"
                  required
                />
                <input
                  type="text"
                  onChange={(e) =>
                    handleGuarantorChange(2, "cnic", e.target.value)
                  }
                  className="border border-gray-300 rounded-md p-2 w-full mt-2"
                  placeholder="CNIC"
                  required
                />
                <input
                  type="text"
                  onChange={(e) =>
                    handleGuarantorChange(2, "location", e.target.value)
                  }
                  className="border border-gray-300 rounded-md p-2 w-full mt-2"
                  placeholder="Location"
                  required
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoanFormPage;
