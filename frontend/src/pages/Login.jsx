import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";

function Login() {
  const [user, setUser] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const res = login(user.username, user.password);
    localStorage.setItem("role", res.role);
    navigate("/dashboard");
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh", background: "#f5f7fa" }}
    >
      <div
        className="card shadow-lg p-4"
        style={{ width: "380px", borderRadius: "15px" }}
      >
        {/* Title */}
        <h3 className="text-center mb-3 text-primary">
          🎓 Student System
        </h3>
        <p className="text-center text-muted mb-4">
          Login to continue
        </p>

        <form onSubmit={handleSubmit}>
          
          {/* Username */}
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter username"
              value={user.username}
              onChange={(e) =>
                setUser({ ...user, username: e.target.value })
              }
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={user.password}
              onChange={(e) =>
                setUser({ ...user, password: e.target.value })
              }
              required
            />
          </div>

          {/* Button */}
          <button className="btn btn-primary w-100 mt-2">
            🔐 Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-center mt-3 text-muted" style={{ fontSize: "14px" }}>
         Student Management
        </p>
      </div>
    </div>
  );
}

export default Login;