/* eslint-disable no-unused-vars */
import { NavBar } from "../../components/nav_bar_admin";
import "../../style/admin_style/add_remove_edit.css";
import { useState } from "react";
import axios from "axios";
export const Add_Remove_Edit = () => {
  const [op, setOp] = useState(""); // ["add", "remove", "edit"]
  const [type, setType] = useState(""); // ["recipient", "donor"]
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [address, setAddress] = useState("");
  const [bdate, setBdate] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [blood_type, setBlood_type] = useState("");
  const [id, setId] = useState("");
  const [mass, setmass] = useState("");
  const [driveID, setdriveID] = useState("");
  const [amount, setAmount] = useState("");
  const [MedicalHistory, setMedicalHistory] = useState("");
  const func_add = () => {
    setOp("add");
    if (
      document.querySelector("#remove").style.backgroundColor === "red" ||
      document.querySelector("#edit").style.backgroundColor === "red"
    ) {
      document.querySelector("#remove").style.backgroundColor = "black";
      document.querySelector("#edit").style.backgroundColor = "black";
      document.querySelector("#add").style.backgroundColor = "red";
    } else {
      document.querySelector("#add").style.backgroundColor = "red";
    }
    if (op !== "" && type !== "") {
      complete_func(op, type);
    }
  };

  const func_remove = () => {
    setOp("remove");
    if (
      document.querySelector("#add").style.backgroundColor === "red" ||
      document.querySelector("#edit").style.backgroundColor === "red"
    ) {
      document.querySelector("#add").style.backgroundColor = "black";
      document.querySelector("#edit").style.backgroundColor = "black";
      document.querySelector("#remove").style.backgroundColor = "red";
    } else {
      document.querySelector("#remove").style.backgroundColor = "red";
    }
    if (op !== "" && type !== "") {
      complete_func(op, type);
    }
  };

  const func_edit = () => {
    setOp("edit");
    if (
      document.querySelector("#add").style.backgroundColor === "red" ||
      document.querySelector("#remove").style.backgroundColor === "red"
    ) {
      document.querySelector("#add").style.backgroundColor = "black";
      document.querySelector("#remove").style.backgroundColor = "black";
      document.querySelector("#edit").style.backgroundColor = "red";
    } else {
      document.querySelector("#edit").style.backgroundColor = "red";
    }
    if (op !== "" && type !== "") {
      complete_func(op, type);
    }
  };

  const func_recipient = () => {
    setType("recipient");
    if (document.querySelector("#donor").style.backgroundColor === "red") {
      document.querySelector("#donor").style.backgroundColor = "black";
      document.querySelector("#recipient").style.backgroundColor = "red";
    } else {
      document.querySelector("#recipient").style.backgroundColor = "red";
    }
    console.log(op, type);
    if (op !== "" && type !== "") {
      complete_func(op, type);
    }
  };

  const func_donor = () => {
    setType("donor");
    if (document.querySelector("#recipient").style.backgroundColor === "red") {
      document.querySelector("#recipient").style.backgroundColor = "black";
      document.querySelector("#donor").style.backgroundColor = "red";
    } else {
      document.querySelector("#donor").style.backgroundColor = "red";
    }
    if (op !== "" && type !== "") {
      complete_func(op, type);
    }
  };
  const complete_func = (op, type) => {
    console.log(op, type);
    if (op === "add" && type === "recipient") {
      document.querySelector(".form-add").style.display = "block";
      document.querySelector(".form-remove").style.display = "none";
      document.querySelector(".form-edit").style.display = "none";
      document.querySelector(".btn-submit-1").style.display = "block";
    } else if (op === "add" && type === "donor") {
      document.querySelector(".form-add").style.display = "block";
      document.querySelector(".form-remove").style.display = "none";
      document.querySelector(".form-edit").style.display = "none";
      document.querySelector(".btn-submit-1").style.display = "block";
    } else if (op === "remove" && type === "recipient") {
      document.querySelector(".form-add").style.display = "none";
      document.querySelector(".form-remove").style.display = "block";
      document.querySelector(".form-edit").style.display = "none";
      document.querySelector(".btn-submit-2").style.display = "block";
    } else if (op === "remove" && type === "donor") {
      document.querySelector(".form-add").style.display = "none";
      document.querySelector(".form-remove").style.display = "block";
      document.querySelector(".form-edit").style.display = "none";
      document.querySelector("btn-submit-2").style.display = "block";
    } else if (op === "edit" && type === "recipient") {
      document.querySelector(".form-add").style.display = "none";
      document.querySelector(".form-remove").style.display = "none";
      document.querySelector(".form-edit").style.display = "block";
      document.querySelector(".btn-submit-3").style.display = "block";
    } else if (op === "edit" && type === "donor") {
      document.querySelector(".form-add").style.display = "none";
      document.querySelector(".form-remove").style.display = "none";
      document.querySelector(".form-edit").style.display = "block";
      document.querySelector(".btn-submit-3").style.display = "block";
    }
  };

  const add = async (e) => {
    e.preventDefault();
    console.log(op, type);
    if (op === "add" && type === "recipient") {
      const res = await axios.post("http://localhost:3000/add_recipient", {
        fname: fname,
        lname: lname,
        address: address,
        mass: Number(mass),
        bdate: bdate,
        email: email,
        password: password,
        blood_type: blood_type,
        amount: Number(amount),
        MedicalHistory: MedicalHistory,
      });
      console.log(res.status);
      if (res.status === 200) {
        alert("Values Inserted");
      } else {
        alert("Error");
      }
    } else if (op === "add" && type === "donor") {
      if (mass < 50) {
        alert("weight is too low");
      } else {
        const res = await axios.post("http://localhost:3000/add_donor", {
          fname: fname,
          lname: lname,
          address: address,
          mass: Number(mass),
          driveID: Number(driveID),
          bdate: bdate,
          email: email,
          password: password,
          blood_type: blood_type,
          MedicalHistory: MedicalHistory,
        });
        if (res.status === 200) {
          alert("Values Inserted");
        } else {
          alert("Error");
        }
      }
    }
  };

  const remove = async (e) => {
    e.preventDefault();
    if (op === "remove" && type === "recipient") {
      const res = await axios.post("http://localhost:3000/delete_recipient", {
        id: id,
      });
      console.log(res);
      if (res.status === 200) {
        alert("User Deleted");
      } else {
        alert("Error");
      }
    } else if (op === "remove" && type === "donor") {
      const res = await axios.post("http://localhost:3000/delete_donor", {
        id: id,
      });
      console.log(res);
      if (res.status === 200) {
        alert("User Deleted");
      } else {
        alert("Error");
      }
    }
  };

  const edit = async () => {
    if (op === "edit" && type === "recipient") {
      const res = await axios.post("http://localhost:3000/edit_recipient", {
        id: id,
        fname: fname,
        lname: lname,
        address: address,
        mass: Number(mass),
        bdate: bdate,
        email: email,
        password: password,
        blood_type: blood_type,
      });
      if (res.status === 200) {
        alert("User Edited");
      } else {
        alert("Error");
      }
    } else if (op === "edit" && type === "donor") {
      const res = await axios.post("http://localhost:3000/edit_donor", {
        id: id,
        fname: fname,
        lname: lname,
        address: address,
        mass: Number(mass),
        bdate: bdate,
        email: email,
        password: password,
        blood_type: blood_type,
      });
      if (res.status === 200) {
        alert("User Edited");
      } else {
        alert("Error");
      }
    }
  };

  return (
    <>
      <NavBar />
      <h1>What would you like to do?</h1>
      <div className="container">
        <button id="add" onClick={func_add} className="btn-1">
          Add
        </button>
        <button id="remove" onClick={func_remove} className="btn-1">
          Remove
        </button>
        <button id="edit" onClick={func_edit} className="btn-1">
          Edit
        </button>
      </div>
      <div className="container-2">
        <button id="recipient" onClick={func_recipient} className="btn-2">
          Recipient
        </button>
        <button id="donor" onClick={func_donor} className="btn-2">
          Donor
        </button>
      </div>
      <div className="container-3">
        <div className="form-add">
          <label className="fname">First Name:</label>
          <input
            type="text"
            id="fname"
            name="fname"
            required
            value={fname}
            onChange={(e) => setFname(e.target.value)}
          ></input>

          <label className="lname">Last Name:</label>
          <input
            type="text"
            id="lname"
            name="lname"
            required
            value={lname}
            onChange={(e) => setLname(e.target.value)}
          ></input>

          <label className="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></input>

          <label className="mass">mass</label>
          <input
            type="text"
            id="mass"
            name="mass"
            required
            value={mass}
            onChange={(e) => setmass(e.target.value)}
          ></input>

          <label className="bdate">Birthdate:</label>
          <input
            type="date"
            id="bdate"
            name="bdate"
            required
            value={bdate}
            onChange={(e) => setBdate(e.target.value)}
          ></input>

          <label className="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>

          <label className="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <label className="blood_type">Blood Type:</label>
          <input
            type="text"
            id="blood_type"
            name="blood_type"
            required
            value={blood_type}
            onChange={(e) => setBlood_type(e.target.value)}
          ></input>
          <label className="drive_id">
            Drive ID (Leave empty if recipient)
          </label>

          <input
            type="text"
            id="drive_id"
            name="drive_id"
            value={driveID}
            onChange={(e) => setdriveID(e.target.value)}
          ></input>
          <label className="amount">
            Amount of blood needed (Leave empty if donor)
          </label>
          <input
            type="text"
            id="amount"
            name="amount"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
            }}
          ></input>
          <label className="Medical History">Medical History:</label>
          <input
            type="text"
            id="Medical History"
            name="Medical History"
            required
            value={MedicalHistory}
            onChange={(e) => setMedicalHistory(e.target.value)}
          ></input>
          <input
            type="submit"
            value="Submit"
            className="btn-submit-1"
            onClick={add}
          ></input>
        </div>
        <div className="form-remove">
          <label className="id_label">ID:</label>
          <input
            type="text"
            id="id"
            name="id"
            required
            value={id}
            onChange={(e) => setId(e.target.value)}
          ></input>
          <input
            type="submit"
            value="Submit"
            className="btn-submit-2"
            onClick={remove}
          ></input>
        </div>
        <div className="form-edit">
          <label className="id_label">ID:</label>
          <input
            type="text"
            id="id-edit"
            name="id"
            required
            value={id}
            onChange={(e) => {
              setId(e.target.value);
            }}
          ></input>
          <label className="fname">First Name:</label>
          <input
            type="text"
            id="fname-edit"
            name="fname"
            required
            value={fname}
            onChange={(e) => setFname(e.target.value)}
          ></input>

          <label className="lname">Last Name:</label>
          <input
            type="text"
            id="lname-edit"
            name="lname"
            required
            value={lname}
            onChange={(e) => setLname(e.target.value)}
          ></input>

          <label className="address">Address:</label>
          <input
            type="text"
            id="address-edit"
            name="address"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></input>

          <label className="mass">mass</label>
          <input
            type="text"
            id="mass-edit"
            name="mass"
            required
            value={mass}
            onChange={(e) => setmass(e.target.value)}
          ></input>

          <label className="bdate">Birthdate:</label>
          <input
            type="date"
            id="bdate"
            name="bdate"
            required
            value={bdate}
            onChange={(e) => setBdate(e.target.value)}
          ></input>

          <label className="email">Email:</label>
          <input
            type="email"
            id="email-edit"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>

          <label className="password">Password:</label>
          <input
            type="password"
            id="password-edit"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <label className="blood_type">Blood Type:</label>
          <input
            type="text"
            id="blood_type-edit"
            name="blood_type"
            required
            value={blood_type}
            onChange={(e) => setBlood_type(e.target.value)}
          ></input>
          <input
            type="submit"
            value="Submit"
            className="btn-submit-3"
            onClick={edit}
          ></input>
        </div>
      </div>
    </>
  );
};
