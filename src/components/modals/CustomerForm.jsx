import { IoClose } from "react-icons/io5";
import { useState, useEffect } from "react";
import { createCustomer, updateCustomer } from "../../firebase/customer";
import { toast } from "react-hot-toast";
import ImageUploader from "../ImageUploader";
import emptyImage from "../../assets/fakeImage.png";

export default function CustomerModal({ onClose, customer }) {
  const isEditMode = !!customer;

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    profile: "",
    phone_number: null,
    address: "",
  });

  useEffect(() => {
    if (isEditMode) {
      setFormData({
        full_name: customer.full_name || "",
        email: customer.email || "",
        profile: customer.profile || "",
        phone_number: customer.phone_number || null,
        address: customer.address || "",
      });
    }
  }, []);

  const validatePhoneNumber = (phone) => {
    const numeric = phone.replace(/\D/g, "");
    if (numeric.length !== 10) {
      toast.error("Please enter a valid 10-digit phone number");
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (url) => {
    setFormData((prev) => ({
      ...prev,
      profile: url,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validatePhoneNumber(formData.phone_number)) return;

    try {
      if (!isEditMode) {
        await createCustomer(formData);
        toast.success("Customer added successfully!");
      } else {
        await updateCustomer(customer.id, formData);
        toast.success("Customer updated successfully!");
      }
      onClose();
    } catch (error) {
      toast.error(
        `Something went wrong while ${
          isEditMode ? "updating" : "saving"
        } the customer.`
      );
      console.error(error);
    }
  };

  return (
    <div
      id="crud-modal"
      tabIndex={-1}
      aria-hidden="true"
      className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50"
    >
      <div className="relative p-4 w-full max-w-md max-h-full overflow-y-auto scroll-smooth">
        {/* Modal content */}
        <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
          {/* Modal header */}
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {isEditMode ? "Update Customer" : "New Customer"}
            </h3>
            <IoClose
              className="text-black cursor-pointer text-2xl"
              onClick={onClose}
              title="close"
            />
          </div>

          {/* Modal body */}
          <form className="p-4 md:p-5">
            <div className="grid gap-4 mb-4 grid-cols-1">
              <div className="col-span-2">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-start"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  name="full_name"
                  id="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Alex John"
                  required
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="email"
                  className="block mb-2 text-start text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="abc@mail.com"
                  required
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="phone_number"
                  className="block mb-2 text-start text-sm font-medium text-gray-900 dark:text-white"
                >
                  phone_number No.
                </label>
                <input
                  type="tel"
                  pattern="[0-9]{10}"
                  title="Enter a 10-digit phone number"
                  name="phone_number"
                  id="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  required
                />
              </div>
              <div className="flex items-center justify-between gap-2 col-span-2">
                <img
                  src={formData.profile || emptyImage}
                  alt="Uploaded preview"
                  className="mt-4 w-40 h-40 object-cover rounded-md border"
                />
                <ImageUploader onUpload={handleImageUpload} />
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="description"
                  className="block mb-2 text-start text-sm font-medium text-gray-900 dark:text-white"
                >
                  Address
                </label>
                <textarea
                  id="address"
                  rows="4"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="your address"
                ></textarea>
              </div>
            </div>
            <button
              type="submit"
              onClick={handleSubmit}
              className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {isEditMode ? "Update" : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
