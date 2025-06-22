import { useEffect, useState } from "react";
import { getGenres } from "../../../_services/genres";
import { getAuthors } from "../../../_services/authors";
import { useNavigate } from "react-router-dom";
import { createBook } from "../../../_services/books";
import Swal from "sweetalert2"; 

export default function BookCreate() {
  const navigate = useNavigate();
  const [genres, setGenres] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    price: 0,
    stock: 0,
    genre_id: "", 
    author_id: "", 
    cover_photo: null,
    description: "",
  });
  const [loadingInitialData, setLoadingInitialData] = useState(true); 
  const [loadingSubmit, setLoadingSubmit] = useState(false); 
  const [errorInitialData, setErrorInitialData] = useState(null); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [genresData, authorsData] = await Promise.all([
          getGenres(),
          getAuthors(),
        ]);

        setGenres(genresData);
        setAuthors(authorsData);
      } catch (err) {
        setErrorInitialData("Failed to load genres and authors. Please try again.");
        console.error("Error fetching initial data:", err);
      } finally {
        setLoadingInitialData(false);
      }
    };

    fetchData();
  }, []);

  // Kode untuk handle perubahan input form
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "cover_photo") {
      setFormData({
        ...formData,
        cover_photo: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // Kode handle submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingSubmit(true);

    try {
      const payload = new FormData();
      for (const key in formData) {
        if (formData[key] !== null && formData[key] !== "") {
          payload.append(key, formData[key]);
        }
      }

      await createBook(payload);
      Swal.fire({
        icon: "success",
        title: "Book Created!",
        text: "The new book has been successfully added.",
        confirmButtonColor: "#6366f1",
      }).then(() => {
        navigate("/admin/books");
      });
    } catch (error) {
      console.error("Error creating book:", error);
      const errorMsg =
        error?.response?.data?.message || "Failed to create book. Please check your input.";
      Swal.fire({
        icon: "error",
        title: "Creation Failed",
        text: errorMsg,
        confirmButtonColor: "#e3342f",
      });
    } finally {
      setLoadingSubmit(false);
    }
  };

  if (loadingInitialData) {
    return (
      <section className="bg-white dark:bg-gray-900 min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-900 dark:text-white">Loading form data...</p>
      </section>
    );
  }

  if (errorInitialData) {
    return (
      <section className="bg-white dark:bg-gray-900 min-h-screen flex items-center justify-center">
        <p className="text-xl text-red-600 dark:text-red-400">{errorInitialData}</p>
      </section>
    );
  }

  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="max-w-2xl px-4 py-8 mx-auto lg:py-16">
          <h2 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 dark:text-white">
            Add New Book
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
              <div className="sm:col-span-2">
                <label
                  htmlFor="title"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Book Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                  placeholder="Enter book title"
                  required
                />
              </div>

              <div className="w-full">
                <label
                  htmlFor="price"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Price (IDR)
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                  placeholder="e.g. 150000"
                  min="0"
                  required
                />
              </div>

              <div className="w-full">
                <label
                  htmlFor="stock"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Stock
                </label>
                <input
                  type="number"
                  name="stock"
                  id="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                  placeholder="e.g. 299"
                  min="0" 
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="genre_id"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Genre
                </label>
                <select
                  id="genre_id"
                  name="genre_id"
                  value={formData.genre_id}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                  required
                >
                  <option value="">-- Select Genre --</option>
                  {genres.map((genre) => (
                    <option key={genre.id} value={genre.id}>
                      {genre.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="author_id"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Author
                </label>
                <select
                  id="author_id"
                  name="author_id"
                  value={formData.author_id}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                  required
                >
                  <option value="">-- Select Author --</option>
                  {authors.map((author) => (
                    <option key={author.id} value={author.id}>
                      {author.nama}
                    </option>
                  ))}
                </select>
              </div>

              <div className="w-full sm:col-span-2"> {/* Make cover photo span 2 columns for better layout */}
                <label
                  htmlFor="cover_photo"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Cover Photo
                </label>
                <input
                  type="file"
                  name="cover_photo"
                  id="cover_photo"
                  accept="image/*"
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full cursor-pointer dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                  required
                />
                {formData.cover_photo && typeof formData.cover_photo === 'object' && (
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Selected file: {formData.cover_photo.name}</p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="6"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                  placeholder="Write a detailed description of the book"
                  required
                ></textarea>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                type="submit"
                disabled={loadingSubmit}
                className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loadingSubmit ? "Creating Book..." : "Create Book"}
              </button>
              <button
                type="reset"
                onClick={() => setFormData({ 
                    title: "",
                    price: 0,
                    stock: 0,
                    genre_id: "",
                    author_id: "",
                    cover_photo: null,
                    description: "",
                })}
                className="text-gray-600 inline-flex items-center hover:text-white border border-gray-600 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-gray-500 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-900"
              >
                Reset Form
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}