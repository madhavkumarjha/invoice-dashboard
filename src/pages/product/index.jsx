import React, { useState, useEffect } from "react";
import { deleteProduct, listenToProducts } from "../../firebase/product";
import ProductModal from "../../components/modals/ProductForm";
import toast from "react-hot-toast";
import ConfirmDeleteModal from "../../components/modals/deleteModal";

function ProductsDashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = listenToProducts(setProducts);

    return () => unsubscribe();
  }, []);

  function handleCloseModal() {
    setIsOpen(false);
    setSelectedProduct(null);
  }
  function handleDeleteModalClose() {
    setDeleteModalOpen(false);
    setSelectedProduct(null);
  }

  function handleEdit(product) {
    setIsOpen(true);
    setSelectedProduct(product);
  }

  function handleOpenDeleteModal(product) {
    setDeleteModalOpen(true);
    setSelectedProduct(product);
  }

  async function handleDelete() {
    try {
      await deleteProduct(selectedProduct.id);
      handleDeleteModalClose();
      toast.success("Product deleted successfully");
    } catch (error) {
      toast.error("Error in deleting product");
      console.log(error);
    }
  }

  return (
    <div className="px-6 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <span className="text-2xl font-bold  text-gray-600 dark:text-white ">
          Product Dashboard
        </span>
        <button
          onClick={() => setIsOpen(true)}
          className="mt-4 sm:mt-0 bg-indigo-600 text-white cursor-pointer px-4 py-2 rounded hover:bg-indigo-700 transition"
        >
          + Add Product
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((item) => (
          <div
            className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
            key={item.id}
          >
            <div className="flex items-center justify-between ">
              <img
                className="p-8 rounded-t-lg w-50 h-50 object-cover"
                src={item.imageUrl}
                alt="product image"
              />
              <div className="flex flex-col">
                <button
                  className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
                  onClick={() => handleEdit(item)}
                >
                  <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                    Update
                  </span>
                </button>
                <button
                  className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400"
                  onClick={() => handleOpenDeleteModal(item)}
                >
                  <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                    Delete
                  </span>
                </button>
              </div>
            </div>
            <div className="px-5 pb-5">
              <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                {item.title}
              </h5>
              <div className="flex items-center justify-between my-2">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  {item.price}
                </span>
                <a
                  target="_blank"
                  href={item.link}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Know more
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
      {isOpen && (
        <ProductModal
          onClose={handleCloseModal}
          // isOpen={isOpen}
          product={selectedProduct}
        />
      )}
      {deleteModalOpen && (
        <ConfirmDeleteModal
          onClose={handleDeleteModalClose}
          // isOpen={isOpen}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}

export default ProductsDashboard;
