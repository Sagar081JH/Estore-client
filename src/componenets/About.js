import React from "react";

export default function AboutUs({ msg }) {
  return (
    <div className="container">
      <div className="text-start text-primary p-2">
        <h3 className="">About us</h3>
        <hr />
      </div>
      <div className="text-center text-success mb-3">
        <h6>Devloped by : Mr. Sagar Ghumare</h6>
        <h6>Email : sghumare11@gmail.com</h6>
      </div>
      <p className="text-center p-3 text-primary">
        This is an ecommerce project developed by using ReactJs, Spring Boot and
        uses mySQL Database for data persistance.
      </p>
    </div>
  );
}
