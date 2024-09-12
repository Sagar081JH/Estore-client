import React, { useState } from "react";
import { Base_URL } from "../API/Base_URL";
import axios from "axios";
import {
  notifyUpdateFailuere,
  notifyUpdateSuccess,
} from "../notification/ProfileNotification";

export default function OrderConfirmation({
  userDetail,
  cartItems,
  handleOrderPlaced,
  handleBuyNow,
  page,
  productId,
}) {
  const [editedarea, seteditedArea] = useState(userDetail.address.area);
  const [editedcity, seteditedCity] = useState(userDetail.address.city);
  const [editedstate1, seteditedState1] = useState(userDetail.address.state);
  const [editedcountry, seteditedCountry] = useState(
    userDetail.address.country
  );
  const [editedpincode, seteditedPincode] = useState(
    userDetail.address.pinCode.toString()
  );

  const [addressEditFlag, setAddressEditFlag] = useState(false);
  const [areaError, setAreaError] = useState("");
  const [cityError, setCityError] = useState("");
  const [state1Error, setState1Error] = useState("");
  const [countryError, setCountryError] = useState("");
  const [pincodeError, setPincodeError] = useState("");

  let phone = userDetail.credentials.phoneNumber;
  const [phoneEditFlag, setPhoneEditFlag] = useState(false);
  const [editedphoneNo, seteditedPhoneNo] = useState(phone.toString());
  const [phoneError, setPhoneError] = useState("");

  console.log("confirmId:", productId);

  const handleAddressUpdate = (e) => {
    let pincodeRegex = "^[0-9]{6}$";
    if (
      editedarea === "" ||
      editedcity === "" ||
      editedstate1 === "" ||
      editedcountry === "" ||
      !editedpincode.match(pincodeRegex)
    ) {
      editedarea === "" ? setAreaError("Empty area!") : setAreaError("");
      editedcity === "" ? setCityError("Empty city!") : setCityError("");
      editedstate1 === "" ? setState1Error("Empty state!") : setState1Error("");
      editedcountry === ""
        ? setCountryError("Empty Country!")
        : setCountryError("");

      if (!editedpincode.match(pincodeRegex)) {
        setPincodeError("Please ensure 6 digit pincode!");
      } else {
        setPincodeError("");
      }
    } else {
      setAreaError("");
      setCityError("");
      setState1Error("");
      setCountryError("");
      setPincodeError("");

      axios
        .put(`${Base_URL}/user/update/address`, {
          userId: userDetail.user.userId,
          addressId: userDetail.address.address_id,
          area: editedarea,
          city: editedcity,
          state: editedstate1,
          country: editedcountry,
          pinCode: parseInt(editedpincode + "l"),
        })
        .then((response) => {
          if (response.status === 200) {
            console.log("Address update !", response.data);
            setAddressEditFlag(false);
            notifyUpdateSuccess();
          }
        })
        .catch((error) => {
          setAddressEditFlag(true);
          console.error(error);
          notifyUpdateFailuere();
        });
    }
  };

  const handlePhoneUpdate = (e) => {
    let phoneRegex = "^[0-9]{10}$";
    console.log("typeof phone:", typeof editedphoneNo);
    if (!editedphoneNo.match(phoneRegex)) {
      setPhoneError("Please ensure 10 digit number!");
    } else {
      setPhoneError("");
      axios
        .put(`${Base_URL}/user/update/phone`, {
          userId: userDetail.user.userId,
          credId: userDetail.credentials.credId,
          phoneNo: parseInt(editedphoneNo + "l"),
        })
        .then((response) => {
          if (response.status === 200) {
            console.log("Phone update !", response.data);
            setPhoneEditFlag(false);
            notifyUpdateSuccess();
          }
        })
        .catch((error) => {
          setPhoneEditFlag(true);
          console.error(error);
          notifyUpdateFailuere();
        });
    }
  };

  return (
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="row p-3">
          <div className="col-6 text-start">
            <h4 class="modal-title text-success" id="exampleModalLongTitle">
              Order Confirmation
            </h4>
          </div>
          <div className="col-6">
            <button
              type="button"
              class="close btn btn-outline-danger"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </div>
        <hr />
        <div class="modal-body text-start">
          <div>
            <div className="row">
              <h6 className="col-6 text-primary">Delivery address</h6>
              {!addressEditFlag && (
                <div className="text-end col-6">
                  <button
                    className="btn btn-outline-primary"
                    onClick={(e) => setAddressEditFlag(!addressEditFlag)}
                  >
                    Update &#9998;
                  </button>
                </div>
              )}
            </div>
            <div>
              {!addressEditFlag ? (
                <div>
                  {userDetail.address.area +
                    " , " +
                    userDetail.address.city +
                    " , " +
                    userDetail.address.state +
                    " , " +
                    userDetail.address.country +
                    " , " +
                    userDetail.address.pinCode}
                </div>
              ) : (
                <div className="">
                  <div className="text-danger my-2">{areaError}</div>
                  <input
                    type="text"
                    placeholder="area..."
                    className={`form-control mb-2 ${
                      areaError === "" ? "" : "border border-danger"
                    }`}
                    value={editedarea}
                    onChange={(e) => seteditedArea(e.target.value)}
                  ></input>
                  <div className="text-danger my-2">{cityError}</div>
                  <input
                    type="text"
                    placeholder="city..."
                    className={`form-control mb-2 ${
                      cityError === "" ? "" : "border border-danger"
                    }`}
                    value={editedcity}
                    onChange={(e) => seteditedCity(e.target.value)}
                  ></input>
                  <div className="text-danger my-2">{state1Error}</div>
                  <input
                    type="text"
                    placeholder="state..."
                    className={`form-control mb-2 ${
                      state1Error === "" ? "" : "border border-danger"
                    }`}
                    value={editedstate1}
                    onChange={(e) => seteditedState1(e.target.value)}
                  ></input>
                  <div className="text-danger my-2">{countryError}</div>
                  <input
                    type="text"
                    placeholder="country..."
                    className={`form-control mb-2 ${
                      countryError === "" ? "" : "border border-danger"
                    }`}
                    value={editedcountry}
                    onChange={(e) => seteditedCountry(e.target.value)}
                  ></input>
                  <div className="text-danger my-2">{pincodeError}</div>
                  <input
                    type="text"
                    placeholder="pincode..."
                    className={`form-control mb-2 ${
                      pincodeError === "" ? "" : "border border-danger"
                    }`}
                    value={editedpincode}
                    onChange={(e) => seteditedPincode(e.target.value)}
                  ></input>
                </div>
              )}
            </div>
            <div className="my-2">
              {addressEditFlag && (
                <div>
                  <button
                    className="btn btn-outline-success mx-1"
                    onClick={(e) => handleAddressUpdate(e)}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-outline-primary"
                    onClick={(e) => setAddressEditFlag(!addressEditFlag)}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
          <hr />
          <div className="my-3">
            <h6 className="text-primary">Phone Number</h6>
            <div className="row">
              <td className="col-6">
                {!phoneEditFlag ? (
                  <div>{userDetail.credentials.phoneNumber}</div>
                ) : (
                  <div className="">
                    <div className="text-danger">{phoneError}</div>
                    <input
                      type="text"
                      className={`form-control ${
                        phoneError === "" ? "" : "border border-danger"
                      }`}
                      value={editedphoneNo}
                      onChange={(e) => seteditedPhoneNo(e.target.value)}
                    ></input>
                  </div>
                )}
              </td>
              <td className="text-end col-6">
                {phoneEditFlag && (
                  <button
                    className="btn btn-outline-success mx-1"
                    onClick={(e) => handlePhoneUpdate(e)}
                  >
                    Save
                  </button>
                )}
                <button
                  className="btn btn-outline-primary"
                  onClick={(e) => setPhoneEditFlag(!phoneEditFlag)}
                >
                  {phoneEditFlag ? "Cancel" : <span>Update &#9998;</span>}
                </button>
              </td>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            className="btn w-100 p-2 btn-primary rounded-4 boxShadow"
            data-dismiss="modal"
            aria-label="Close"
            onClick={(e) =>
              page === "cart"
                ? handleOrderPlaced(cartItems)
                : handleBuyNow(productId)
            }
          >
            {page === "cart" ? (
              <span>Place Order &#10004;</span>
            ) : (
              <span>Buy now</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
