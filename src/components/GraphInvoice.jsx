import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { listenToInvoices } from "../firebase/invoice";


function IncomeGraph() {
  const [invoices, setInvoices] = useState([]);
 useEffect(() => {
    const unsubscribe = listenToInvoices((allInvoices) => {
      // Filter only Paid invoices
      const paidInvoices = allInvoices.filter(
        (invoice) => invoice.status?.toLowerCase() === "paid"
      );

      // Map only necessary fields for graph
      const formattedData = paidInvoices.map((invoice) => ({
        date: invoice.paid_date?.split("T")[0] ,
        amount: invoice.total_price || 0,
      }));

      setInvoices(formattedData);
    });

    return () => unsubscribe();
  }, []);

  console.log("invoices", invoices);
  

  return (
    <div className="w-full bg-white rounded-2xl shadow p-4">
      <h2 className="text-lg font-semibold mb-4">Monthly Income</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={invoices}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#4F46E5"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default IncomeGraph;
