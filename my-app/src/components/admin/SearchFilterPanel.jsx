import React, { useEffect, useState } from "react";
import axios from "axios";

export default function SearchFilterPanel({ onSearch }) {
  const [categories, setCategories] = useState([]); // ✅ default: []
  const [keyword, setKeyword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Ambil kategori dari API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/categories");
        setCategories(res.data.data || []); // ✅ pastikan data aman
      } catch (err) {
        console.error("Gagal memuat kategori:", err);
        setCategories([]); // fallback agar aman
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ keyword, category: selectedCategory });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-wrap gap-3 mb-4 items-center bg-gray-50 p-3 rounded-lg"
    >
      {/* Input Pencarian */}
      <input
        type="text"
        placeholder="Cari produk..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="border border-gray-300 p-2 rounded-lg w-60"
      />

      {/* Select Kategori */}
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="border border-gray-300 p-2 rounded-lg"
      >
        <option value="">Semua Kategori</option>
        {categories.map((c) => (
          <option key={c.category_id} value={c.category_id}>
          {c.category}
        </option>

        ))}
      </select>

      {/* Tombol Cari */}
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        Cari
      </button>
    </form>
  );
}
