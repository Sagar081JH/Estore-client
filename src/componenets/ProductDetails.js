import React from "react";

export default function ProductDetails({
  product,
  handleBuyNow,
  handleAddToCart,
  img1,
  img2,
  img3,
  img4,
  img5,
}) {
  return (
    <div>
      <div class="modal-dialog bg-dark text-light rounded-3">
        <div class="modal-content bg-dark text-light">
          <div class="modal-header bg-dark text-light">
            <h5 class="modal-title text-info" id={product.productId + "modal"}>
              {product.title}
            </h5>
            <button
              type="button"
              className="btn-close bg-light"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div>
              <div
                id={product.productId + "modal1"}
                class="carousel carousel-dark carousel slide"
              >
                <div class="carousel-indicators">
                  <button
                    type="button"
                    data-bs-target={`#${product.productId}modal1`}
                    data-bs-slide-to="0"
                    class="active"
                    aria-current="true"
                    aria-label="Slide 1"
                  ></button>
                  <button
                    type="button"
                    data-bs-target={`#${product.productId}modal1`}
                    data-bs-slide-to="1"
                    aria-label="Slide 2"
                  ></button>
                  <button
                    type="button"
                    data-bs-target={`#${product.productId}modal1`}
                    data-bs-slide-to="2"
                    aria-label="Slide 3"
                  ></button>
                  <button
                    type="button"
                    data-bs-target={`#${product.productId}modal1`}
                    data-bs-slide-to="3"
                    aria-label="Slide 4"
                  ></button>
                  <button
                    type="button"
                    data-bs-target={`#${product.productId}modal1`}
                    data-bs-slide-to="4"
                    aria-label="Slide 5"
                  ></button>
                  <button
                    type="button"
                    data-bs-target={`#${product.productId}modal1`}
                    data-bs-slide-to="5"
                    aria-label="Slide 1"
                  ></button>
                </div>
                <div class="carousel-inner">
                  <div class="carousel-item active">
                    <img
                      src={`${img1}`}
                      class="d-block w-100 rounded"
                      alt="..."
                    />
                  </div>
                  <div class="carousel-item">
                    <img
                      src={`${img2}`}
                      class="d-block w-100 rounded"
                      alt="..."
                    />
                  </div>
                  <div class="carousel-item">
                    <img
                      src={`${img3}`}
                      class="d-block w-100 rounded"
                      alt="..."
                    />
                  </div>
                  <div class="carousel-item">
                    <img
                      src={`${img4}`}
                      class="d-block w-100 rounded"
                      alt="..."
                    />
                  </div>
                  <div class="carousel-item">
                    <img
                      src={`${img5}`}
                      class="d-block w-100 rounded"
                      alt="..."
                    />
                  </div>
                </div>
                <button
                  class="carousel-control-prev"
                  type="button"
                  data-bs-target={`#${product.productId}modal1`}
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
                  data-bs-target={`#${product.productId}modal1`}
                  data-bs-slide="next"
                >
                  <span
                    class="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span class="visually-hidden">Next</span>
                </button>
              </div>
            </div>
            <hr />
            <div className="text-center">
              <h6 className="text-light">{product.info}</h6>
            </div>

            <div className="text-center py-2">
              <h4 className="text-info ">
                <span className="border border-info rounded p-2">
                  ₹ {product.price}/-
                </span>
              </h4>
            </div>
            <table class="table table-dark text-start">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Color</td>
                  <td>{product.color}</td>
                </tr>
                <tr>
                  <td>Storage</td>
                  <td>{product.storage}</td>
                </tr>
                <tr>
                  <td>RAM-ROM</td>
                  <td>{product.ram_rom}</td>
                </tr>
                <tr>
                  <td>Processor</td>
                  <td>{product.processor}</td>
                </tr>
                <tr>
                  <td>Rear camera</td>
                  <td>{product.rearCamera}</td>
                </tr>
                <tr>
                  <td>Front camera</td>
                  <td>{product.frontCamera}</td>
                </tr>
                <tr>
                  <td>Display</td>
                  <td>{product.display}</td>
                </tr>
              </tbody>
            </table>

            <div className="row">
              <span className=" col-6 text-start">
                <button
                  className="btn btn-warning rounded-5"
                  onClick={(e) => handleAddToCart(e)}
                >
                  Add to cart
                </button>
              </span>
              <span className=" col-6 text-end">
                <button
                  className="btn btn-info col-6 rounded-5"
                  onClick={(e) => handleBuyNow(e)}
                >
                  Buy Now
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
