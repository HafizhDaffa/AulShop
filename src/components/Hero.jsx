import React from "react";
import banner from "/banner.jpg";
import heroImage from "/heroImage.svg";
import "../index.css";
import { Link } from "react-router";

const Hero = () => {
  return (
    <section className="hero">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="copy">
              <div className="text-label">Temukan produk terbaik dengan harga terjangkau di Aul Shopping!</div>
              <div className="text-hero-bold">Dapatkan Diskon Menarik dan Produk Berkualitas</div>
              <div className="text-hero-regular">Belanja Cerdas, Hemat Waktu dan Uang dengan Penawaran Terbaik Setiap Hari!</div>
              <div className="cta">
                <a href="#" className="btn btn-primary shadow none">
                  Explore Product
                </a>
                <Link to="/CartList" className="btn btn-secondary shadow none ms-3">
                  See Cart
                </Link>
              </div>
            </div>
          </div>
          <div className="col md-6 center">
            <img src="heroImage.svg" alt="img" width="500" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
