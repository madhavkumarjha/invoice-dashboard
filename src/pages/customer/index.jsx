import React, { useState, useEffect } from "react";
import { deleteCustomer, listenToCustomers } from "../../firebase/customer";
import DeleteModal from "../../components/modals/deleteModal";
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

  function handleOpenDeleteModal(customer){
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {customers.map((user) => (
          <div
            key={user.customer_id}
            className="bg-white border shadow-sm rounded-lg p-4 hover:shadow-md transition"
          >
            <h2 className="text-lg font-semibold text-gray-900">
              {user.full_name}
            </h2>
            <p className="text-gray-500 mb-2">{user.email}</p>
            <div className="flex justify-between items-center mt-4">
              <span className="text-indigo-600 font-semibold">
                {user.phone_number}
              </span>
              <button
                onClick={() => handleEdit(user)}
                className="text-sm text-blue-600 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleOpenDeleteModal(user)}
                className="text-sm text-blue-600 hover:underline"
              >
                Delete
              </button>
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
        <DeleteModal
          onClose={handleCloseDeleteModal}
          // isOpen={isOpen}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}
