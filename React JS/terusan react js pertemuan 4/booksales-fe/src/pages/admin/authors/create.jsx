import { useEffect, useState } from "react";
import { createAuthor, getAuthors } from "../../../_services/authors";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function AuthorCreate() {
  const navigate = useNavigate();
  const [authors, setAuthors] = useState([]);
  const [formData, setFormData] = useState({
    nama: "",
    photo: null,
    biografi: "",
  });
  const [loadingInitialData, setLoadingInitialData] = useState(true);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [errorInitialData, setErrorInitialData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authorsData = await getAuthors();
        setAuthors(authorsData);
      } catch (err) {
        setErrorInitialData("Failed to load initial data for authors.");
        console.error("Error fetching authors data:", err);
      } finally {
        setLoadingInitialData(false);
      }
    };

    fetchData();
  }, []);

  // Kode untuk handle perubahan input form
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "photo") {
      setFormData({
        ...formData,
        photo: files[0],
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

      await createAuthor(payload);
      Swal.fire({
        icon: "success",
        title: "Author Created!",
        text: "The new author has been successfully added.",
        confirmButtonColor: "#6366f1",
      }).then(() => {
        navigate("/admin/authors");
      });
    } catch (error) {
      console.error("Error creating author:", error);
      const errorMsg =
        error?.response?.data?.message ||
        "Failed to create author. Please check your input.";
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
        <p className="text-xl text-gray-900 dark:text-white">
          Preparing form...
        </p>
      </section>
    );
  }

  if (errorInitialData) {
    return (
      <section className="bg-white dark:bg-gray-900 min-h-screen flex items-center justify-center">
        <p className="text-xl text-red-600 dark:text-red-400">
          {errorInitialData}
        </p>
      </section>
    );
  }

  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="max-w-2xl px-4 py-8 mx-auto lg:py-16">
          <h2 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 dark:text-white">
            Add New Author
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
              <div className="sm:col-span-2">
                <label
                  htmlFor="nama"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Author Name
                </label>
                <input
                  type="text"
                  name="nama"
                  id="nama"
                  value={formData.nama}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                  placeholder="e.g. Andrea Hirata"
                  required
                />
              </div>

              <div className="w-full sm:col-span-2">
                {" "}
                {/* Make photo span 2 columns for better layout */}
                <label
                  htmlFor="photo"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Author Photo
                </label>
                <input
                  type="file"
                  name="photo"
                  id="photo"
                  accept="image/*"
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full cursor-pointer dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                  required
                />
                {formData.photo && typeof formData.photo === "object" && (
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Selected file: {formData.photo.name}
                  </p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="biografi"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Biography
                </label>
                <textarea
                  id="biografi"
                  name="biografi"
                  value={formData.biografi}
                  onChange={handleChange}
                  rows="6"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                  placeholder="Write the author's biography here..."
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
                {loadingSubmit ? "Creating Author..." : "Create Author"}
              </button>
              <button
                type="reset"
                onClick={() =>
                  setFormData({
                    nama: "",
                    photo: null,
                    biografi: "",
                  })
                }
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
