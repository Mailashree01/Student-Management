import { Link } from "react-router-dom";

function Sidebar() {
  const role = localStorage.getItem("role");

  return (
    <div className="bg-light p-3" style={{ height: "100vh" }}>
      <h5>Menu</h5>

      <ul className="nav flex-column">

        <li className="nav-item">
          <Link to="/dashboard" className="nav-link">Dashboard</Link>
        </li>

        {role === "ADMIN" && (
          <li className="nav-item">
            <Link to="/add" className="nav-link">Add Student</Link>
          </li>
        )}

        <li className="nav-item">
          <Link to="/view" className="nav-link">View Students</Link>
        </li>

      </ul>
    </div>
  );
}

export default Sidebar;