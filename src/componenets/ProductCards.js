import React from "react";
import ProductCard from "./ProductCard";
import Teasor from "./Teasor";

export default function ProductCards(props) {
  return (
    <div>
      <Teasor />
      <div className="row">
        {props.products &&
          props.products.length === 0 &&
          (props.searchInput.length !== 0 ? (
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
        <div className="my-3 text-end">
          Sort By :{" "}
          <select onChange={(e) => props.sortProductsBy(e.target.value)}>
            <option value="default">Default</option>
            <option value="nameAscending">Title : Ascending</option>
            <option value="nameDescending">Title : Descending</option>
            <option value="priceAscending">Price : Low to High</option>
            <option value="priceDescending">Price : High to Low</option>
          </select>{" "}
          Order
        </div>
        {props.products.map((product) => (
          <ProductCard
            key={product.productId}
            setCartItems={props.setCartItems}
            userDetail={props.userDetail}
            product={product}
            isAuthenticated={props.isAuthenticated}
            cartItems={props.cartItems}
          />
        ))}
      </div>
    </div>
  );
}
