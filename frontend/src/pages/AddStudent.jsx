import { useState } from "react";
import { addStudent } from "../services/api";
import { useNavigate } from "react-router-dom";

function AddStudent() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    course: "",
    mobile: "",
    address: "",
    gender: "",
    dob: "",
    city: "",
    state: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("Sending data:", form);
      const response = await addStudent(form);
      console.log("Response:", response);

      setForm({
        name: "",
        email: "",
        course: "",
        mobile: "",
        address: "",
        gender: "",
        dob: "",
        city: "",
        state: ""
      });

      alert("✅ Student added successfully!");
      navigate("/view");

    } catch (error) {
      console.error("Error adding student:", error);
      alert(`❌ Failed to add student: ${error.message || "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center mt-5">
      <div
        className="card shadow-lg p-4"
        style={{ width: "500px", borderRadius: "15px" }}
      >
        <h3 className="text-center mb-4 text-primary">
          Add Student
        </h3>

        <form onSubmit={handleSubmit}>

          {/* Name */}
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Mobile */}
          <div className="mb-3">
            <label>Mobile</label>
            <input
              type="tel"
              name="mobile"
              className="form-control"
              value={form.mobile}
              onChange={handleChange}
              required
            />
          </div>

          {/* Gender */}
          <div className="mb-3">
            <label className="form-label">Gender</label>
            <select
              name="gender"
              className="form-control"
              value={form.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          {/* DOB */}
          <div className="mb-3">
            <label>Date of Birth</label>
            <input
              type="date"
              name="dob"
              className="form-control"
              value={form.dob}
              onChange={handleChange}
              required
            />
          </div>

          {/* Course */}
          <div className="mb-3">
            <label>Course</label>
            <input
              type="text"
              name="course"
              className="form-control"
              value={form.course}
              onChange={handleChange}
              required
            />
          </div>

          {/* Address */}
          <div className="mb-3">
            <label>Address</label>
            <textarea
              name="address"
              className="form-control"
              value={form.address}
              onChange={handleChange}
              rows="2"
              required
            />
          </div>

          {/* City & State Row */}
          <div className="row">
            <div className="col-md-6 mb-3">
              <label>City</label>
              <input
                type="text"
                name="city"
                className="form-control"
                value={form.city}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label>State</label>
              <input
                type="text"
                name="state"
                className="form-control"
                value={form.state}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Button */}
          <button className="btn btn-success w-100" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                Adding...
              </>
            ) : (
              "➕ Add Student"
            )}
          </button>

        </form>
      </div>
    </div>
  );
}

export default AddStudent; 