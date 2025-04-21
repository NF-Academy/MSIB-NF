import { BrowserRouter,Route,Routes } from "react-router";
import Home from "./pages";
import Books from "./pages/books";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";

function App() {
  return (
    <>
      <div className="container">
      <><BrowserRouter>
        <Routes>
          <Route index element={<Home/>}/>
          <Route path="books" element={<Books/>}/>
          <Route path="login" element={<Login/>}/>
          <Route path="register" element={<Register/>}/>
        </Routes>
      </BrowserRouter></> 
      
      

    </div>

    </>
  )
}

export default App
