import React from "react";
import OrderConfirmation from "./OrderConfirmation";

export default function CartPriceSummary({
  totalPrice,
  cartItems,
  handleOrderPlaced,
  userDetail,
}) {
  return (
    <div className="">
      {totalPrice !== "Empty cart!" && (
        <div>
          <div class="card bg-light boxShadow rounded mt-4">
            <div class="card-body border border-light rounded-4 bg-light">
              <h5 class="card-title text-start text-dark">Price Details</h5>

              <hr className="text-dark" />
              {cartItems &&
                cartItems.map((item) => (
                  <div className="row mb-2">
                    <div
                      className="col-6 text-start text-dark"
                      style={{ fontSize: "14px" }}
                    >
                      {item.cartItem.title}
                    </div>

                    <div
                      className="col-6 text-end text-dark"
                      style={{ fontSize: "15px" }}
                    >
                      ₹ {item.cartItem.price}
                    </div>
                  </div>
                ))}
              <hr className="text-primary" />
              <div className="row">
                <div className="col-6 text-start text-primary">
                  <h6>Total Amount </h6>
                </div>
                <div
                  className="col-6 text-end text-primary"
                  style={{ fontSize: "17px" }}
                >
                  ₹ {totalPrice}
                </div>
              </div>
            </div>
          </div>
          <div className="text-end my-2 boxShadow rounded">
            <button
              type="button"
              className="btn btn-primary w-100 p-2 boxShadow"
              data-toggle="modal"
              data-target="#exampleModalCenter"
            >
              Place Order
            </button>

            <div
              class="modal fade"
              id="exampleModalCenter"
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalCenterTitle"
              aria-hidden="true"
            >
              <OrderConfirmation
                userDetail={userDetail}
                cartItems={cartItems}
                handleOrderPlaced={handleOrderPlaced}
                handleBuyNow={() => {}}
                page={"cart"}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
