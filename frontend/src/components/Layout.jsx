import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function Layout({ children }) {
  return (
    <>
      <Navbar />

      <div className="d-flex">
        {/* Sidebar */}
        <div style={{ width: "200px" }}>
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex-grow-1 p-3">
          {children}
        </div>
      </div>
    </>
  );
}

export default Layout;