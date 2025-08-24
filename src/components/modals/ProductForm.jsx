import { IoClose } from "react-icons/io5";
import { useState, useEffect } from "react";
import { createProduct, updateProduct } from "../../firebase/product";
import { toast } from "react-hot-toast";
import ImageUploader from "../ImageUploader";
import emptyImage from "../../assets/fakeImage.png";

export default function ProductModal({ onClose, product }) {
  const isEditMode = !!product;
  // console.log(product);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: 0,
    imageUrl: "",
    // link: "",
  });

  useEffect(() => {
    if (isEditMode) {
      setFormData({
        title: product.title || "",
        description: product.description || "",
        price: product.price || 0,
        imageUrl: product.imageUrl || "",
        // link: product.link || "",
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (url) => {
    setFormData((prev) => ({
      ...prev,
      imageUrl: url,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!isEditMode) {
        await createProduct(formData);
        toast.success("product added successfully!");
      } else {
        await updateProduct(product.id, formData);
        toast.success("product updated successfully!");
      }
      onClose();
    } catch (error) {
      toast.error(
        `Something went wrong while ${
          isEditMode ? "updating" : "saving"
        } the product.`
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
      <div className="relative p-4 w-full max-w-md max-h-full overflow-y-auto scroll-smooth ">
        {/* Modal content */}
        <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
          {/* Modal header */}
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {isEditMode ? "Update product" : "New product"}
            </h3>
            <IoClose
              className="text-black cursor-pointer text-2xl"
              onClick={onClose}
              title="close"
            />
          </div>

          {/* Modal body */}
          <form className="p-4 md:p-5 ">
            <div className="flex flex-col gap-4 mb-4">
              <div className="">
                <label
                  htmlFor="title"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-start"
                >
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Tomato"
                  required
                />
              </div>
              <div className="">
                <label
                  htmlFor="description"
                  className="block mb-2 text-start text-sm font-medium text-gray-900 dark:text-white"
                >
                  description
                </label>
                <textarea
                  type="text"
                  name="description"
                  id="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="product stock location"
                  required
                />
              </div>
              <div className="">
                <label
                  htmlFor="price"
                  className="block mb-2 text-start text-sm font-medium text-gray-900 dark:text-white"
                >
                  Price
                </label>
                <input
                  type="number"
                  maxLength={6}
                  title="price"
                  name="price"
                  id="price"
                  placeholder="140"
                  value={formData.price}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  required
                />
              </div>

              <div className="flex items-center justify-between gap-2">
                <img
                  src={formData.imageUrl || emptyImage}
                  alt="Uploaded preview"
                  className="mt-4 w-40 h-40 object-cover rounded-md border"
                />
                <ImageUploader onUpload={handleImageUpload} />
              </div>
              {/* <div className="col-span-2">
                <label
                  htmlFor="link"
                  className="block mb-2 text-start text-sm font-medium text-gray-900 dark:text-white"
                >
                  Product Link
                </label>
                <input
                  id="link"
                  name="link"
                  type="url"
                  value={formData.link}
                  onChange={handleChange}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="product link"
                ></input>
              </div> */}
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
