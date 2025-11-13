import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Loader2, Package, PlusCircle, Edit3, Trash2 } from "lucide-react";
import SearchFilterPanel from "../../components/admin/SearchFilterPanel";
import PaginationControl from "../../components/admin/PaginationControl";
import axios from "axios";

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [searchParams, setSearchParams] = useState({
    keyword: "",
    category: "",
  });
  const [loading, setLoading] = useState(true);

  const getCategories = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/categories");
      setCategories(res.data.data);
    } catch (error) {
      console.error("Gagal ambil kategori:", error);
    }
  };

  const getProducts = async (page = 1, keyword = "", category = "") => {
    try {
      setLoading(true);
      const res = await axios.get("http://127.0.0.1:8000/api/products", {
        params: { page, keyword, category },
      });
      setProducts(res.data.data);
      setCurrentPage(res.data.meta.current_page);
      setLastPage(res.data.meta.last_page);
    } catch (error) {
      console.error("Gagal ambil produk:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus produk ini?")) return;
    try {
      await axios.delete(`http://127.0.0.1:8000/api/products/${id}`);
      toast.success("Produk berhasil dihapus!");
      getProducts(currentPage, searchParams.keyword, searchParams.category);
    } catch (error) {
      toast.error("Gagal menghapus produk.");
    }
  };

  const handleSearch = ({ keyword, category }) => {
    setSearchParams({ keyword, category });
    getProducts(1, keyword, category);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    getProducts(page, searchParams.keyword, searchParams.category);
  };

  useEffect(() => {
    getCategories();
    getProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl p-6 transition-all">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Package className="w-7 h-7 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-800">
              Manajemen Produk
            </h1>
          </div>

          <Link
            to="/admin/add-product"
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 active:scale-95 transition-transform shadow"
          >
            <PlusCircle className="w-5 h-5" />
            Tambah Produk
          </Link>
        </div>

        {/* Filter */}
        <SearchFilterPanel
          categories={categories}
          onSearch={handleSearch}
          defaultKeyword={searchParams.keyword}
          defaultCategory={searchParams.category}
        />

        {/* Table / Loading */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
            <span className="ml-3 text-gray-600">Memuat data produk...</span>
          </div>
        ) : (
          <div className="overflow-x-auto mt-6 border rounded-xl shadow-sm">
            <table className="min-w-full text-sm text-gray-700">
              <thead className="bg-gradient-to-r from-blue-50 to-blue-100">
                <tr>
                  <th className="px-4 py-3 border-b text-center font-semibold">#</th>
                  <th className="px-4 py-3 border-b font-semibold">Gambar</th>
                  <th className="px-4 py-3 border-b font-semibold">Nama Produk</th>
                  <th className="px-4 py-3 border-b font-semibold">Harga</th>
                  <th className="px-4 py-3 border-b font-semibold">Stok</th>
                  <th className="px-4 py-3 border-b text-center font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {products.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="text-center py-6 text-gray-500 bg-gray-50"
                    >
                      Tidak ada produk ditemukan.
                    </td>
                  </tr>
                ) : (
                  products.map((p, i) => (
                    <tr
                      key={p.id}
                      className="hover:bg-blue-50 transition-colors even:bg-gray-50"
                    >
                      <td className="px-4 py-3 text-center">{i + 1}</td>
                      <td className="px-4 py-3 text-center">
                        <img
                          src={p.img_url}
                          alt={p.name}
                          className="w-14 h-14 object-cover rounded-lg border"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-semibold text-gray-800">{p.name}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          {p.category?.name
                            ? `Kategori: ${p.category.name}`
                            : "Tanpa kategori"}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        Rp {p.price?.toLocaleString("id-ID")}
                      </td>
                      <td className="px-4 py-3 text-center">{p.stock}</td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex justify-center gap-3">
                          <Link
                            to={`/admin/edit-product/${p.id}`}
                            className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                          >
                            <Edit3 className="w-4 h-4" /> Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(p.id)}
                            className="text-red-600 hover:text-red-800 flex items-center gap-1"
                          >
                            <Trash2 className="w-4 h-4" /> Hapus
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        <div className="mt-6">
          <PaginationControl
            currentPage={currentPage}
            lastPage={lastPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}
