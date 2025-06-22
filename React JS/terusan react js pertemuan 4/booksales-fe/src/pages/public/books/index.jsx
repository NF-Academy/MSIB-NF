import { useEffect, useState } from "react";
import { getBooks } from "../../../_services/books";
import { Link } from "react-router-dom";

export default function Books() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const booksData = await getBooks();
        setBooks(booksData);
      } catch (err) {
        setError("Failed to load books. Please try again.");
        console.error("Error fetching books:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (loading) {
    return (
      <section className="bg-gray-50 py-8 antialiased dark:bg-gray-900 md:py-12 min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-900 dark:text-white">Memuat buku...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-gray-50 py-8 antialiased dark:bg-gray-900 md:py-12 min-h-screen flex items-center justify-center">
        <p className="text-xl text-red-600 dark:text-red-400">{error}</p>
      </section>
    );
  }

  return (
    <>
      <section className="bg-gray-50 py-8 antialiased dark:bg-gray-900 md:py-12">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div className="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
            {books.length > 0 ? (
              books.map((book) => (
                <div
                  key={book.id}
                  className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 flex flex-col justify-between"
                >
                  <div className="h-56 w-full flex items-center justify-center overflow-hidden rounded-md bg-gray-100 dark:bg-gray-700">
                    <Link
                      to={`/books/show/${book.id}`}
                      className="block h-full w-full"
                    >
                      <img
                        className="mx-auto h-full w-full object-contain"
                        src={`http://127.0.0.1:8000/storage/books/${book.cover_photo}`}
                        alt={book.title || "Cover Buku"}
                      />
                    </Link>
                  </div>
                  <div className="pt-6 flex flex-col flex-grow">
                    <Link
                      to={`/books/show/${book.id}`}
                      className="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white flex-grow mb-2"
                    >
                      {book.title}
                    </Link>

                    <ul className="mt-2 flex items-center gap-4">
                      <li className="flex items-center gap-2">
                        <svg
                          className="h-4 w-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
                          />
                        </svg>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Pengiriman Cepat
                        </p>
                      </li>

                      <li className="flex items-center gap-2">
                        <svg
                          className="h-4 w-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeWidth="2"
                            d="M8 7V6c0-.6.4-1 1-1h11c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1h-1M3 18v-7c0-.6.4-1 1-1h11c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1H4a1 1 0 0 1-1-1Zm8-3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
                          />
                        </svg>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Harga Terbaik
                        </p>
                      </li>
                    </ul>

                    <div className="mt-4 flex items-center justify-between gap-4">
                      <p className="text-2xl font-extrabold leading-tight text-gray-900 dark:text-white">
                        {formatPrice(book.price)}
                      </p>

                      <Link
                        to={`/books/show/${book.id}`}
                        className="inline-flex items-center rounded-lg bg-indigo-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-800 focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                      >
                        Lihat detail
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="sm:col-span-2 md:col-span-3 xl:col-span-4 text-center py-8">
                <p className="text-xl text-gray-500 dark:text-gray-400">
                  Tidak ada buku ditemukan.
                </p>
              </div>
            )}
          </div>

          <div className="w-full text-center">
            <button
              type="button"
              className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-indigo-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
            >
              Tampilkan lebih banyak
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
