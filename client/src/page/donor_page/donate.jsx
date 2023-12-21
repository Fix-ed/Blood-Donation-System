import { NavBarDonor } from "../../components/nav_bar_donor";
import "../../style/donor_style/donate.css";
import { useState } from "react";
import axios from "axios";
export const Donate = () => {
  const [donate, setDonate] = useState("");
  const id = localStorage.getItem("user");
  const [incident, setIncident] = useState("");
  const blood_type = localStorage.getItem("blood_type");
  const drive_id = localStorage.getItem("drive_id");
  const func_donate = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:3000/donor_donation", {
      id: Number(id),
      amount: Number(donate),
      incident: incident,
      blood_type: blood_type,
      drive_id: Number(drive_id),
    });
    console.log(res);
    if (res.data === "NO") {
      alert("You have already donated within 3 months");
    } else if (res.data === "history") {
      alert("Your medical history does not allow you to donate");
    } else if (res.status === 200) {
      alert("Donation Successful");
    } else {
      alert("Donation Failed");
    }
  };
  return (
    <>
      <NavBarDonor />
      <h1 className="title">Donate</h1>
      <form className="form-donate">
        <label htmlFor="donationAmount">
          How much blood are you donating? (in ml)
        </label>
        <input
          id="donationAmount"
          type="text"
          placeholder="Enter amount"
          value={donate}
          onChange={(e) => {
            setDonate(e.target.value);
          }}
        />
        <label>Was there an incident? If yes, then please type it</label>
        <input
          type="text"
          placeholder="Enter incident"
          value={incident}
          onChange={(e) => {
            setIncident(e.target.value);
          }}
        />
        <input type="submit" value="Submit" onClick={func_donate} />
      </form>
    </>
  );
};
