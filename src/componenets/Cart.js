import React, { useEffect, useState } from "react";
import CartItem from "./CartItem";
import CartPriceSummary from "./CartPriceSummary";
import axios from "axios";
import {
  notifyCartItemRemoved,
  notifyCartItemRemoveFailed,
} from "../notification/Login";
import {
  getCartItems,
  placeOrder,
  removeCartAfterOrderPlaced,
} from "../API/CartAPI";
import { Link } from "react-router-dom";
import { Base_URL } from "../API/Base_URL";

export default function Cart({
  isAuthenticated,
  userDetails,
  setCartItems1,
  handleLogin,
}) {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalprice] = useState(0);

  const [hidePriceSummary, setHidePriceSummary] = useState(false);
  const [hideCartItems, setHideCartItems] = useState(false);

  let user_id = sessionStorage.getItem("user_id");

  const handleRemoveCartItem = (id) => {
    axios
      .delete(`${Base_URL}/cart/${id}`)
      .then((response) => {
        if (response.status == 200) {
          notifyCartItemRemoved();
          getCartItems1();
          getTotalPrice();
          getCartItems(setCartItems1);
        }
      })
      .catch((error) => {
        notifyCartItemRemoveFailed(error.message);
      });
  };

  const getCartItems1 = () => {
    axios
      .get(`${Base_URL}/cart/${user_id}`)
      .then((response) => {
        if (response.status == 200) {
          setCartItems(response.data);
        }
      })
      .catch((error) => console.error("getCart:", error));
  };

  const getTotalPrice = () => {
    axios
      .get(`${Base_URL}/cart/total_price/${user_id}`)
      .then((response) => {
        if (response.status === 200) {
          setTotalprice(response.data);
        }
      })
      .catch((error) => console.error("getCartPrice:", error));
  };

  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  const handleOrderPlaced = (cartItems) => {
    placeOrder(
      cartItems,
      setIsOrderPlaced,
      setHidePriceSummary,
      setHideCartItems,
      setCartItems,
      setCartItems1,
      getCartItems1,
      getTotalPrice
    );
    removeCartAfterOrderPlaced(user_id);
    setHidePriceSummary(true);
    setHideCartItems(true);
    setCartItems([]);
    setCartItems1([]);
    getCartItems1();
    getTotalPrice();
    console.log("item33:", cartItems);
  };

  useEffect(() => {
    getCartItems1();
    getTotalPrice();
  }, []);

  let count = 1;

  return (
    <div>
      {isAuthenticated && (
        <div className="px-5 pt-5">
          <div className="text-center text-success p-2">
            {cartItems.length === 0 && (
              <div className="text-primary p-5">
                {isOrderPlaced ? (
                  <div className="boxShadow text-success bg-light p-3 rounded-3 my-3">
                    <h4 className="text-dark my-5">
                      Thanks{" "}
                      <span className="text-primary">
                        {userDetails.user.firstName}
                      </span>{" "}
                      for shopping at E-store !
                      <hr />
                    </h4>

                    <h6 className="my-5">
                      !!! Your Order has been placed successfully !!!
                    </h6>
                    <span className="text-danger">
                      Track your orders here :
                    </span>
                    <Link
                      to="/orders"
                      className="btn btn-outline-primary rounded-3 mx-3"
                    >
                      My Orders
                    </Link>
                  </div>
                ) : (
                  <div>
                    <h3 className="mb-3">Your cart is empty !</h3>
                    <Link
                      to="/"
                      className="btn btn-outline-primary p-2 rounded-3 text-decoration-none"
                    >
                      Shop Now
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="row">
            <div class="col-sm-7">
              {!hideCartItems &&
                cartItems.map((item) => (
                  <div>
                    <h6>{count++}</h6>
                    <CartItem
                      key={item.cartItem.cart_item_id}
                      cartItem={item}
                      handleRemoveCartItem={handleRemoveCartItem}
                    />
                  </div>
                ))}
            </div>
            <div class="col-sm-5">
              {!hidePriceSummary && (
                <CartPriceSummary
                  totalPrice={totalPrice}
                  cartItems={cartItems}
                  handleOrderPlaced={handleOrderPlaced}
                  userDetail={userDetails}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
