import React from "react";

export default function CartSpecsCollapse({ cartItem }) {
  return (
    <div
      class="collapse bg-dark text-light border border-info p-1 rounded-4"
      id={cartItem.cartItem.cart_item_id}
    >
      <div class="card card-body bg-dark">
        <div className="bg-dark">
          <div className="row">
            <span className="col-5 text-end">Color</span>
            <span className="col-2">:</span>
            <span className="col-5 text-start">{cartItem.cartItem.color}</span>
            <hr />
          </div>
          <div className="row">
            <span className="col-5 text-end">Display</span>
            <span className="col-2">:</span>
            <span className="col-5 text-start">
              {cartItem.cartItem.display}
            </span>
            <hr />
          </div>

          <div className="row">
            <td className="col-5 text-end">Processor</td>
            <td className="col-2">:</td>
            <td className="col-5 text-start">{cartItem.cartItem.processor}</td>
            <hr />
          </div>

          <div className="row">
            <td className="col-5 text-end">Front Camera</td>
            <td className="col-2">:</td>
            <td className="col-5 text-start">
              {cartItem.cartItem.frontCamera}
            </td>
            <hr />
          </div>

          <div className="row">
            <td className="col-5 text-end">Rear Camera</td>
            <td className="col-2">:</td>
            <td className="col-5 text-start">{cartItem.cartItem.rearCamera}</td>
            <hr />
          </div>

          <div className="row">
            <td className="col-5 text-end">RAM/ROM</td>
            <td className="col-2">:</td>
            <td className="col-5 text-start">{cartItem.cartItem.ram_rom}</td>
          </div>
        </div>
      </div>
    </div>
  );
}
