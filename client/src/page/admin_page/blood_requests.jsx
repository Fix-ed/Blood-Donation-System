import { NavBar } from "../../components/nav_bar_admin";
import { useState, useEffect } from "react";
import "../../style/admin_style/blood_request.css";
import axios from "axios";
export const Blood_Requests = () => {
  const [recipient_id, setRecipient_id] = useState([]);
  const [blood_type, setBlood_type] = useState([]);
  const [amount_of_blood, setAmount_of_blood] = useState([]);

  useEffect(() => {
    async function fetchBloodRequests() {
      try {
        const res = await axios.get("http://localhost:3000/get_blood_requests");
        setRecipient_id(res.data.map((item) => item.Recipient_ID));
        setBlood_type(res.data.map((item) => item.blood_type));
        setAmount_of_blood(res.data.map((item) => item.amount_of_blood));
      } catch (error) {
        console.error("There was an error!", error);
      }
    }

    // Call the function
    fetchBloodRequests();
  }, []);

  useEffect(() => {}, [recipient_id, blood_type, amount_of_blood]);

  const confirm_blood_transfer = async (id) => {
    console.log(id);
    console.log(blood_type[recipient_id.indexOf(id)]);
    console.log(amount_of_blood[recipient_id.indexOf(id)]);
    try {
      const res = await axios.post(
        "http://localhost:3000/confirm_blood_transfer",
        {
          recipient_id: id,
          blood_type: blood_type[recipient_id.indexOf(id)],
          amount_of_blood: amount_of_blood[recipient_id.indexOf(id)],
        }
      );
      console.log(res.data);
      console.log(res.data === "Not enough blood available");
      if (res.data === "Not enough blood available") {
        alert("Not enough blood available!");
      } else if (res.status === 200) {
        alert("Blood transfer confirmed!");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <NavBar />
      <h1>Blood Requests</h1>
      <table className="unique-table">
        <thead>
          <tr className="the-data-for-blood-request-admin">
            <th>Recipient ID</th>
            <th>Blood Type</th>
            <th>Amount of Blood</th>
            <th>Accept</th>
          </tr>
        </thead>
        <tbody>
          {recipient_id.map((id, index) => (
            <tr key={index}>
              <td>{recipient_id[index]}</td>
              <td>{blood_type[index]}</td>
              <td>{amount_of_blood[index]}</td>
              <td>
                <button
                  className="unique-btn"
                  onClick={() => {
                    confirm_blood_transfer(id);
                  }}
                >
                  Confirm
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
