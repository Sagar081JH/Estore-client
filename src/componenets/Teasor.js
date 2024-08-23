import React from "react";

export default function Teasor() {
  return (
    <div
      id="carouselExampleIndicators"
      class="carousel slide my-1 mt-5 pt-2"
      data-ride="carousel"
    >
      <span class="carousel-indicators text-danger">
        <span
          data-target="#carouselExampleIndicators"
          data-slide-to="0"
          class="active"
        ></span>
        <span data-target="#carouselExampleIndicators" data-slide-to="1"></span>
        <span data-target="#carouselExampleIndicators" data-slide-to="2"></span>
      </span>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img
            class="d-block w-100"
            src={require("../Img/teasor2.webp")}
            alt="First slide"
          />
        </div>
        <div class="carousel-item">
          <img
            class="d-block w-100"
            src={require("../Img/teasor3.webp")}
            alt="Second slide"
          />
        </div>
        <div class="carousel-item">
          <img
            class="d-block w-100"
            src={require("../Img/teasor4.webp")}
            alt="Third slide"
          />
        </div>
      </div>
      <a
        class="car-btn carousel-control-prev mx-2 rounded-1 boxShadow"
        href="#carouselExampleIndicators"
        role="button"
        data-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      </a>
      <a
        class="car-btn carousel-control-next mx-2 rounded-1 boxShadow"
        href="#carouselExampleIndicators"
        role="button"
        data-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
      </a>
    </div>
  );
}
