import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

export default function Navigation({
  isAuthenticated,
  searchProduct,
  onSearchChange,
  handleSearch,
  userDetail,
  cartItems,
  handleLogout,
  filteredProducts,
}) {
  return (
    <nav
      class="navbar navbar-expand-lg text-light fixed-top mb-5"
      style={{ backgroundColor: " #008080" }}
    >
      <Link
        class="mx-2 navbar-brand fs-4 link-light text-decoration-none"
        to="/"
      >
        <div className="text-start boxShadow rounded-3">
          <img
            className="bg-light rounded-5"
            height="30vh"
            width="30vw"
            src={require("../componenets/icon3.png")}
            alt=""
          />
          <span className="hoverTitle mx-1">&#x2208;-store</span>
        </div>
      </Link>
      <form
        class="row form my-2 mx-1  form-inline my-lg-0"
        onSubmit={handleSearch}
      >
        <div class="col-9 dropdown">
          <input
            className="dropdown-toggle border border-info search-input p-2"
            type="search"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            placeholder="Search for product..."
            aria-label="Search"
            value={searchProduct}
            onChange={(e) => onSearchChange(e)}
          />
          <div
            class="searchdropdown dropdown-menu p-2 bg-light"
            aria-labelledby="dropdownMenuButton"
          >
            {searchProduct.length !== 0 && filteredProducts.length === 0 && (
              <div className="text-center text-warning px-5">
                No match found!
              </div>
            )}
            {searchProduct.length !== 0 ? (
              filteredProducts.map((product) => (
                <div className="px-5 my-2">
                  <Link
                    className="text-decoration-none text-success"
                    data-bs-toggle="modal"
                    data-bs-target={`#${product.productId}modal`}
                  >
                    {product.title}
                  </Link>
                  {filteredProducts.length !== 1 && <hr />}
                </div>
              ))
            ) : (
              <div className="text-muted">e.g.: iphone 14</div>
            )}
          </div>
        </div>
        <Link className="col-2 form-inline" to="/">
          <button
            class="p-2 btn btn-light border border-info"
            type="submit"
            className="p-2 border border-info search-btn"
          >
            <img
              src={require("../Img/search.jpg")}
              height="20vh"
              width="20vw"
              className="rounded-5"
              alt="icon"
            ></img>
          </button>
        </Link>
      </form>

      <button
        class="navbar-toggler mx-1 btn btn-light"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        {isAuthenticated ? (
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active mt-2 mx-3 boxShadow p-1 rounded">
              <span class="sr-only">
                Welcome, {userDetail.user.firstName} &#128522;
              </span>
            </li>
            <li class="nav-item mx-3 mt-2 boxShadow p-1 rounded">
              <div>
                <Link
                  to="/cart"
                  className="rounded-4 text-decoration-none mt-1"
                >
                  <span className="cartIcon text-light">Cart</span>
                </Link>
                <Link
                  to="/cart"
                  className="rounded-4"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="cart"
                >
                  <span className="fs-6 ">
                    <a class="" style={{ position: "relative" }}>
                      <span class="badge badge-light text-info">&#x1F6D2;</span>
                      <i
                        class="text-warning"
                        style={{
                          position: "absolute",
                          top: "-10px",
                          right: "-5px",
                        }}
                      >
                        {cartItems !== undefined && cartItems.length !== 0
                          ? cartItems.length
                          : ""}
                      </i>
                    </a>
                  </span>
                </Link>
              </div>
            </li>

            <li class="nav-item dropdown mx-3">
              <span
                class="nav-link link-light dropdown-toggle boxShadow rounded p-2 mt-2"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span className="hoverLink">Account</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-person"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                </svg>
              </span>
              <div
                class="dropdown-menu p-2 text-light"
                aria-labelledby="navbarDropdown"
                style={{ backgroundColor: " #008080" }}
              >
                {userDetail && (
                  <div>
                    <div className="my-2 p-1 boxShadow rounded">
                      {userDetail.user.firstName +
                        " " +
                        userDetail.user.lastName}
                    </div>
                    <div className="my-2 p-1 boxShadow rounded">
                      {userDetail.credentials.email}
                    </div>
                    <div className="my-2 p-1 boxShadow rounded">
                      {userDetail.credentials.phoneNumber}
                    </div>
                  </div>
                )}
                <Link
                  to="/profile"
                  className="btn link-warning mx-2 rounded-3 boxShadow my-3"
                >
                  Profile
                </Link>

                <Link
                  to="/orders"
                  className="btn link-warning rounded-3 boxShadow"
                >
                  My Orders
                </Link>
              </div>
            </li>
            <li class="nav-item mt-2 boxShadow rounded mx-2 p-1">
              <div className="mt-1">
                <span
                  className="text-light"
                  data-toggle="modal"
                  data-target="#logout"
                  style={{ cursor: "pointer" }}
                >
                  <span className="hoverLink mx-2 text-warning">Log-out</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-box-arrow-right"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"
                    />
                    <path
                      fill-rule="evenodd"
                      d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
                    />
                  </svg>
                </span>
                <div
                  class="modal fade"
                  id="logout"
                  tabindex="-1"
                  role="dialog"
                  aria-labelledby="logout"
                  aria-hidden="true"
                >
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="text-dark" id="logout">
                          Do you want to logout ?
                        </h5>
                      </div>

                      <div class="modal-footer text-center">
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
                          onClick={(e) => handleLogout(e)}
                          data-dismiss="modal"
                        >
                          Yes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        ) : (
          <ul class="navbar-nav mr-auto">
            <li class="mx-2 nav-item active mt-1 boxShadow rounded">
              <Link to="/login" type="button " class="btn text-light">
                Login
              </Link>
            </li>
            <li class="nav-item mt-1 mx-2 boxShadow rounded">
              <Link to="/sign-up" className="btn text-light ">
                Sign Up
              </Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}
