import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AddStudent from "./pages/AddStudent";
import UpdateStudent from "./pages/UpdateStudent";
import ViewStudents from "./pages/ViewStudents";
import ViewStudentById from "./pages/ViewStudentById";
import ManageStudents from "./pages/ManageStudents";
import DeleteStudent from "./pages/DeleteStudent";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add" element={<AddStudent />} />
        <Route path="/manage" element={<ManageStudents />} />
        <Route path="/update/:id" element={<UpdateStudent />} />
        <Route path="/view" element={<ViewStudents />} />
        <Route path="/view/:id" element={<ViewStudentById />} />
        <Route path="/delete/:id" element={<DeleteStudent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;