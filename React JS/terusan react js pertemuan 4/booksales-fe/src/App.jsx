import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/public";
import PublicLayout from "./layouts/public";
import Books from "./pages/public/books";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import AdminLayout from "./layouts/admin";
import Dashboard from "./pages/admin";
import AdminBooks from "./pages/admin/books";
import BookCreate from "./pages/admin/books/create";
import AdminAuthors from "./pages/admin/authors";
import AuthorCreate from "./pages/admin/authors/create";
import AdminGenres from "./pages/admin/genres";
import GenreCreate from "./pages/admin/genres/create";
import BookEdit from "./pages/admin/books/edit";
import AuthorEdit from "./pages/admin/authors/edit";
import GenreEdit from "./pages/admin/genres/edit";
import ShowBook from "./pages/public/books/show";
import AdminTransactions from "./pages/admin/transactions";
import CustomerTransactions from "./pages/public/transactions";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* public */}
          <Route element={<PublicLayout />}>
            <Route index element={<Home />} />

            <Route path="books">
              <Route index element={<Books />} />
              <Route path="show/:id" element={<ShowBook />} />
            </Route>
            <Route path="my-transactions">
              <Route index element={<CustomerTransactions />} />
            </Route>
          </Route>

          {/* auth */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          {/* admin */}
          <Route path="admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />

            <Route path="books">
              <Route index element={<AdminBooks />} />
              <Route path="create" element={<BookCreate />} />
              <Route path="edit/:id" element={<BookEdit />} />
            </Route>

            <Route path="authors">
              <Route index element={<AdminAuthors />} />
              <Route path="create" element={<AuthorCreate />} />
              <Route path="edit/:id" element={<AuthorEdit />} />
            </Route>

            <Route path="genres">
              <Route index element={<AdminGenres />} />
              <Route path="create/" element={<GenreCreate />} />
              <Route path="edit/:id" element={<GenreEdit />} />
            </Route>
            <Route path="transactions">
              <Route index element={<AdminTransactions />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
