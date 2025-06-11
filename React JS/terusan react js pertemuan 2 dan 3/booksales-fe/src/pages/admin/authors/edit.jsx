import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { showAuthor, updateAuthor } from "../../../_services/authors";

export default function AuthorEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nama: "",
    biografi: "",
  });

  useEffect(() => {
    const fetchAuthor = async () => {
      const data = await showAuthor(id);
      setFormData({
        nama: data.nama,
        biografi: data.biografi,
      });
    };

    fetchAuthor();
  }, [id]);

  const handleChange = () => {};

  const handleSubmit = () => {};
  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="max-w-2xl px-4 py-8 mx-auto lg:py-16">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            Edit Author
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
              <div className="sm:col-span-2">
                <label
                  for="title"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Title
                </label>
                <input
                  type="text"
                  name="nama"
                  id="name"
                  value={formData.nama}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                  placeholder="nama "
                  required=""
                />
              </div>

              <div className="w-full">
                <label
                  for="photo"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Photo
                </label>
                <input
                  type="file"
                  name="photo"
                  id="photo"
                  accept="image/*"
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full cursor-pointer  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <label
                  for="biografi"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Description
                </label>
                <textarea
                  id="biografi"
                  name="biografi"
                  value={formData.biografi}
                  onChange={handleChange}
                  rows="6"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                  placeholder="Write a product description of the book"
                ></textarea>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                type="submit"
                className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
              >
                Save Data
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
