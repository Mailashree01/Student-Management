import { useEffect, useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { getAllStudents } from "../services/api";

function ViewStudents() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [studentId, setStudentId] = useState("");
  const [searchError, setSearchError] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const refresh = searchParams.get("refresh");
  const role = localStorage.getItem("role");

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
    if (role !== "STUDENT") {
      fetchData();
    }
  }, [refresh, role]);

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const handleIdSearch = (e) => {
    e.preventDefault();
    const trimmedId = studentId.trim();

    if (!trimmedId) {
      setSearchError("Please enter a student ID.");
      return;
    }

    setSearchError("");
    navigate(`/view/${trimmedId}`);
  };

  const filteredData = searchTerm
    ? data.filter((student) => {
        const query = searchTerm.toLowerCase();
        return [
          student.name,
          student.email,
          student.course,
          student.mobile,
          student.address,
          student.city,
          student.state,
        ]
          .filter(Boolean)
          .some((value) => value.toString().toLowerCase().includes(query));
      })
    : data;

  return (
    <div className="container mt-5">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="text-primary">
          {role === "STUDENT" ? "🔎 View Student by ID" : "📋 Student List"}
        </h3>

        <button
          className="btn btn-secondary"
          onClick={() => navigate("/dashboard")}
        >
          ⬅ Back to Dashboard
        </button>
      </div>

      {role === "STUDENT" ? (
        <div className="row mb-4">
          <div className="col-md-8">
            <form className="d-flex" onSubmit={handleIdSearch}>
              <input
                type="text"
                className="form-control me-2"
                placeholder="Enter student ID to view"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
              />
              <button type="submit" className="btn btn-primary ms-2">
                View
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary ms-2"
                onClick={() => {
                  setStudentId("");
                  setSearchError("");
                }}
              >
                Clear
              </button>
            </form>
            {searchError && (
              <div className="text-danger mt-2">{searchError}</div>
            )}
          </div>
        </div>
      ) : (
        <div className="row mb-4">
          <div className="col-md-8">
            <form className="d-flex" onSubmit={handleSearch}>
              <input
                type="text"
                className="form-control me-2"
                placeholder="Search by name, email, course, city, or state"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit" className="btn btn-primary ms-2">
                Search
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary ms-2"
                onClick={() => setSearchTerm("")}
              >
                Clear
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="card shadow-lg p-3">
        {role === "STUDENT" ? (
          <div className="text-center py-4">
            <p className="mb-2">
              Students can view a single student record by entering the student ID above.
            </p>
            <p className="text-muted">
              You will be redirected to the student detail page after clicking View.
            </p>
          </div>
        ) : loading ? (
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
                  <th>Mobile</th>
                  <th>Address</th>
                  <th>DOB</th>
                  <th>Gender</th>
                  <th>City</th>
                  <th>State</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((s) => (
                    <tr key={s.id}>
                      <td>{s.id || 'N/A'}</td>
                      <td className="fw-semibold">{s.name || 'N/A'}</td>
                      <td>{s.email || 'N/A'}</td>
                      <td>{s.course || 'N/A'}</td>
                      <td>{s.mobile || 'N/A'}</td>
                      <td>{s.address || 'N/A'}</td>
                      <td>{s.dob || 'N/A'}</td>
                      <td>{s.gender || 'N/A'}</td>
                      <td>{s.city || 'N/A'}</td>
                      <td>{s.state || 'N/A'}</td>

                      <td>
                        <Link
                          to={`/view/${s.id}`}
                          className="btn btn-sm btn-primary"
                        >
                          👁 View
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="11" className="text-muted py-3">
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

export default ViewStudents;