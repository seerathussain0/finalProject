import React from "react";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="bg-white shadow-md p-4 rounded-md mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-gray-600">Manage loan applications and appointments</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-4 rounded-md shadow-md">
          <h2 className="text-gray-700 font-semibold">Total Applications</h2>
          <p className="text-3xl font-bold text-blue-600">320</p>
        </div>
        <div className="bg-white p-4 rounded-md shadow-md">
          <h2 className="text-gray-700 font-semibold">Approved Loans</h2>
          <p className="text-3xl font-bold text-green-600">145</p>
        </div>
        <div className="bg-white p-4 rounded-md shadow-md">
          <h2 className="text-gray-700 font-semibold">Pending Applications</h2>
          <p className="text-3xl font-bold text-yellow-600">80</p>
        </div>
        <div className="bg-white p-4 rounded-md shadow-md">
          <h2 className="text-gray-700 font-semibold">Rejected Loans</h2>
          <p className="text-3xl font-bold text-red-600">95</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-md shadow-md">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Loan Applications</h2>

        <div className="flex items-center justify-between mb-4">
          <input
            type="text"
            className="border border-gray-300 rounded-md p-2 w-full lg:w-1/3"
            placeholder="Search by CNIC or Name"
          />
          <select className="border border-gray-300 rounded-md p-2 w-full lg:w-1/4">
            <option>Filter by City</option>
            <option>Karachi</option>
            <option>Lahore</option>
            <option>Islamabad</option>
          </select>
        </div>

        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-gray-600">
              <th className="border border-gray-200 p-2 text-left">Application ID</th>
              <th className="border border-gray-200 p-2 text-left">Name</th>
              <th className="border border-gray-200 p-2 text-left">Loan Type</th>
              <th className="border border-gray-200 p-2 text-left">Status</th>
              <th className="border border-gray-200 p-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {[
              {
                id: "12345",
                name: "Ali Khan",
                loanType: "Business Startup",
                status: "Pending",
              },
              {
                id: "12346",
                name: "Sara Ahmed",
                loanType: "Wedding Loan",
                status: "Approved",
              },
              {
                id: "12347",
                name: "Zain Raza",
                loanType: "Education Loan",
                status: "Rejected",
              },
            ].map((application, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border border-gray-200 p-2">{application.id}</td>
                <td className="border border-gray-200 p-2">{application.name}</td>
                <td className="border border-gray-200 p-2">{application.loanType}</td>
                <td
                  className={`border border-gray-200 p-2 ${
                    application.status === "Approved"
                      ? "text-green-600"
                      : application.status === "Rejected"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  {application.status}
                </td>
                <td className="border border-gray-200 p-2 text-center">
                  <button className="bg-green-500 text-white px-4 py-1 rounded-md hover:bg-green-600 mr-2">
                    Approve
                  </button>
                  <button className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600">
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
