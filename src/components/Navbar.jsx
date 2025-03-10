import React from "react";
import { Link, useNavigate } from "react-router";

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("accessToken");
  const storedUser = localStorage.getItem("user");
  const datauser = JSON.parse(storedUser);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-dark bg-primary navbar-expand-lg border-bottom bpx-shadow">
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
              <Link className="nav-link text-light text-nav-bold" aria-current="page" to="/home">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light text-nav-bold" aria-current="page" to="/CartList">
                Cart
              </Link>
            </li>
          </ul>
        </div>

        <ul className="navbar-nav">
          {isAuthenticated && datauser ? (
            <>
              <li className="nav-item dropdown">
                <a className="btn btn-primary shadow none bg-light text-dark" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  {datauser.email}
                </a>
                <ul className="dropdown-menu">
                  <button className="dropdown-item" onClick={handleLogout}>
                    Logout
                  </button>
                </ul>
              </li>
            </>
          ) : (
            <Link className="btn btn-primary shadow none bg-light text-dark" to="/login">
              Login
            </Link>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
