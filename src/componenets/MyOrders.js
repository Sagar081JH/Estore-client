import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  notifyOrderCancelFailure,
  notifyOrderCancelSuccess,
} from "../notification/Cart";
import { Base_URL } from "../API/Base_URL";

export default function MyOrders(userId) {
  const [myOrders, setMyOrders] = useState([]);

  const hadleOrderCancel = (id) => {
    axios
      .delete(`${Base_URL}/orders/${id}`)
      .then((response) => {
        if (response.status === 200) {
          let res = response.data;
          getOrderList();
          if (myOrders.length === 1) {
            setMyOrders([]);
          }
          notifyOrderCancelSuccess();
        }
      })
      .catch((error) => {
        getOrderList();
        notifyOrderCancelFailure();
      });
  };

  const getOrderList = () => {
    axios
      .get(`${Base_URL}/orders/${userId.userId}`)
      .then((response) => {
        if (response.status === 200) {
          let res = response.data;
          setMyOrders(res);
        }
      })
      .catch((error) => {
        console.error("myorderErr : ", error);
      });
  };

  useEffect(() => {
    getOrderList();
  });

  let count = 1;
  return (
    <div className="container p-5">
      <div className="mt-4 fs-4 text-start">
        <span className="p-2 boxShadow rounded">
          {" "}
          My orders ({myOrders.length})
        </span>
      </div>

      {myOrders && myOrders.length !== 0 ? (
        <div className="row">
          {myOrders.map((order) => (
            <div class="col-12 col-sm-6 my-3">
              <span className="boxShadow p-2 rounded">{count++}</span>
              <div class="card bg-light">
                <div class="card-body boxShadow">
                  <div>
                    <span className="text-info" style={{ fontSize: "12px" }}>
                      Product Name
                    </span>
                    <h5
                      class="card-title text-dark"
                      style={{ fontSize: "16px" }}
                    >
                      {order.product.title}
                    </h5>
                  </div>
                  <span className="text-info" style={{ fontSize: "12px" }}>
                    Price
                  </span>
                  <h6 className="text-dark"> ₹ {order.product.price}</h6>

                  <span className="text-info" style={{ fontSize: "12px" }}>
                    Status
                  </span>
                  <h6 className="text-dark">Pending</h6>
                  <hr />
                  <div className="text-center">
                    <button
                      className="btn w-50 btn-outline-primary rounded rounded-5"
                      onClick={() => hadleOrderCancel(order.order_id)}
                    >
                      Cancel Order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <h6 className="text-success my-3">You haven't ordered anything !</h6>
          <div>
            <Link
              to="/"
              className="btn btn-outline-success p-2 rounded-3 text-decoration-none"
            >
              Order Now !
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
