import { useEffect, useState } from "react";
import axios from "axios";
import "../../style/donor_style/search_history_donor.css";
import { NavBarDonor } from "../../components/nav_bar_donor.jsx";
useState;
export const Search_History_Donor = () => {
  const [result, setResult] = useState("");
  useEffect(() => {
    const search_donor = async () => {
      const res = await axios.post("http://localhost:3000/search_donor", {
        id: localStorage.getItem("user"),
      });
      setResult(res.data);
    };

    search_donor();
  }, []);

  useEffect(() => {}, [result]); // This effect runs whenever `result` changes

  return (
    <>
      <NavBarDonor />
      <h1 className="title">History</h1>
        <div className="form-add">
          {/* store the result[0].Recipient_ID and the result[0].MEDICAL_HISTORY in a*/}
          {result && result[0] && (
            <table className="styled-table">
              <thead>
                <tr>
                  {Object.keys(result[0]).map((key, index) => (
                    <th key={index}>{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {result.map((row, index) => (
                  <tr key={index}>
                    {Object.values(row).map((value, i) => (
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
