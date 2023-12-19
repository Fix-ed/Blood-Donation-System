import { useState, useEffect } from "react";
import { NavBar } from "../../components/nav_bar_admin";
import axios from "axios";
import "../../style/admin_style/admin_dashboard.css"; // Assuming the CSS file is named admin_dashboard.css

export const Admin = () => {
  const [donationStats, setDonationStats] = useState([]);
  const [bloodAvailability, setBloodAvailability] = useState([]);
  const [driveStats, setDriveStats] = useState([]);

  async function fetchStats() {
    // Fetching data from respective endpoints and setting state
    try {
      const donations = await axios.get(
        "http://localhost:3000/get_donation_stats"
      );
      const availability = await axios.get(
        "http://localhost:3000/get_blood_availability"
      );
      const drives = await axios.get("http://localhost:3000/get_drive_stats");

      setDonationStats(donations.data);
      setBloodAvailability(availability.data);
      setDriveStats(drives.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <>
      <NavBar />
      <div className="admin-dashboard">
        <section className="dashboard-section">
          <h2>Weekly Blood Donations</h2>
          <Table data={donationStats} columns={["Donor ID", "Blood Type"]} />
        </section>
        <section className="dashboard-section">
          <h2>Blood Type Availability</h2>
          <Table
            data={bloodAvailability}
            columns={["Blood Type", "Amount (ml)"]}
          />
        </section>
        <section className="dashboard-section">
          <h2>Collection Drive Statistics</h2>
          <Table
            data={driveStats}
            columns={["Drive ID", "Total Collected (ml)"]}
          />
        </section>
      </div>
    </>
  );
};

const Table = ({ data, columns }) => (
  <table className="styled-table">
    <thead>
      <tr>
        {columns.map((col, index) => (
          <th key={index}>{col}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {data.map((row, index) => (
        <tr key={index}>
          {Object.values(row).map((value, idx) => (
            <td key={idx}>{value}</td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);
