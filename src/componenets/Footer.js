import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

export default function Footer() {
  return (
    <div
      class="mx-2 rounded-3 bg-light rounded-6"
      style={{ backgroundColor: " #008080" }}
    >
      <hr />
      <footer class="py-3 my-4">
        <ul class="nav justify-content-center border-bottom pb-3 mb-3">
          <li class="nav-item">
            <Link to="/" class="nav-link px-2 text-muted boxShadow rounded">
              <span className="hoverLink">Home</span>
            </Link>
          </li>
          <li class="nav-item">
            <Link
              to="/about-us"
              class="nav-link px-2 text-muted boxShadow rounded mx-3"
            >
              <span className="hoverLink">About us</span>
            </Link>
          </li>
        </ul>
        <p class="text-center text-primary ">
          <span className="boxShadow rounded p-2">
            {" "}
            © Dev : Mr. Sagar Ghumare
          </span>
        </p>
      </footer>
    </div>
  );
}
