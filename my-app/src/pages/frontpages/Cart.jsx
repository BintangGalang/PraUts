import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../utils/CartContext";
import { ShoppingCart, Trash2 } from "lucide-react";
import Navbar from "../../components/Navbar";
import toast from "react-hot-toast";

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, total } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error("Keranjang masih kosong!");
      return;
    }
    navigate("/checkout");
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <ShoppingCart className="w-24 h-24 mx-auto text-gray-300 mb-4" />
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Keranjang Kosong
          </h2>
          <p className="text-gray-500 mb-6">Yuk belanja produk menarik!</p>
          <Link
            to="/"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Keranjang Belanja</h1>
        <div className="bg-white shadow rounded-lg p-4">
          {cart.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between border-b py-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={
                    item.img_url?.startsWith("http")
                      ? item.img_url
                      : `http://127.0.0.1:8000/storage/${item.img_url}`
                  }
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-gray-500 text-sm">
                    Rp {item.price.toLocaleString("id-ID")}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="px-2 py-1 bg-gray-200 rounded"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="px-2 py-1 bg-gray-200 rounded"
                >
                  +
                </button>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="ml-3 text-red-600 hover:text-red-800"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}

          <div className="flex justify-between items-center mt-6">
            <h2 className="text-xl font-semibold">
              Total: Rp {total.toLocaleString("id-ID")}
            </h2>
            <button
              onClick={handleCheckout}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Lanjut ke Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
