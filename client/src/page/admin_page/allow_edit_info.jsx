/* eslint-disable no-unused-vars */
import { NavBar } from "../../components/nav_bar_admin";
import "../../style/admin_style/add_remove_edit.css";
import { useState } from "react";
import axios from "axios";
export const Allow_Edit_Info = () => {
  const [id, setID] = useState("");
  const [op, setOp] = useState("");

  const search = async () => {
    if (op === "recipient") {
      const res = await axios.post("http://localhost:3000/allow_recipient", {
        id: id,
      });
      console.log("result");
      if (res.status === 200) {
        alert("Edit Successful");
      }
    } else if (op === "donor") {
      const res = await axios.post("http://localhost:3000/allow_donor", {
        id: id,
      });

      console.log(res);
      console.log("result");
      if (res.status === 200) {
        alert("Edit Successful");
      }
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
      <h1>Select whose edits you would like to allow</h1>
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
            value="Allow"
            className="btn-submit-3"
            onClick={search}
          ></input>
        </div>
      </div>
    </>
  );
};
