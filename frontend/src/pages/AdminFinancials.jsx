import React, { useEffect, useState } from "react";
import "../styles/AdminFinancial.css"; // New CSS file for styling

const AdminFinancial = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // MOCK DATA — Replace later with backend call
  useEffect(() => {
    // BACKEND: Replace with API call to fetch financial data
    const mockData = [
      {
        id: 1,
        event: "Women in STEM Panel",
        organizer: "Jane Smith",
        amount: 250.0,
        date: "2025-03-15",
        status: "Paid",
      },
      {
        id: 2,
        event: "AI in Education",
        organizer: "Tech Alliance",
        amount: 180.5,
        date: "2025-03-20",
        status: "Pending",
      },
      {
        id: 3,
        event: "Career Fair 2025",
        organizer: "John Doe",
        amount: 420.75,
        date: "2025-03-10",
        status: "Paid",
      },
    ];

    setTimeout(() => {
      setTransactions(mockData);
      setLoading(false);
    }, 800);
  }, []);

  return (
    <div className="admin-financial-page animate-fadeIn">
      <h1 className="financial-heading">💰 Financial Overview</h1>
      <p className="financial-subtitle">
        Track event payments and manage organizer transactions.
      </p>

      {loading ? (
        <p className="financial-loading">Loading financial data...</p>
      ) : (
        <div className="financial-table-container">
          <table className="financial-table">
            <thead>
              <tr>
                <th>Event</th>
                <th>Organizer</th>
                <th>Amount ($)</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((txn) => (
                <tr key={txn.id}>
                  <td>{txn.event}</td>
                  <td>{txn.organizer}</td>
                  <td>${txn.amount.toFixed(2)}</td>
                  <td>{txn.date}</td>
                  <td
                    className={
                      txn.status === "Paid"
                        ? "status-paid"
                        : "status-pending"
                    }
                  >
                    {txn.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* BACKEND: Add export/report generation functionality here later */}
    </div>
  );
};

export default AdminFinancial;
