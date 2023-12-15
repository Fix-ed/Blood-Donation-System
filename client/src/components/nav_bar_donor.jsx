import { Link } from "react-router-dom";
import "../style/nav_bar.css"; // Importing the CSS file

export const NavBarDonor = () => {
  return (
    <>
      <header className="admin-header">
        <Link className="admin-link" to="/donor">
          Home
        </Link>
        <Link className="admin-link" to="/donor/search_history">
          Search History
        </Link>
        <Link className="admin-link" to="/donor/edit_system_user">
          Edit information
        </Link>
        <Link className="admin-link" to="/donor/donate">
          Donate Blood
        </Link>
        <Link className="admin-link" to="/">
          Logout
        </Link>
      </header>
    </>
  );
};