import { useParams, useNavigate } from "react-router-dom";
import { deleteStudent } from "../services/api";

function DeleteStudent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDelete = () => {
    deleteStudent(id).then(() => {
      alert("Student Deleted");
      navigate("/view?refresh=" + Date.now());
    });
  };

  return (
    <div className="container mt-4">
      <h2>Delete Student</h2>
      <p>Are you sure you want to delete student with ID: {id}?</p>
      <button className="btn btn-danger" onClick={handleDelete}>Yes, Delete</button>
      <button className="btn btn-secondary ml-2" onClick={() => navigate("/view")}>Cancel</button>
    </div>
  );
}

export default DeleteStudent;