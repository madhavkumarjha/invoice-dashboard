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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {customers.map((user) => (
          // <div
          //   key={user.customer_id}
          //   className="bg-white border shadow-sm rounded-lg p-4 hover:shadow-md transition"
          // >
          //   <h2 className="text-lg font-semibold text-gray-900">
          //     {user.full_name}
          //   </h2>
          //   <p className="text-gray-500 mb-2">{user.email}</p>
          //   <div className="flex justify-between items-center mt-4">
          //     <span className="text-indigo-600 font-semibold">
          //       {user.phone_number}
          //     </span>
          //     <button
          //       onClick={() => handleEdit(user)}
          //       className="text-sm text-blue-600 hover:underline"
          //     >
          //       Edit
          //     </button>
          //     <button
          //       onClick={() => handleOpenDeleteModal(user)}
          //       className="text-sm text-blue-600 hover:underline"
          //     >
          //       Delete
          //     </button>
          //   </div>
          // </div>

          <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <div class="flex flex-col items-center pb-10 pt-2">
              <img
                class="w-24 h-24 mb-3 rounded-full shadow-lg"
                src={user.profile}
                alt="Bonnie image"
              />
              <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                {user.full_name}
              </h5>
              <div className="flex items-center justify-between gap-3">
                <span class="text-sm text-gray-500 dark:text-gray-400">
                  {user.email}
                </span>
                <span class="text-sm text-gray-500 dark:text-gray-400">
                  {user.phone_number}
                </span>
              </div>
              <span class="text-sm text-gray-500 dark:text-gray-400">
                {user.address}
              </span>
              <div class="flex mt-4 md:mt-6">
                <button
                  className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
                  onClick={() => handleEdit(user)}
                >
                  <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                    Update
                  </span>
                </button>
                <button
                  className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400"
                  onClick={() => handleOpenDeleteModal(user)}
                >
                  <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
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
        <DeleteModal
          onClose={handleCloseDeleteModal}
          // isOpen={isOpen}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}
