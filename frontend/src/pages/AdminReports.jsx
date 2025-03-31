import React from "react";
import "../styles/AdminReports.css";

const mockEvents = [
  {
    _id: "1",
    name: "Intro to AI",
    attendees: ["user1", "user2", "user3"],
    price: 20,
  },
  {
    _id: "2",
    name: "Advanced React Workshop",
    attendees: ["user4"],
    price: 50,
  },
  {
    _id: "3",
    name: "Data Ethics Seminar",
    attendees: ["user5", "user6"],
    price: 10,
  },
];

const AdminReports = () => {
  return (
    <div className="reports-container">
      <div className="reports-wrapper">
        <h1 className="reports-title">📊 Admin Reports</h1>

        <div className="reports-table-container">
          <table className="reports-table">
            <thead className="reports-thead">
              <tr>
                <th className="reports-th">Event Name</th>
                <th className="reports-th">Attendees</th>
                <th className="reports-th">Ticket Price</th>
              </tr>
            </thead>
            <tbody>
              {mockEvents.map((event, idx) => (
                <tr
                  key={event._id}
                  className={
                    idx % 2 === 0
                      ? "reports-row-even"
                      : "reports-row-odd"
                  }
                >
                  <td className="reports-td">{event.name}</td>
                  <td className="reports-td">{event.attendees.length}</td>
                  <td className="reports-td">${event.price.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="reports-footnote">
          This page summarizes ticket sales and participation for all events.
        </p>
      </div>
    </div>
  );
};

export default AdminReports;
