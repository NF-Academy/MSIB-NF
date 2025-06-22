import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { showBook } from "../../../_services/books";
import { createTransactions } from "../../../_services/transaction";
import Swal from "sweetalert2"; // Import SweetAlert2

export default function ShowBook() {
  const { id } = useParams();
  const [book, setBook] = useState({});
  const [quantity, setQuantity] = useState(1);

  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchBook = async () => {
      const data = await showBook(id);
      setBook(data);
    };

    fetchBook();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      Swal.fire({
        icon: "warning",
        title: "Anda Belum Login!",
        text: "Silakan login terlebih dahulu untuk melakukan pembelian.",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/login");
      });
      return;
    }
    try {
      const payload = {
        book_id: id,
        quantity: quantity,
      };

      await createTransactions(payload);
      Swal.fire({
        icon: "success",
        title: "Pembelian Berhasil!",
        text: `Anda telah berhasil membeli ${quantity} buah "${book.title}".`,
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.error(error); // Log the error for debugging

      let errorMessage = "Terjadi kesalahan saat pembelian.";
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        errorMessage = error.response.data.message;
      }

      // Use SweetAlert2 for error message
      Swal.fire({
        icon: "error",
        title: "Pembelian Gagal!",
        text: errorMessage,
        confirmButtonText: "OK",
      });
    }
  };

  if (!book) return <p>Loading...</p>;

  return (
    <section className="bg-gray-100 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
          {book.title}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <img
              src={`http://127.0.0.1:8000/storage/books/${book.cover_photo}`}
              alt={book.title}
              className="rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
            />
          </div>

          <div className="space-y-5">
            <p className="text-lg text-gray-800 dark:text-gray-200">
              <strong className="font-semibold">Author:</strong>{" "}
              {book.author?.nama || "Unknown"}
            </p>
            <p className="text-lg text-gray-800 dark:text-gray-200">
              <strong className="font-semibold">Genre:</strong>{" "}
              {book.genre?.name || "Unknown"}
            </p>
            <p className="text-lg text-green-600 dark:text-green-400">
              <strong className="font-semibold">Price:</strong> Rp. {book.price}
            </p>
            <p className="text-lg text-gray-800 dark:text-gray-200">
              <strong className="font-semibold">Stock:</strong> {book.stock}
            </p>
            <div className="border-t border-gray-200 dark:border-gray-700 pt-5">
              <h3 className="text-md font-semibold text-gray-900 dark:text-white mb-2">
                Description:
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {book.description}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 sm:mt-8 space-y-4">
              <div>
                <label
                  htmlFor="quantity"
                  className="block text-sm font-medium text-gray-700 dark:text-white"
                >
                  Jumlah
                </label>
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    min={1}
                    value={quantity} // Bind input value to state
                    onChange={(e) => setQuantity(e.target.value)}
                    className="mt-1 block w-28 pl-3 pr-10 py-2 border border-gray-300 dark:bg-gray-800 dark:border-gray-600 dark:text-white rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    placeholder="1"
                  />
                  {/* <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-500 dark:text-gray-400">
                    Pcs
                  </div> */}
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="inline-flex items-center bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-200"
                >
                  Beli Sekarang
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
