import React, { useState } from "react";
import books from "../../../utils/books";

export default function ProductList() {
  // State untuk menyimpan daftar buku
  const [bookList, setBookList] = useState(books);

  // State untuk input form
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    description: "",
    image: "",
  });

  // Fungsi untuk menangani perubahan input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  // Fungsi untuk menambahkan buku baru
  const handleAddBook = () => {
    if (newBook.title && newBook.author && newBook.description && newBook.image) {
      setBookList((prevBooks) => [...prevBooks, newBook]);
      setNewBook({ title: "", author: "", description: "", image: "" }); // Reset form
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <>
      <section className="py-5 text-center container">
        <div className="row py-lg-5">
          <div className="col-lg-6 col-md-8 mx-auto">
            <h1 className="fw-light">Best Seller Book</h1>
            <p className="lead text-body-secondary">
              Some of the best and most popular books right now.
            </p>
            <p>
              <a href="#" className="btn btn-primary my-2 m-2">
                Views
              </a>
              <a href="#" className="btn btn-secondary my-2">
                Other Book
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Form untuk menambahkan buku baru */}
      <div className="container mb-4">
        <h3>Add a New Book</h3>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Title"
            name="title"
            value={newBook.title}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Author"
            name="author"
            value={newBook.author}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Description"
            name="description"
            value={newBook.description}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Image URL"
            name="image"
            value={newBook.image}
            onChange={handleInputChange}
          />
        </div>
        <button className="btn btn-primary" onClick={handleAddBook}>
          Tambahkan Buku
        </button>
      </div>

      {/* Daftar buku */}
      <div className="album py-5 bg-body-tertiary">
        <div className="container">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {bookList.map((book, index) => (
              <div className="col" key={index}>
                <div className="card shadow-sm h-100">
                  <img
                    src={book.image}
                    className="bd-placeholder-img card-img-top"
                    alt={book.title}
                    height="225"
                    style={{ objectFit: "cover" }}
                  />
                  <div className="card-body d-flex flex-column justify-content-between">
                    <div>
                      <h5 className="card-title">{book.title}</h5>
                      <h6 className="card-subtitle mb-2 text-muted">{book.author}</h6>
                      <p className="card-text">{book.description}</p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <div className="btn-group">
                        <button type="button" className="btn btn-sm btn-outline-secondary">
                          View
                        </button>
                        <button type="button" className="btn btn-sm btn-outline-secondary">
                          Edit
                        </button>
                      </div>
                      <small className="text-body-secondary">9 mins</small>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
