import { NavBarRecipient } from "../../components/nav_bar_recipient";
import "../../style/recipient_style/edit_info.css";
import { useState } from "react";
import axios from "axios";
export const Recipient = () => {
  const edit = localStorage.getItem("can_edit");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [address, setAddress] = useState("");
  const [bdate, setBdate] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mass, setmass] = useState("");

  console.log(edit);

  const edit_func = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:3000/edit_info_recipient", {
      fname: fname,
      lname: lname,
      address: address,
      bdate: bdate,
      email: email,
      password: password,
      mass: Number(mass),
    });
    if (res.status === 200) {
      alert("Edit Successful");
    } else {
      alert("Edit Failed");
    }
  };

  return (
    <>
      <NavBarRecipient />
      <h1 className="title">Recipient profile</h1>
      {edit === "FALSE" ? (
        <h1>You are not allowed to edit your information</h1>
      ) : (
        <div className="form-edit-recipient">
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
          <input
            type="submit"
            value="Submit"
            className="btn-submit-3"
            onClick={edit_func}
          ></input>
        </div>
      )}
    </>
  );
};
