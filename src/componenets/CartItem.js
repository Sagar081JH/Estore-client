import React from "react";
import CartSpecsCollapse from "./CartSpecsCollapse";

export default function CartItem({ key, cartItem, handleRemoveCartItem }) {
  return (
    <div>
      <div class="card mb-3 pb-3 bg-light border border-info p-1 boxShadow">
        <div class="card-body bg-light">
          <div className="row">
            <div className="col-6">
              <span class="card-title text-info" style={{ fontSize: "12px" }}>
                Product name
              </span>
            </div>
            <div className="col-3">
              <span class="card-title text-info" style={{ fontSize: "12px" }}>
                Price
              </span>
            </div>
            <div className="col-3 text-end">
              <div></div>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <h5 class="card-title">{cartItem.cartItem.title}</h5>
            </div>
            <div className="col-6">
              <h5 class="card-title">₹ {cartItem.cartItem.price}</h5>
            </div>
          </div>
          <hr className="" />
          <div className="">
            <div className="row">
              <div className="col-6">
                <button
                  class="btn btn-info rounded rounded-4"
                  type="button"
                  data-toggle="collapse"
                  data-target={`#${cartItem.cartItem.cart_item_id}`}
                  aria-expanded="false"
                  aria-controls="collapseSpecs"
                >
                  Details &#x27F1;
                </button>
              </div>

              <div className="col-6 text-end">
                <button
                  className="btn btn-warning rounded rounded-4"
                  onClick={() =>
                    handleRemoveCartItem(cartItem.cartItem.cart_item_id)
                  }
                >
                  Remove &#x2613;
                </button>
              </div>
            </div>

            <div className=" mt-2">
              <CartSpecsCollapse cartItem={cartItem} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
