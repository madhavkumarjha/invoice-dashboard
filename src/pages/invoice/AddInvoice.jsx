import React from "react";

function AddInvoice() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Create Invoice</h2>

      <form className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <input type="text" placeholder="Client Name" className="input" />
          <input type="email" placeholder="Client Email" className="input" />
          <input type="date" placeholder="Invoice Date" className="input" />
          <input type="date" placeholder="Due Date" className="input" />
        </div>

        <div>
          <h3 className="font-medium mb-2 text-gray-700">Items</h3>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <input type="text" placeholder="Item" className="input" />
            <input type="number" placeholder="Qty" className="input" />
            <input type="number" placeholder="Price" className="input" />
            <input
              type="number"
              placeholder="Total"
              className="input"
              disabled
            />
          </div>
          <button
            type="button"
            className="mt-2 text-indigo-600 text-sm hover:underline"
          >
            + Add Item
          </button>
        </div>

        <textarea placeholder="Notes" className="input h-24 w-full" />

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-6 gap-4">
          <span className="text-xl font-semibold text-gray-800">
            Total: $0.00
          </span>
          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
          >
            Save Invoice
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddInvoice;
