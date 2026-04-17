import { useEffect, useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { getAllStudents, deleteStudent } from "../services/api";

function ManageStudents() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const refresh = searchParams.get("refresh");

  const fetchData = () => {
    setLoading(true);
    setError(null);
    getAllStudents()
      .then((result) => {
        console.log("Fetched students data:", result);
        setData(result);
      })
      .catch((err) => {
        console.error("Error fetching students:", err);
        setError("Failed to load student data. Please check if the backend server is running.");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, [refresh]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) {
      return;
    }

    try {
      await deleteStudent(id);
      alert("✅ Student deleted successfully");
      fetchData(); // refresh table
    } catch (error) {
      console.error("Error deleting student:", error);
      alert(`❌ Failed to delete student: ${error.message}`);
    }
  };

  return (
    <div className="container mt-5">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="text-primary">⚙️ Manage Students</h3>

        <button
          className="btn btn-secondary"
          onClick={() => navigate("/dashboard")}
        >
          ⬅ Back to Dashboard
        </button>
      </div>

      {/* Table Card */}
      <div className="card shadow-lg p-3">
        {loading ? (
          <div className="text-center py-4">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Loading student data...</p>
          </div>
        ) : error ? (
          <div className="alert alert-danger" role="alert">
            <h5>Error Loading Data</h5>
            <p>{error}</p>
            <button className="btn btn-primary" onClick={fetchData}>
              Try Again
            </button>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover text-center align-middle">

              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Course</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {data.length > 0 ? (
                  data.map((s) => (
                    <tr key={s.id}>
                      <td>{s.id}</td>
                      <td className="fw-semibold">{s.name}</td>
                      <td>{s.email}</td>
                      <td>{s.course}</td>

                      <td>
                        <Link
                          to={`/view/${s.id}`}
                          className="btn btn-sm btn-info me-2"
                        >
                          👁 View
                        </Link>
                        <Link
                          to={`/update/${s.id}`}
                          state={{ student: s }}
                          className="btn btn-sm btn-warning me-2"
                        >
                          ✏️ Update
                        </Link>

                        <button
                          onClick={() => handleDelete(s.id)}
                          className="btn btn-sm btn-danger"
                        >
                          🗑 Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-muted py-3">
                      No students found
                    </td>
                  </tr>
                )}
              </tbody>

            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default ManageStudents;