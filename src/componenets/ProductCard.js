import React, { useState } from "react";
import ProductDetails from "./ProductDetails";
import CartIcon from "./CartIcon";
import axios from "axios";
import {
  notifyAddToCart,
  notifyAddToCartFailure,
  notifyToLoginFirst,
} from "../notification/Login";
import { getCartItems } from "../API/CartAPI";
import {
  notifyBuyNowFailed,
  notifyBuyNowSuccess,
  notifyDeleteProductFailed,
  notifyDeleteProductSuccess,
} from "../notification/Home";
import { Base_URL } from "../API/Base_URL";

export default function ProductCard({
  setCartItems,
  userDetail,
  product,
  isAuthenticated,
}) {
  const productId = product.productId;

  const handleAddToCart = (e) => {
    if (isAuthenticated) {
      let user_id = userDetail.user.userId;
      if (user_id !== 0) {
        axios
          .post(`${Base_URL}/cart/add`, {
            productId: product.productId,
            userId: user_id,
          })
          .then((response) => {
            if (response.status === 200) {
              notifyAddToCart();
              getCartItems(setCartItems);
            }
          })
          .catch((error) => {
            console.error(error);
            notifyAddToCartFailure();
          });
      }
    } else {
      e.preventDefault();
      notifyToLoginFirst();
    }
  };

  const handleBuyNow = (e) => {
    if (isAuthenticated) {
      axios
        .post(`${Base_URL}/orders`, [
          {
            user_id: userDetail.user.userId,
            product_id: product.productId,
          },
        ])
        .then((response) => {
          if (response.status === 200) {
            let res = response.data;
            notifyBuyNowSuccess();
            console.log("buyNow :", res);
          }
        })
        .catch((error) => {
          notifyBuyNowFailed();
          console.error("buy now :", error);
        });
    } else {
      e.preventDefault();
      notifyToLoginFirst();
    }
  };

  const handleDeleteProduct = (e) => {
    if (isAuthenticated) {
      axios
        .delete(`${Base_URL}/products/${productId}`)
        .then((response) => {
          if (response.status === 200) {
            let res = response.data;
            notifyDeleteProductSuccess();
            console.log("deltetProduct :", res);
          }
        })
        .catch((error) => {
          notifyDeleteProductFailed();
          console.error("buy now :", error);
        });
    } else {
      e.preventDefault();
      notifyToLoginFirst();
    }
  };

  let productTitle = product.title;
  let img1 = require("../Img/Oneplus 10r pro(1).jpg");
  let img2 = require("../Img/Oneplus 10r pro(2).jpg");
  let img3 = require("../Img/Oneplus 10r pro(3).jpg");
  let img4 = require("../Img/Oneplus 10r pro(4).jpg");
  let img5 = require("../Img/Oneplus 10r pro(2).jpg");

  if (productTitle.toLowerCase().includes("apple iphone 14")) {
    img1 = require("../Img/Apple Iphone 14(1).jpg");
    img2 = require("../Img/Apple Iphone 14(2).jpg");
    img3 = require("../Img/Apple Iphone 14(3).jpg");
    img4 = require("../Img/Apple Iphone 14(4).jpg");
    img5 = require("../Img/Apple Iphone 14(5).jpg");
  }
  if (productTitle.toLowerCase().includes("pixel 7")) {
    img1 = require("../Img/Google pixel 7(1).jpg");
    img2 = require("../Img/Google pixel 7(2).jpg");
    img3 = require("../Img/Google pixel 7(3).jpg");
    img4 = require("../Img/Google pixel 7(4).jpg");
    img5 = require("../Img/Google pixel 7(5).jpg");
  }
  if (productTitle.toLowerCase().includes("apple iphone 15")) {
    img1 = require("../Img/Apple Iphone 15(1).jpg");
    img2 = require("../Img/Apple Iphone 15(2).jpg");
    img3 = require("../Img/Apple Iphone 15(3).jpg");
    img4 = require("../Img/Apple Iphone 15(4).jpg");
    img5 = require("../Img/Apple Iphone 15(5).jpg");
  }

  return (
    <div class="col-sm-3 my-1">
      <div class="card  bg-light">
        <div class="card-body">
          <h6 class="card-title text-dark">{product.title}</h6>
          <hr className="" />
          <div id={productId} class="carousel carousel-dark carousel slide">
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img src={`${img1}`} class="d-block w-100 rounded" alt="..." />
              </div>
              <div class="carousel-item">
                <img src={`${img2}`} class="d-block w-100 rounded" alt="..." />
              </div>
              <div class="carousel-item">
                <img src={`${img3}`} class="d-block w-100 rounded" alt="..." />
              </div>
              <div class="carousel-item">
                <img src={`${img4}`} class="d-block w-100 rounded" alt="..." />
              </div>
              <div class="carousel-item">
                <img src={`${img5}`} class="d-block w-100 rounded" alt="..." />
              </div>
            </div>

            <button
              class="carousel-control-prev"
              type="button"
              data-bs-target={`#${product.productId}`}
              data-bs-slide="prev"
            >
              <span
                class="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button
              class="carousel-control-next"
              type="button"
              data-bs-target={`#${product.productId}`}
              data-bs-slide="next"
            >
              <span
                class="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Next</span>
            </button>

            {/* <div class="carousel-indicators">
              <button
                type="button"
                data-bs-target={`#${productId}`}
                data-bs-slide-to="0"
                class="active"
                aria-current="true"
                aria-label="Slide 4"
              ></button>
              <button
                type="button"
                data-bs-target={`#${productId}`}
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
              <button
                type="button"
                data-bs-target={`#${productId}`}
                data-bs-slide-to="2"
                aria-label="Slide 3"
              ></button>
              <button
                type="button"
                data-bs-target={`#${productId}`}
                data-bs-slide-to="3"
                aria-label="Slide 4"
              ></button>
              <button
                type="button"
                data-bs-target={`#${productId}`}
                data-bs-slide-to="4"
                aria-label="Slide 5"
              ></button>
              <button
                type="button"
                data-bs-target={`#${productId}`}
                data-bs-slide-to="5"
                aria-label="Slide 1"
              ></button>
            </div> */}
          </div>

          <hr className="" />
          <p class="card-text text-center">
            {/* {product.info} */}
            <div>
              <div className="text-center my-1 py-1 ">
                <button
                  href=""
                  className="btn btn-outline-info rounded-4 rounded p-2"
                  data-bs-toggle="modal"
                  data-bs-target={`#${productId}modal`}
                >
                  Specifications
                </button>
              </div>
              <div
                class="modal fade"
                id={productId + "modal"}
                tabindex="-1"
                aria-labelledby="product-details-modal-label"
                aria-hidden="true"
              >
                <ProductDetails
                  product={product}
                  handleBuyNow={handleBuyNow}
                  handleAddToCart={handleAddToCart}
                  img1={img1}
                  img2={img2}
                  img3={img3}
                  img4={img4}
                  img5={img5}
                />
              </div>
            </div>
          </p>
          <hr className="" />
          <h6 className="">Price : ₹ {product.price}</h6>
          <hr className="" />
          <div className="row">
            <span className="col-6 text-start">
              <button
                className="btn btn-warning rounded-4"
                data-toggle="tooltip"
                data-placement="top"
                title="Add to Cart"
                onClick={(e) => handleAddToCart(e)}
              >
                {/* <img
                  height={"35px"}
                  className="rounded"
                  src={require("./cart1.png")}
                /> */}
                <CartIcon />
              </button>
            </span>

            <span className="col-6 text-end">
              <button
                className="btn btn-primary rounded-4"
                onClick={(e) => handleBuyNow(e)}
              >
                Buy now
              </button>
            </span>
          </div>
          {isAuthenticated && userDetail.user.role === "ADMIN" && (
            <div className="text-center">
              <hr />
              <div>
                <button
                  type="button"
                  class="btn btn-outline-danger mt-3"
                  data-toggle="modal"
                  data-target="#deleteProduct"
                >
                  Delete Product
                </button>
                <div
                  class="modal fade"
                  id="deleteProduct"
                  tabindex="-1"
                  role="dialog"
                  aria-labelledby="deleteProduct"
                  aria-hidden="true"
                >
                  <div class="modal-dialog" role="document" id="deleteProduct">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h6 class="">
                          The product will be deleted permanently. Are you sure?
                        </h6>
                      </div>
                      {/* <div class="modal-body">...</div> */}
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-primary"
                          data-dismiss="modal"
                        >
                          No
                        </button>
                        <button
                          type="button"
                          class="btn btn-danger"
                          onClick={(e) => handleDeleteProduct(e)}
                          data-dismiss="modal"
                        >
                          Yes, Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
