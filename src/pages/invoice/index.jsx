import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ConfirmDeleteModal from "../../components/modals/ConfirmDeleteModal";

// import { collection, doc, setDoc ,addDoc} from "firebase/firestore";
// import { db } from "../../firebase/firebaseConfig";
// import data from "../../assets/fake.json";
import {
  deleteInvoice,
  listenToInvoices,
  updateInvoiceStatusAndDueDate,
} from "../../firebase/invoice";
import { dateFormat } from "../../components/helper";
import toast from "react-hot-toast";

function InVoice() {
  //  const handleUpload = async () => {
  //     try {
  //       const products = data.products;

  //       if (!products || !Array.isArray(products)) {
  //         alert("No products found in JSON!");
  //         return;
  //       }

  //       for (const item of products) {
  //         console.log("Uploading product:", item);
  //         await addDoc(collection(db, "products"), item); // auto-generates doc ID
  //       }

  //       alert("All products uploaded successfully!");
  //     } catch (error) {
  //       console.error("Error uploading data:", error);
  //       alert("Failed to upload data.");
  //     }
  //   };

  const [invoices, setInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [deleteToggle, setDeleteToggle] = useState(false);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const unsubscribe = listenToInvoices(setInvoices);
    return () => unsubscribe();
  }, []);

  // console.log("invoices", invoices);

  function deleteToggleHandler(invoice) {
    setSelectedInvoice(invoice);
    setDeleteToggle(true);
  }

  const filteredInvoices = invoices.filter((invoice) => {
    if (filter === "All") return true;
    return invoice.status?.toLowerCase() === filter.toLowerCase();
  });

  async function handleDeleteInvoice() {
    if (!selectedInvoice) return;
    try {
      await deleteInvoice(selectedInvoice.id);
      toast.success("Invoice deleted successfully");
      console.log("Deleting invoice:", selectedInvoice);
      setDeleteToggle(false);
      setSelectedInvoice(null);
    } catch (error) {
      toast.error("Failed to delete invoice");
      console.error("Error deleting invoice:", error);
    }
  }

  async function handleUpdateInvoice(id) {
    if (!id) return;
    try {
      await updateInvoiceStatusAndDueDate(id);
      toast.success("Invoice status updated to Paid");
      console.log("Updating invoice:", selectedInvoice);
    } catch (error) {
      toast.error("Failed to update invoice");
      console.error("Error updating invoice:", error);
    }
  }

  function handleCloseModal() {
    setDeleteToggle(false);
    setSelectedInvoice(null);
  }

  return (
    <div className="p-4 sm:p-6 md:p-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Invoices
        </h1>
        <Link
          to="/invoice/create"
          className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-md shadow hover:scale-105 transition"
        >
          + New Invoice
        </Link>
        {/* <button onClick={handleUpload}>Upload JSON to Firestore</button> */}
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        {["All", "Paid", "Unpaid", "Pending"].map((status, index) => (
          <button
            key={index}
            className={`px-4 py-2 text-sm rounded-full border 
        ${
          filter === status
            ? "bg-indigo-100 border-indigo-400"
            : "border-gray-300"
        }
        hover:bg-gray-100`}
            onClick={() => setFilter(status)}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredInvoices.map((invoice) => (
          <div
            key={invoice.id}
            className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition"
          >
            <div className="flex justify-between mb-2">
              <span className="text-gray-600 text-sm">
                Invoice #{invoice.invoice_no || "INV-00"}
              </span>
              <span className="text-sm font-medium text-yellow-600">
                {invoice.status}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              {invoice.client.name || "Client Name"}
            </h3>
            <div className="text-sm text-gray-500 mt-1">
              {" "}
              {invoice.status + " :: " + dateFormat(invoice.invoice_date)}
            </div>
            <div className="text-xl font-bold text-gray-800 mt-3">
              ₹{invoice.total_price}
            </div>

            <div className="flex gap-2 mt-4">
              <button
                type="button"
                className="text-indigo-600 text-sm hover:underline"
              >
                View
              </button>
              {invoice.status !== "Paid" && (
                <button
                  type="button"
                  onClick={() => handleUpdateInvoice(invoice.id)}
                  className="text-green-600 text-sm hover:underline"
                >
                  Mark Paid
                </button>
              )}

              {/* <button type="button"  className="text-green-600 text-sm hover:underline">
                Mark Paid
              </button> */}
              <button
                onClick={() => deleteToggleHandler(invoice)}
                type="button"
                className="text-red-500 text-sm hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {deleteToggle && (
        <ConfirmDeleteModal
          onClose={handleCloseModal}
          onConfirm={handleDeleteInvoice}
          type="invoice"
        />
      )}
    </div>
  );
}

export default InVoice;
