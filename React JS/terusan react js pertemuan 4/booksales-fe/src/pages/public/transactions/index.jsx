import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { getMyTransactions } from "../../../_services/transaction";

export default function CustomerTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (!token || !userInfo || !userInfo.id) {
      Swal.fire({
        icon: "warning",
        title: "Akses Ditolak!",
        text: "Anda harus login untuk melihat transaksi Anda.",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/login");
      });
      return;
    }

    const fetchUserTransactions = async () => {
      try {
        setLoading(true);
        const data = await getMyTransactions();
        setTransactions(data);
      } catch (err) {
        console.error("Error fetching user transactions:", err);
        setError("Gagal memuat transaksi Anda. Silakan coba lagi nanti.");
        Swal.fire({
          icon: "error",
          title: "Terjadi Kesalahan!",
          text: "Gagal memuat data transaksi. Silakan coba lagi.",
          confirmButtonText: "OK",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserTransactions();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
        <p className="text-xl text-gray-700 dark:text-gray-200">
          Memuat transaksi Anda...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
        <p className="text-xl text-red-600 dark:text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-8 text-center">
            Riwayat Transaksi Saya
          </h1>

          {transactions.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Anda belum memiliki riwayat transaksi apapun.
              </p>
              <p className="mt-4 text-gray-500 dark:text-gray-400">
                Mulai jelajahi buku-buku kami dan lakukan pembelian pertama
                Anda!
              </p>
              <button
                onClick={() => navigate("/books")}
                className="mt-6 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Jelajahi Buku
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 flex flex-col md:flex-row justify-between items-start md:items-center bg-gray-50 dark:bg-gray-700 transition duration-300 hover:shadow-md"
                >
                  <div className="mb-4 md:mb-0">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                      Order: #{transaction.order_number}
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 mt-1">
                      <strong className="font-semibold">Tanggal:</strong>{" "}
                      {new Date(transaction.created_at).toLocaleDateString(
                        "id-ID",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                      <strong className="font-semibold">Buku:</strong>{" "}
                      {transaction.book?.title || "N/A"}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                      <strong className="font-semibold">Jumlah:</strong>{" "}
                      {transaction.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-extrabold text-green-600 dark:text-green-400">
                      Rp. {transaction.total_amount}
                    </p>
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        transaction.status === "completed"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                          : transaction.status === "pending"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300" // Assuming 'failed' or other status
                      } mt-2`}
                    >
                      {transaction.status
                        ? transaction.status.charAt(0).toUpperCase() +
                          transaction.status.slice(1)
                        : "Unknown"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
