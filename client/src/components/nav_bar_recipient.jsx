import { Link } from "react-router-dom";
import "../style/nav_bar.css"; // Importing the CSS file

export const NavBarRecipient = () => {
  return (
    <>
      <header className="admin-header">
        <Link className="admin-link" to="/recipient">
          Home
        </Link>
        <Link className="admin-link" to="/recipient/search_history">
          Search History
        </Link>
        <Link className="admin-link" to="/recipient/edit_system_user">
          Edit information
        </Link>
        <Link className="admin-link" to="/recipient/request_blood">
          Request Blood
        </Link>
        <Link className="admin-link" to="/">
          Logout
        </Link>
      </header>
    </>
  );
};