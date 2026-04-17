import { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { updateStudent } from "../services/api";
import Layout from "../components/Layout";

function UpdateStudent() {
  const { id } = useParams();        // get id from URL
  const navigate = useNavigate();
  const location = useLocation();
  const student = location.state?.student;

  const [form, setForm] = useState(() => ({
    name: student?.name || "",
    email: student?.email || "",
    course: student?.course || ""
  }));

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Update student
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateStudent(id, form);
      alert("✅ Student Updated Successfully");
      navigate("/view?refresh=" + Date.now());   // go back to list with refresh
    } catch (error) {
      console.error("Error updating student:", error);
      alert(`❌ Failed to update student: ${error.message}`);
    }
  };

  return (
    <Layout>
      <div className="container mt-4">
        <h3>Update Student</h3>

        <form onSubmit={handleSubmit} className="card p-4 shadow">

          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="form-control mb-2"
            placeholder="Name"
            required
          />

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="form-control mb-2"
            placeholder="Email"
            required
          />

          <input
            type="text"
            name="course"
            value={form.course}
            onChange={handleChange}
            className="form-control mb-2"
            placeholder="Course"
            required
          />

          <button className="btn btn-warning">
            Update Student
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default UpdateStudent;