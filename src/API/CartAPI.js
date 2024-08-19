import axios from "axios";
import {
  notifyOrderPlaceFailed,
  notifyOrderPlaceSuccess,
} from "../notification/Cart";
import { Base_URL } from "./Base_URL";

export const getCartItems = (setCartItems) => {
  axios
    .get(`${Base_URL}/cart/${sessionStorage.getItem("user_id")}`)
    .then((response) => {
      if (response.status === 200) {
        let res = response.data;
        setCartItems(res);
      }
    })
    .catch((error) => {
      console.error("cartk", error);
    });
  return setCartItems;
};

export const placeOrder = (
  cartItems,
  setIsOrderPlaced,
  setHidePriceSummary,
  setHideCartItems,
  setCartItems,
  setCartItems1,
  getCartItems1,
  getTotalPrice
) => {
  let userId = 0;
  let orderRequest = [];
  cartItems.map((item) => {
    orderRequest.push({
      user_id: item.user_id,
      product_id: item.product_id,
    });
    userId = item.user_id;
  });

  axios
    .post(`${Base_URL}/orders`, orderRequest)
    .then((response) => {
      if (response.status == 200) {
        let res = response.data;
        console.log("placeOrder :", res);
        setIsOrderPlaced(true);
        removeCartAfterOrderPlaced(userId);
        setHidePriceSummary(true);
        setHideCartItems(true);
        setCartItems([]);
        setCartItems1([]);
        getCartItems1();
        getTotalPrice();
        notifyOrderPlaceSuccess();
      }
    })
    .catch((error) => {
      notifyOrderPlaceFailed();
      console.error("cartk", error);
      setIsOrderPlaced(false);
    });
};

export const removeCartAfterOrderPlaced = (userId) => {
  axios
    .delete(`${Base_URL}/cart/delete/${userId}`)
    .then((response) => {
      if (response.status == 200) {
        let res = response.data;
        console.log("cart Delete :", res);
      }
    })
    .catch((error) => {
      console.error("cart delete error :", error);
    });
};
