import { Link } from "react-router-dom";

/**
 * Sidebar
 * @param {boolean} sidebarOpen - state untuk menentukan sidebar terbuka atau tertutup
 * @param {function} setSidebarOpen - fungsi untuk mengubah state sidebarOpen
 */
export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  return (
    <div
      className={`${
        sidebarOpen ? "block" : "hidden"
      } md:block w-64 bg-white shadow-md`}
    >
      {/* Header Sidebar */}
      <div className="p-4 font-bold text-xl">My Admin</div>

      {/* Navigasi */}
      <nav className="flex flex-col p-4 space-y-2">
        <Link
          to="/admin/dashboard"
          className="hover:bg-gray-200 p-2 rounded"
        >
          Dashboard
        </Link>

        <Link
          to="/admin/about"
          className="hover:bg-gray-200 p-2 rounded"
        >
          About
        </Link>
      </nav>
    </div>
  );
}
