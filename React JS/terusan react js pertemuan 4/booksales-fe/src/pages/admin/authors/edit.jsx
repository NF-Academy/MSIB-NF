import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { showAuthor, updateAuthor } from "../../../_services/authors";
import Swal from "sweetalert2";

export default function AuthorEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nama: "",
    photo: null,
    biografi: "",
    _method: "PUT",
  });
  const [currentPhotoUrl, setCurrentPhotoUrl] = useState(null);
  const [loadingInitialData, setLoadingInitialData] = useState(true);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [errorInitialData, setErrorInitialData] = useState(null);

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const data = await showAuthor(id);
        setFormData({
          nama: data.nama,
          photo: data.photo,
          biografi: data.biografi,
          _method: "PUT",
        });
        setCurrentPhotoUrl(
          data.photo
            ? `http://127.0.0.1:8000/storage/author/${data.photo}`
            : null
        );
      } catch (err) {
        setErrorInitialData(
          "Failed to load author data. Please check author ID or network."
        );
        console.error("Error fetching author data:", err);
      } finally {
        setLoadingInitialData(false);
      }
    };

    fetchAuthor();
  }, [id]);
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "photo") {
      setFormData({
        ...formData,
        photo: files[0],
      });
      if (files[0]) {
        setCurrentPhotoUrl(URL.createObjectURL(files[0]));
      } else {
        setCurrentPhotoUrl(
          formData.photo
            ? `http://127.0.0.1:8000/storage/author/${formData.photo}`
            : null
        );
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingSubmit(true);

    try {
      const payload = new FormData();
      for (const key in formData) {
        if (key === "photo") {
          if (formData.photo instanceof File) {
            payload.append("photo", formData.photo);
          } else {
          }
        } else if (formData[key] !== null && formData[key] !== "") {
          payload.append(key, formData[key]);
        }
      }

      await updateAuthor(id, payload);
      Swal.fire({
        icon: "success",
        title: "Author Updated!",
        text: "The author's data has been successfully updated.",
        confirmButtonColor: "#6366f1",
      }).then(() => {
        navigate("/admin/authors");
      });
    } catch (error) {
      console.error("Error updating author:", error);
      const errorMsg =
        error?.response?.data?.message ||
        "Failed to update author. Please check your input.";
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
          Loading author data for editing...
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
            Edit Author
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
                />
                {currentPhotoUrl && (
                  <div className="mt-4 flex items-center space-x-4">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Current Photo:
                    </p>
                    <img
                      src={currentPhotoUrl}
                      alt="Current Author Photo"
                      className="w-24 h-24 object-cover rounded-md border border-gray-300 dark:border-gray-600"
                    />
                  </div>
                )}
                {formData.photo && typeof formData.photo === "object" && (
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Selected new file: {formData.photo.name}
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
                {loadingSubmit ? "Saving Data..." : "Save Changes"}
              </button>
              {/* Tombol kembali */}
              <button
                type="button"
                onClick={() => navigate("/admin/authors")}
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
