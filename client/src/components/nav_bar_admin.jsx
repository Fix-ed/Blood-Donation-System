import { Link } from "react-router-dom";
import "../style/nav_bar.css"; // Importing the CSS file

export const NavBar = () => {
  return (
    <>
      <header className="admin-header">
        <Link className="admin-link" to="/admin">
          Home
        </Link>
        <Link className="admin-link" to="/admin/add_remove_edit">
          Add/Remove/Edit Donor/Recipient
        </Link>
        <Link className="admin-link" to="/admin/search_history">
          Search History
        </Link>
        <Link className="admin-link" to="/admin/edit_system_user">
          Edit system user information
        </Link>
        <Link className="admin-link" to="/admin/blood_requests">
          Blood requests
        </Link>
        <Link className="admin-link" to="/admin/begin_blood_drive">
          Initiate Blood Drive
          </Link>
        <Link className="admin-link" to="/">
          Logout
        </Link>
      </header>
    </>
  );
};
