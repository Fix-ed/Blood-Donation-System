import "../style/login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const login = async (e) => {
    e.preventDefault();
    setError(false);

    try {
      const res = await axios.post("http://localhost:3000/login", {
        email,
        password,
      });

      // Handle navigation based on role
      const navigateToRole = {
        admin: "/admin",
        donor: "/donor",
        recipient: "/recipient",
      };

      if (res.data.role in navigateToRole) {
        navigate(navigateToRole[res.data.role]);
      } else {
        setError(true);
      }
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="login-container">
      <form className="form-login" onSubmit={login}>
        <h2>Blood Bank System</h2>
        <div className="input-group">
          <input
            type="email"
            value={email}
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            value={password}
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="btn">
            Login
          </button>
          {error && (
            <label className="error-msg">
              Email or password are not correct!
            </label>
          )}
        </div>
      </form>
    </div>
  );
};
