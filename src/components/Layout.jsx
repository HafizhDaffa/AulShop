import React from "react";
import { BrowserRouter, Link, useNavigate } from "react-router";

const Layout = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg border-bottom bpx-shadow">
      <div className="container">
        <Link className="navbar-brand" to={"/admin"}>
          <img src="logo.svg" alt="..." width="120" className="me-2" />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link text-light text-nav-bold" aria-current="page" to="/Admin">
                Produk List
              </Link>
            </li>
          </ul>
        </div>
        <ul className="navbar-nav">
          <li className="nav-item dropdown">
            <a className="btn btn-primary shadow none bg-light text-dark" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Admin
            </a>
            <ul className="dropdown-menu">
              <li>
                <Link className="dropdown-item" onClick={handleLogout}>
                  Logout
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Layout;
