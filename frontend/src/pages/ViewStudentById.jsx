import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getStudentById } from "../services/api";
import Layout from "../components/Layout";

function ViewStudentById() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getStudentById(id)
      .then(setStudent)
      .catch((err) => {
        console.error("Error fetching student:", err);
        setError("Failed to load student details");
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="container mt-4">
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Loading student details...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="container mt-4">
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
          <button
            className="btn btn-secondary"
            onClick={() => navigate("/view")}
          >
            Back to Student List
          </button>
        </div>
      </Layout>
    );
  }

  if (!student) {
    return (
      <Layout>
        <div className="container mt-4">
          <div className="alert alert-warning" role="alert">
            Student not found.
          </div>
          <button
            className="btn btn-secondary"
            onClick={() => navigate("/view")}
          >
            Back to Student List
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="text-primary">👤 Student Details</h3>
          <button
            className="btn btn-secondary"
            onClick={() => navigate("/view")}
          >
            ⬅ Back to List
          </button>
        </div>

        <div className="card shadow-lg p-4">
          <div className="row mb-3">
            <div className="col-12">
              <h4 className="text-primary">Student ID: {student.id}</h4>
            </div>
          </div>
          <div className="row">
            {Object.entries(student).map(([key, value]) => {
              if (key === 'id') return null; // Already shown above
              return (
                <div key={key} className="col-md-6 mb-3">
                  <div className="border rounded p-3 bg-light">
                    <strong className="text-capitalize">{key}:</strong>
                    <div className="mt-1">{String(value)}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ViewStudentById;