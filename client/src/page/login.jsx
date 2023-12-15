import "../style/login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:3000/login", {
      email,
      password,
    });
    console.log(res.data);

    // Store user data in local storage
    localStorage.setItem('user', JSON.stringify(res.data.user));
    localStorage.setItem('role', res.data.role);
    localStorage.setItem('blood_type', res.data.blood_type);
    localStorage.setItem('drive_id', res.data.Drive_ID);
    localStorage.setItem('recipient_id', res.data.recipient_id);
    localStorage.setItem('amount_blood', res.data.amount_of_blood)
    localStorage.setItem('price', res.data.price)
    console.log(localStorage.getItem('price'))
    console.log(localStorage.getItem('recipient_id'))

    if (res.data.role === "admin") {
      navigate("/admin");
    } else if (res.data.role === "donor") {
      navigate("/donor");
    } else if (res.data.role === "recipient") {
      navigate("/recipient");
    } else {
      document.querySelector(".inactive").classList.remove("inactive");
      document.querySelector(".inactive").classList.add("active");
    }
  };
  return (
    <>
      <form className="form-login">
        <h1>Welcome to BloodProject</h1>
        <div className="form-div">
          <input
            type="text"
            value={email}
            placeholder="Email"
            required
            className="email-input"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            value={password}
            placeholder="Password"
            required
            className="email-input"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" name="login" onClick={login} className="btn">
            Login
          </button>
          <label className="inactive">Email or password are not correct!</label>
        </div>
      </form>
      <button name="guest" className="btn-guest">
        Continue Guest
      </button>
      {/* add link to guest !!!!!!!!!!!!!!! */}
    </>
  );
};
