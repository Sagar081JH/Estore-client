import React from "react";
import ProductCard from "./ProductCard";
import Teasor from "./Teasor";

export default function ProductCards({
  products,
  searchInput,
  userDetail,
  setCartItems,
  isAuthenticated,
  cartItems,
}) {
  return (
    <div>
      <Teasor />
      <div className="row">
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

        <div className="fs-5 text-center my-2">
          <span
            className="p-2 rounded-2 boxShadow textShadow"
            style={{ color: "#008080" }}
          >
            Featured products
          </span>
        </div>
        {products.map((product) => (
          <ProductCard
            setCartItems={setCartItems}
            userDetail={userDetail}
            product={product}
            isAuthenticated={isAuthenticated}
            cartItems={cartItems}
          />
        ))}
      </div>
    </div>
  );
}
