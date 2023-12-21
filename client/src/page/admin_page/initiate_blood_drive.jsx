import { useState } from "react";
import { NavBar } from "../../components/nav_bar_admin";
import "../../style/admin_style/blood_drive.css";
import axios from "axios";
export const Begin_Blood_Drive = () => {
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const blood_drive = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:3000/start_blood_drive", {
      date: date,
    });

    if (res.data === "Not possible") {
      alert("Blood drive must be 3 months apart");
    } else {
      alert("Blood Drive Started");
      const res_2 = await axios.post(
        "http://localhost:3000/start_blood_drive_location",
        {
          location: location,
        }
      );
      if (res_2.status === 200) {
        alert("Blood Drive Started");
      } else {
        alert("Error");
      }
    }
  };
  return (
    <>
      <NavBar />
      <h1>Initiate Blood Drive</h1>
      <div className="container_blood_drive">
        <form className="blood_drive">
          <label type="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            required
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
            }}
          ></input>
          <label type="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            required
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
            }}
          ></input>
          <input
            type="submit"
            value="Submit"
            className="btn-submit-3"
            onClick={blood_drive}
          ></input>
        </form>
      </div>
    </>
  );
};
