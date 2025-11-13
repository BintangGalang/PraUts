import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import { useAuth } from "../utils/AuthContext";

/**
 * AdminLayout
 * Layout utama untuk halaman admin, termasuk sidebar, top bar, konten, dan footer.
 */
export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
   const { user } = useAuth();
    if (!user || user.role !== 'admin') {
        return <Navigate to="/login" />;
    }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* Top bar untuk mobile */}
        <div className="md:hidden bg-white shadow p-4 flex justify-between">
          <h1 className="font-bold">My Admin</h1>
          <button
            className="p-2 border rounded"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet /> {/* Tempat komponen halaman ditampilkan */}
        </main>

        {/* Footer */}
        <footer className="bg-white border-t p-4 text-center text-sm">
          © 2025 My Admin App — v1.0.0
        </footer>
      </div>
    </div>
  );
}
