import React from "react";
import banner from "/banner.jpg";
import bannerr from "/bannerr.jpg";
import bannerrrr from "/bannerrrr.jpg";

const Carrousel = () => {
  return (
    <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img className="d-block w-50 mx-auto" src={banner} alt="First slide" />
        </div>
        <div className="carousel-item">
          <img className="d-block w-50 mx-auto" src={bannerr} alt="Second slide" />
        </div>
        <div className="carousel-item">
          <img className="d-block w-50 mx-auto" src={bannerrrr} alt="Third slide" />
        </div>
      </div>
      <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="sr-only"></span>
      </a>
      <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="sr-only"></span>
      </a>
    </div>
  );
};

export default Carrousel;
