import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-dark bg-dark px-3">
      <span className="navbar-brand">Student System</span>

      <button onClick={handleLogout} className="btn btn-danger btn-sm">
        Logout
      </button>
    </nav>
  );
}

export default Navbar;