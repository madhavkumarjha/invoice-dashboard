import React from "react";
import { Link, useNavigate } from "react-router-dom";

function InVoice() {
  return (
<div className="p-4 sm:p-6 md:p-10">
  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Invoices</h1>
    <Link to="/invoice/create"  className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-md shadow hover:scale-105 transition">
      + New Invoice
    </Link>
  </div>

  <div className="flex flex-wrap gap-3 mb-6">
    {['All', 'Paid', 'Unpaid', 'Overdue'].map((status) => (
      <button
        key={status}
        className="px-4 py-2 text-sm rounded-full border border-gray-300 hover:bg-gray-100"
      >
        {status}
      </button>
    ))}
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {[...Array(6)].map((_, index) => (
      <div
        key={index}
        className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition"
      >
        <div className="flex justify-between mb-2">
          <span className="text-gray-600 text-sm">Invoice #INV-00{index + 1}</span>
          <span className="text-sm font-medium text-yellow-600">Unpaid</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900">Acme Corporation</h3>
        <div className="text-sm text-gray-500 mt-1">Due: Aug 10, 2025</div>
        <div className="text-xl font-bold text-gray-800 mt-3">$1,200.00</div>

        <div className="flex gap-2 mt-4">
          <button className="text-indigo-600 text-sm hover:underline">View</button>
          <button className="text-green-600 text-sm hover:underline">Mark Paid</button>
          <button className="text-red-500 text-sm hover:underline">Delete</button>
        </div>
      </div>
    ))}
  </div>
</div>

  );
}

export default InVoice;
