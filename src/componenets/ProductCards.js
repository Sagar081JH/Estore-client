import React from "react";
import ProductCard from "./ProductCard";
import { Link, Route, Routes } from "react-router-dom";
import Teasor from "./Teasor";

export default function ProductCards({
  products,
  searchInput,
  userDetail,
  setCartItems,
  isAuthenticated,
}) {
  return (
    <div>
      <Teasor />
      <div className="row p-3">
        {products &&
          products.length === 0 &&
          (searchInput.length !== 0 ? (
            <></>
          ) : (
            <div class="text-center p-5">
              <div class="spinner-border text-warning" role="status">
                <span class="sr-only"></span>
              </div>
              <h5 className="text-warning">Loading...</h5>
            </div>
          ))}

        {/* {searchInput.length !== 0 && (
        <div className="mx-3 p-1">
          <span className="text-danger fs-4">{products.length}</span>
          <span className="fs-6"> product found with search :</span>
          <span className="text-primary fs-5"> {searchInput}</span>
        </div>
      )} */}
        <div className="fs-5 text-center my-2 ">
          <span
            className="p-2 rounded-2 text-light"
            style={{ backgroundColor: "#008080" }}
          >
            Smart Phones
          </span>
        </div>
        {products.map((product) => (
          <ProductCard
            setCartItems={setCartItems}
            userDetail={userDetail}
            product={product}
            isAuthenticated={isAuthenticated}
          />
        ))}
      </div>
    </div>
  );
}
