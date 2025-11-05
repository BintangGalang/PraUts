import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../utils/CartContext";
import Navbar from "../../components/Navbar";
import toast from "react-hot-toast";

export default function Checkout() {
  const { cart, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    payment: "COD",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.address || !formData.phone) {
      toast.error("Lengkapi semua data pengiriman!");
      return;
    }

    // Simulasi kirim ke backend Laravel
    toast.success("Pesanan berhasil dibuat!");
    clearCart();
    setTimeout(() => navigate("/"), 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Form Pengiriman */}
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded-lg p-6 space-y-4"
          >
            <div>
              <label className="block font-medium text-gray-700">
                Nama Lengkap
              </label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Masukkan nama lengkap"
                className="w-full border rounded-md p-2 mt-1"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700">
                Alamat Pengiriman
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Masukkan alamat lengkap"
                className="w-full border rounded-md p-2 mt-1"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700">
                Nomor Telepon
              </label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Masukkan nomor aktif"
                className="w-full border rounded-md p-2 mt-1"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700">
                Metode Pembayaran
              </label>
              <select
                name="payment"
                value={formData.payment}
                onChange={handleChange}
                className="w-full border rounded-md p-2 mt-1"
              >
                <option value="COD">Bayar di Tempat (COD)</option>
                <option value="Transfer">Transfer Bank</option>
                <option value="E-Wallet">E-Wallet</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Konfirmasi Pesanan
            </button>
          </form>

          {/* Ringkasan Pesanan */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Ringkasan Pesanan</h2>
            <ul className="divide-y">
              {cart.map((item, idx) => (
                <li key={idx} className="py-2 flex justify-between">
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                  <span>
                    Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-4 border-t pt-4 flex justify-between font-bold">
              <span>Total</span>
              <span>Rp {total.toLocaleString("id-ID")}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
