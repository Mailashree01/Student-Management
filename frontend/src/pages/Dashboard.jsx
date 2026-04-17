import { Link, useNavigate } from "react-router-dom";
import { logout } from "../services/authService";

function Dashboard() {
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="container mt-5">
      
      {/* Heading */}
      <div className="d-flex justify-content-between align-items-center mb-5">
        <div>
          <h2 className="fw-bold text-primary">🎓 Student Dashboard</h2>
          <p className="text-muted">Logged in as: {role}</p>
        </div>
        <button className="btn btn-outline-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Cards */}
      <div className="row justify-content-center g-4">

        {role === "ADMIN" && (
          <>
            {/* Add Student Card */}
            <div className="col-md-4">
              <div className="card shadow-lg border-0 text-center p-4">
                <h4 className="mb-3 text-success">➕ Add Student</h4>
                <p className="text-muted">
                  Create new student records easily
                </p>
                <Link to="/add" className="btn btn-success mt-3">
                  Go
                </Link>
              </div>
            </div>

            {/* Manage Students Card */}
            <div className="col-md-4">
              <div className="card shadow-lg border-0 text-center p-4">
                <h4 className="mb-3 text-warning">⚙️ Manage Students</h4>
                <p className="text-muted">
                  Update or delete existing students
                </p>
                <Link to="/manage" className="btn btn-warning mt-3">
                  Go
                </Link>
              </div>
            </div>
          </>
        )}

        {/* View Students Card */}
        <div className="col-md-4">
          <div className="card shadow-lg border-0 text-center p-4">
            <h4 className="mb-3 text-primary">📋 View Students</h4>
            <p className="text-muted">
              See all student information
            </p>
            <Link to="/view" className="btn btn-primary mt-3">
              Go
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;