import { useNavigate, useParams } from "react-router-dom";
import { showGenre, updateGenre } from "../../../_services/genres";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function GenreEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    _method: "PUT",
  });
  const [loadingInitialData, setLoadingInitialData] = useState(true);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [errorInitialData, setErrorInitialData] = useState(null);

  useEffect(() => {
    const fetchGenre = async () => {
      try {
        const data = await showGenre(id);
        setFormData({
          name: data.name,
          description: data.description,
          _method: "PUT",
        });
      } catch (err) {
        setErrorInitialData(
          "Failed to load genre data. Please check genre ID or network."
        );
        console.error("Error fetching genre data:", err);
      } finally {
        setLoadingInitialData(false);
      }
    };

    fetchGenre();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

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

      await updateGenre(id, payload);
      Swal.fire({
        icon: "success",
        title: "Genre Updated!",
        text: "The genre has been successfully updated.",
        confirmButtonColor: "#6366f1",
      }).then(() => {
        navigate("/admin/genres");
      });
    } catch (error) {
      console.error("Error updating genre:", error);
      const errorMsg =
        error?.response?.data?.message ||
        "Failed to update genre. Please check your input.";
      Swal.fire({
        icon: "error",
        title: "Update Failed",
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
          Loading genre data for editing...
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
            Edit Genre
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
              <div className="sm:col-span-2">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Genre Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                  placeholder="e.g. Fantasy, Science Fiction, Romance"
                  required
                />
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
                  placeholder="Provide a brief description of the genre..."
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
                {loadingSubmit ? "Saving Data..." : "Save Changes"}
              </button>
              <button
                type="button"
                onClick={() => navigate("/admin/genres")}
                className="text-gray-600 inline-flex items-center hover:text-white border border-gray-600 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-gray-500 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-900"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
