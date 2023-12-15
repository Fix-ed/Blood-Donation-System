import { useNavigate } from "react-router-dom";
import "../../style/recipient_style/confrim_request.css";
export const Confirm_Request = () => {
    const navigate = useNavigate();
    const comp_func = () => {
        localStorage.setItem("amount_blood", 0);
        navigate("/recipient");
    }
  return (
    <>
    <div className="confirm-request-container">
        <h1>Confirmation Page</h1>
        <p>Your request has been successfully submitted.</p>
        <button className="btn btn-primary" onClick={comp_func}>Go Back</button>
    </div>
    </>
  );
};
