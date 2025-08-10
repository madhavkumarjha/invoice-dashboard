import React, { useState, useEffect } from "react";
import { deleteCustomer, listenToCustomers } from "../../firebase/customer";
import ConfirmDeleteModal from "../../components/modals/ConfirmDeleteModal";
import CustomerModal from "../../components/modals/CustomerForm";
import toast from "react-hot-toast";

export default function CustomerDashboard() {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);

  useEffect(() => {
    const unsubscribe = listenToCustomers(setCustomers);
    return () => unsubscribe();
  }, []);

  function handleEdit(customer) {
    setSelectedCustomer(customer);
    setIsOpen(true);
  }

  function handleCloseModal() {
    setIsOpen(false);
    setSelectedCustomer(null);
  }

  function handleCloseDeleteModal() {
    setIsDeleteMode(false);
    setSelectedCustomer(null);
  }

  function handleOpenDeleteModal(customer) {
    setIsDeleteMode(true);
    setSelectedCustomer(customer);
  }

  async function handleDelete() {
    try {
      await deleteCustomer(selectedCustomer.id);
      handleCloseDeleteModal();
      toast.success("Customer deleted successfully");
    } catch (error) {
      toast.error("Error in deleting customer");
    }
  }

  return (
    <div className="px-6 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <span className="text-2xl font-bold  text-gray-600 dark:text-white ">
          Customer Dashboard
        </span>
        <button
          onClick={() => setIsOpen(true)}
          className="mt-4 sm:mt-0 bg-indigo-600 text-white cursor-pointer px-4 py-2 rounded hover:bg-indigo-700 transition"
        >
          + Add Customer
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {customers.map((user) => (
         <div
  key={user.id}
  className="w-full max-w-sm sm:max-w-xs md:max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 mx-auto"
>
  <div className="flex flex-col items-center pb-6 pt-4 px-4 sm:px-6">
    <img
      className="w-20 h-20 sm:w-24 sm:h-24 mb-3 rounded-full shadow-lg object-cover"
      src={user.profile}
      alt={user.full_name}
    />
    <h5 className="mb-1 text-lg sm:text-xl font-medium text-gray-900 dark:text-white text-center break-words">
      {user.full_name}
    </h5>
    
    {/* Email & phone stacked for small screens */}
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-1 sm:gap-3 mt-1">
      <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 break-all text-center">
        {user.email}
      </span>
      <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 text-center">
        {user.phone_number}
      </span>
    </div>
    
    <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 text-center break-words">
      {user.address}
    </span>

    {/* Buttons stacked on mobile, inline on larger screens */}
    <div className="flex flex-col sm:flex-row gap-2 mt-4 w-full sm:w-auto">
      <button
        className="flex-1 sm:flex-none relative inline-flex items-center justify-center p-0.5 overflow-hidden text-xs sm:text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 hover:text-white dark:text-white focus:ring-2 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
        onClick={() => handleEdit(user)}
      >
        <span className="relative w-full px-4 py-2 sm:px-5 sm:py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent text-center">
          Update
        </span>
      </button>

      <button
        className="flex-1 sm:flex-none relative inline-flex items-center justify-center p-0.5 overflow-hidden text-xs sm:text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-2 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400"
        onClick={() => handleOpenDeleteModal(user)}
      >
        <span className="relative w-full px-4 py-2 sm:px-5 sm:py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent text-center">
          Delete
        </span>
      </button>
    </div>
  </div>
</div>

        ))}
      </div>
      {isOpen && (
        <CustomerModal
          onClose={handleCloseModal}
          // isOpen={isOpen}
          customer={selectedCustomer}
        />
      )}
      {isDeleteMode && (
        <ConfirmDeleteModal
          onClose={handleCloseDeleteModal}
          // isOpen={isOpen}
          type="customer"
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}
