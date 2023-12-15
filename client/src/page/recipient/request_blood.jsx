import { NavBarRecipient } from "../../components/nav_bar_recipient";
import "../../style/recipient_style/request_blood.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export const Request_Blood = () => {
  const navigate = useNavigate();
  const switch_page = async () => {
    const res = await axios.post("http://localhost:3000/recipient_payed", {
      recipient_id: localStorage.getItem("recipient_id"),
    });
    console.log(res.data);
    if (res.data == "OK") {
      navigate("/recipient/confirm_request");
    } else {
      alert("Error");
    }
  };
  const price = localStorage.getItem("price");
  console.log(typeof price);
  return (
    <>
      <NavBarRecipient />
      <div className="request-blood-container">
        <h1>Request Blood</h1>
        <h2>You need to pay:</h2>
        <h2>
          {price !== "0"
            ? `Price: ${price}$`
            : "Nothing! :) You already got your blood"}
        </h2>
        {price !== "0" ? (
          <input
            type="submit"
            value="Pay"
            className="btn btn-primary"
            onClick={switch_page}
          />
        ) : null}{" "}
      </div>
    </>
  );
};
