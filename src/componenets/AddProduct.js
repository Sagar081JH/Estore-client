import React from "react";

export default function AddProduct() {
  return (
    <div class="modal-content bg-dark text-light" id="addProduct">
      <div class="modal-header bg-dark text-light" id="addProduct">
        <h5 class="modal-title text-info">title</h5>
        <button
          type="button"
          className="btn-close bg-light"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>
      <div class="modal-body">
        <hr />
        <div className="text-center">
          <h6 className="text-light">info</h6>
        </div>

        <div className="text-center py-2">
          <h4 className="text-info ">
            <span className="border border-info rounded p-2">₹ price/-</span>
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
              <td>color</td>
            </tr>
            <tr>
              <td>Storage</td>
              <td>storage</td>
            </tr>
            <tr>
              <td>RAM-ROM</td>
              <td>input</td>
            </tr>
            <tr>
              <td>Processor</td>
              <td>input</td>
            </tr>
            <tr>
              <td>Rear camera</td>
              <td>input</td>
            </tr>
            <tr>
              <td>Front camera</td>
              <td>input</td>
            </tr>
            <tr>
              <td>Display</td>
              <td>input</td>
            </tr>
          </tbody>
        </table>

        <div className="row">
          <span className=" col-6 text-start">
            <button className="btn btn-dark rounded-5" data-bs-dismiss="modal">
              Cancel
            </button>
          </span>
          <span className=" col-6 text-end">
            <button className="btn btn-primary col-6 rounded-5">Add</button>
          </span>
        </div>
      </div>
    </div>
  );
}
