import { useState, useEffect } from "react";
import { NavBar } from "../../components/nav_bar_admin";
import axios from "axios";
export const Admin = () => {
  const [result_1, setResult_1] = useState([]);
  const [result_2, setResult_2] = useState([]);
  const [result_3, setResult_3] = useState([]);
  const [result_4, setResult_4] = useState([]);
  async function fetchData() {
    const res = await axios.get("http://localhost:3000/get_result_1");
    setResult_1(res.data);
    if (res.status !== 200) {
      alert("error");
    }
    const res2 = await axios.get("http://localhost:3000/get_result_2");
    setResult_2(res2.data);
    if (res2.status !== 200) {
      alert("error");
    }
    const res3 = await axios.get("http://localhost:3000/get_result_3");
    setResult_3(res3.data);
    if (res3.status !== 200) {
      alert("error");
    }
  }

  async function fetchData2() {
    const res4 = await axios.get("http://localhost:3000/get_result_4");
    setResult_4(res4.data);
    if (res4.status !== 200) {
      alert("error");
    }
  }

  // Call the function
  // ... your other code ...

  useEffect(() => {
    fetchData();
    fetchData2();
  }, []);

  // ... your other code ...

  return (
    <>
      <NavBar />
      <h1>Admin</h1>
      <div className="container-4">
        <h3>Blood donations received in a week:</h3>
        <table>
          <tr>
            <th>Donor ID</th>
            <th>Blood Type</th>
          </tr>
          {result_1.map((item, index) => (
            <tr key={index}>
              <td>{item.Donor_ID}</td>
              <td>{item.blood_type}</td>
            </tr>
          ))}
        </table>
      </div>
      <div className="container-5">
        <h3>Amount available for each blood type</h3>
        <table>
          <tr>
            <th>Blood Type</th>
            <th>Amount</th>
          </tr>
          {result_2.map((item, index) => (
            <tr key={index}>
              <td>{item.blood_type}</td>
              <td>{item.q}ml</td>
            </tr>
          ))}
        </table>
      </div>
      <div className="container-6">
        <h3>
          List all Collection Drive and total blood collected during each drive
        </h3>
        <table>
          <tr>
            <th>Collection Drive ID</th>
            <th>Total Blood Collected</th>
          </tr>
          {result_3.map((item, index) => (
            <tr key={index}>
              <td>{item.Drive_ID}</td>
              <td>{item.q}ml</td>
            </tr>
          ))}
        </table>
      </div>
      <div className="container-7">
        <h3>Completed Payments:</h3>
        <table>
          <tr>
            <th>Recipient ID</th>
          </tr>
          {Array.isArray(result_4) && result_4.length > 0 ? (
            result_4.map((item, index) => (
              <tr key={index}>
                <td>{item.Recipient_ID}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td>No data available</td>
            </tr>
          )}
        </table>
      </div>
    </>
  );
};
