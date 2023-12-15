/* eslint-disable no-unused-vars */
import { NavBar } from "../../components/nav_bar_admin";
import "../../style/admin_style/add_remove_edit.css";
import { useState } from "react";
import axios from "axios";
export const Search_History = () => {
  const [id, setID] = useState("");
  const [result, setResult] = useState("");
  const [op, setOp] = useState("");

  const search = async () => {
    if (op === "recipient") {
      const res = await axios.post("http://localhost:3000/search_recipient", {
        id: id,
      });
      setResult(res.data);
      console.log("result")
    } else if (op === "donor") {
      const res = await axios.post("http://localhost:3000/search_donor", {
        id: id,
      });
      console.log(res);
      setResult(res.data);
      console.log("result")
    }
  };

  const func_recipient = () => {
    setOp("recipient");
    if (document.querySelector("#donor").style.backgroundColor === "red") {
      document.querySelector("#donor").style.backgroundColor = "black";
      document.querySelector("#recipient").style.backgroundColor = "red";
    } else {
      document.querySelector("#recipient").style.backgroundColor = "red";
    }
    document.querySelector(".form-add").style.display = "block";
  };

  const func_donor = () => {
    setOp("donor");
    if (document.querySelector("#recipient").style.backgroundColor === "red") {
      document.querySelector("#recipient").style.backgroundColor = "black";
      document.querySelector("#donor").style.backgroundColor = "red";
    } else {
      document.querySelector("#donor").style.backgroundColor = "red";
    }
    document.querySelector(".form-add").style.display = "block";
  };

  return (
    <>
      <NavBar />
      <h1>Select whose history you would like to show</h1>
      <div className="container-2">
        <button id="recipient" onClick={func_recipient} className="btn-2">
          Recipient
        </button>
        <button id="donor" onClick={func_donor} className="btn-2">
          Donor
        </button>
      </div>
      <div className="container-3">
        <div className="form-edit">
          <input
            type="text"
            value={id}
            placeholder="Enter ID"
            onChange={(e) => setID(e.target.value)}
          />
          <input
            type="submit"
            value="Submit"
            className="btn-submit-3"
            onClick={search}
          ></input>
        </div>
      </div>
      <div className="container-4">
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
      </div>
    </>
  );
};
