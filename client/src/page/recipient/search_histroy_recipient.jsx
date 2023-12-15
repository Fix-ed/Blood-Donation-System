import { useState, useEffect } from "react";
import axios from "axios";
import { NavBarRecipient } from "../../components/nav_bar_recipient.jsx";
import "../../style/admin_style/add_remove_edit.css";
export const Search_History_Recipient = () => {
  const [result, setResult] = useState("");

  useEffect(() => {
    const search_recipient = async () => {
      const res = await axios.post("http://localhost:3000/search_recipient", {
        id: localStorage.getItem("recipient_id"),
      });
      setResult(res.data);
      console.log(res.data);
    };

    search_recipient();
  }, []);

  return (
    <>
      <NavBarRecipient />
      <h1 className="title">History</h1>
      <div className="container-4">
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
