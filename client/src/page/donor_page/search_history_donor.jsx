import { useEffect, useState } from "react";
import axios from "axios";
import "../../style/donor_style/search_history_donor.css";
import { NavBarDonor } from "../../components/nav_bar_donor.jsx";

export const Search_History_Donor = () => {
  const [result, setResult] = useState([]);

  useEffect(() => {
    const search_donor = async () => {
      try {
        const res = await axios.post("http://localhost:3000/search_donor", {
          id: localStorage.getItem("user"),
        });
        setResult(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    search_donor();
  }, []);

  return (
    <>
      <NavBarDonor />
      <h1 className="title">History</h1>
      <div className="container-4">
        {result && result[0] && (
          <table className="styled-table">
            <thead>
              <tr>
                {Object.keys(result[0])
                  .filter((key) => key !== "Donor_ID") // Exclude the ID from the keys
                  .map((key, index) => (
                    <th key={index}>{key}</th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {result.map((row, index) => (
                <tr key={index}>
                  {Object.entries(row)
                    .filter(([key, _]) => key !== "Donor_ID") // Exclude the ID from the values
                    .map(([_, value], i) => (
                      <td key={i}>{value}</td>
                    ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};
