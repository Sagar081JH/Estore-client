import React from "react";
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
import { Link } from "react-router-dom";
import OrderConfirmation from "./OrderConfirmation";

export default function ProductCard({
  setCartItems,
  userDetail,
  product,
  isAuthenticated,
  cartItems,
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
      //e.preventDefault();
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
    <div class="col-sm-3 my-1 rounded-3 bg-light boxShadow">
      <div class="card rounded-3 bg-light my-2">
        <div class="card-body">
          <Link
            className="text-decoration-none"
            data-bs-toggle="modal"
            data-bs-target={`#${productId}modal`}
          >
            <span class="card-title text-success boxShadow rounded p-2">
              {product.title}
            </span>
            <hr className="" />
          </Link>
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
          </div>

          <hr className="" />
          <p class="card-text text-center">
            {/* {product.info} */}
            <div>
              <div className="text-center my-1 py-1 ">
                <button
                  href=""
                  className="btn text-primary rounded-4 boxShadow"
                  data-bs-toggle="modal"
                  data-bs-target={`#${productId}modal`}
                >
                  Specifications
                </button>
              </div>

              {/* <Link to="/card/details">Details</Link>
              <Routes>
                <Route
                  path="/card/:details"
                  element={
                    <Details
                      product={product}
                      handleBuyNow={handleBuyNow}
                      handleAddToCart={handleAddToCart}
                      img1={img1}
                      img2={img2}
                      img3={img3}
                      img4={img4}
                      img5={img5}
                    />
                  }
                ></Route>
              </Routes> */}

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
              {isAuthenticated ? (
                <button
                  className="btn btn-warning rounded-4  boxShadow rounded"
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
              ) : (
                <Link
                  to="/login"
                  className="btn btn-warning rounded-4  boxShadow rounded"
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
                </Link>
              )}
            </span>

            <span className="col-6 text-end">
              {isAuthenticated ? (
                <div>
                  <div className="text-end my-2 rounded">
                    <button
                      className="btn btn-primary rounded-4 boxShadow rounded"
                      type="button"
                      data-toggle="modal"
                      data-target="#exampleModalCenter"
                    >
                      Buy now
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
                        handleOrderPlaced={() => {}}
                        handleBuyNow={handleBuyNow}
                        page={"products"}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="btn btn-primary rounded-4  boxShadow rounded"
                  onClick={(e) => handleBuyNow(e)}
                >
                  Buy now
                </Link>
              )}
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
