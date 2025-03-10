import Home from "./pages/Home.jsx";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import DetailProduk from "./pages/DetailProduk.jsx";

import AddProduct from "./pages/AddProduct.jsx";
import AddCategory from "./pages/AddCategory.jsx";
import { Toaster } from "react-hot-toast";
import CartList from "./pages/CartList.jsx";
import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import Admin from "./pages/Admin.jsx";
import Layout from "./components/Layout.jsx";
import Footer from "./components/Footer.jsx";

import Create from "./pages/Create.jsx";
import Edit from "./pages/Edit.jsx";
import AdminCategory from "./pages/AdminCategory.jsx";
import CreateCategory from "./pages/CreateCategory.jsx";
import EditCategory from "./pages/EditCategory.jsx";

const token = localStorage.getItem("accessToken");
if (token) {
  axios.defaults.headers["Authorization"] = `Bearer ${token}`;
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      {/* <Layout /> */}
      <AuthProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admincategory" element={<AdminCategory />} />
          <Route path="/admincategory/createcategory" element={<CreateCategory />} />
          <Route path="/admincategory/editcategory/:id" element={<EditCategory />} />
          <Route path="/admin/create" element={<Create />} />
          <Route path="/admin/edit/:id" element={<Edit />} />
          <Route path="/detailproduk/:id" element={<DetailProduk />} />
          <Route path="/AddProduct" element={<AddProduct />} />
          <Route path="/AddCategory" element={<AddCategory />} />
          <Route path="/CartList" element={<CartList />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </AuthProvider>
      <Footer />
    </BrowserRouter>
  </StrictMode>
);
