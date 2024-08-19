import React, { useState } from "react";
import ChangePassword from "./ChangePassword";
import axios from "axios";
import {
  notifyUpdateFailuere,
  notifyUpdateSuccess,
} from "../notification/ProfileNotification";
import { Base_URL } from "../API/Base_URL";

export default function Profile({ userDetail, handleLogin }) {
  let salutation = "";

  switch (userDetail.user.gender) {
    case "Male":
      salutation = "Mr.";
      break;
    case "Female":
      salutation = "Ms.";
      break;
    default:
      salutation = "";
      break;
  }

  //flags
  const [firstNameEditFlag, setFirstNameEditFlag] = useState(false);
  const [phoneEditFlag, setPhoneEditFlag] = useState(false);
  const [dobEditFlag, setDobEditFlag] = useState(false);

  const dobSplit = userDetail.user.dateOfBirth.toString().split("/");
  const revDob =
    dobSplit[2] + "/" + dobSplit[1] + "/" + (parseInt(dobSplit[0]) + 1);
  //getter setters
  const [editedDob, seteditedDob] = useState(
    new Date(revDob).toISOString().substring(0, 10)
  );
  const [editedfirstName, seteditedFirstName] = useState(
    userDetail.user.firstName
  );
  const [editedlastName, seteditedLastName] = useState(
    userDetail.user.lastName
  );

  let phone = userDetail.credentials.phoneNumber;
  const [editedphoneNo, seteditedPhoneNo] = useState(phone.toString());

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

  //pwd
  const [oldPwd, setOldPwd] = useState("");
  const [newPwd1, setNewPwd1] = useState("");
  const [newConfirmPwd, setNewConfirmPwd] = useState("");

  //errors
  const [pwdMissMatch, setPwdMissmatch] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [dobError, setDobError] = useState("");
  const [oldPwdError, setOldPwdError] = useState("");
  const [newPwdError, setNewPwdError] = useState("");
  const [newConfirmPwdError, setNewConfirmPwdError] = useState("");
  const [areaError, setAreaError] = useState("");
  const [cityError, setCityError] = useState("");
  const [state1Error, setState1Error] = useState("");
  const [countryError, setCountryError] = useState("");
  const [pincodeError, setPincodeError] = useState("");

  const [pwdUpdateResponse, setPwdUpdateResponse] = useState("");

  const handleNameUpdate = (e) => {
    if (editedfirstName === "" || editedlastName === "") {
      if (editedfirstName === "") {
        setFirstNameError("Empty Firstname!");
      } else {
        setFirstNameError("");
      }

      if (editedlastName === "") {
        setLastNameError("Empty Lastname!");
      } else {
        setLastNameError("");
      }
    } else {
      setFirstNameError("");
      setLastNameError("");
      axios
        .put(`${Base_URL}/user/update/name`, {
          userId: userDetail.user.userId,
          firstName: editedfirstName,
          lastName: editedlastName,
        })
        .then((response) => {
          if (response.status === 200) {
            console.log("Name update !", response.data);
            setFirstNameEditFlag(false);
            handleLogin();
            notifyUpdateSuccess();
          }
        })
        .catch((error) => {
          setFirstNameEditFlag(true);
          console.error(error);
          notifyUpdateFailuere();
        });
    }
  };

  const handleDobUpdate = (e) => {
    if (editedDob === "") {
      setDobError("Empty Date of Birth!");
    } else {
      setDobError("");
      axios
        .put(`${Base_URL}/user/update/dob`, {
          userId: userDetail.user.userId,
          dateOfBirth: new Date(editedDob).toLocaleDateString(),
        })
        .then((response) => {
          if (response.status === 200) {
            console.log("DOb update !", response.data);
            setDobEditFlag(false);
            handleLogin();
            notifyUpdateSuccess();
          }
        })
        .catch((error) => {
          setDobEditFlag(true);
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
            handleLogin();
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
            handleLogin();
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

  const handlePwdUpdate = (e) => {
    let pwdRegex =
      "(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,}";
    if (
      oldPwd === "" ||
      newPwd1 !== newConfirmPwd ||
      !newPwd1.match(pwdRegex)
    ) {
      if (newPwd1 !== newConfirmPwd) {
        setPwdMissmatch("Password doesn't match!");
      }
      if (newConfirmPwd === "") {
        setNewConfirmPwdError("Empty field!");
      }
      if (oldPwd === "") {
        setOldPwdError("Empty Password!");
      }
      if (!newPwd1.match(pwdRegex)) {
        setNewPwdError(
          "Password contains at least 8 characters including at least one upper case letter, one lower case letter,one special symbol(@#$%^&+=) and one number!"
        );
      }
    } else {
      setNewPwdError("");
      setPwdMissmatch("");
      setOldPwdError("");
      setNewConfirmPwdError("");
      axios
        .put(`${Base_URL}/user/update/pwd`, {
          userId: userDetail.user.userId,
          credId: userDetail.credentials.credId,
          oldPwd: oldPwd,
          newPwd: newPwd1,
        })
        .then((response) => {
          if (response.status === 200) {
            if (typeof response.data === typeof "") {
              if (response.data.includes("Incorrect")) {
                setPwdUpdateResponse(response.data);
              } else if (response.data.includes("User not found")) {
                setPwdUpdateResponse(response.data);
              } else if (response.data.includes("Credentials not found")) {
                setPwdUpdateResponse(response.data);
              }
            } else {
              sessionStorage.setItem("pwd", newPwd1);
              handleLogin();
              notifyUpdateSuccess();
              setNewPwd1("");
              setOldPwd("");
              setNewConfirmPwd("");
              setPwdUpdateResponse("Password Update Successful !");
            }
            console.log("Pwd update !", response.data);
          }
        })
        .catch((error) => {
          setPwdUpdateResponse("Password Update Failed Due to Netword Error !");
          console.error(error);
          notifyUpdateFailuere();
        });
    }
  };

  return (
    <div className="container mt-3">
      {/* <div className="text-center text-primary p-3">
        <h4 className="p-3">Profile</h4>
      </div> */}
      <table class="table table-light rounded">
        <tbody>
          <tr>
            <td>Name</td>
            <td>:</td>
            <td>
              {!firstNameEditFlag ? (
                <div>
                  {salutation + " "}
                  <span>
                    {userDetail.user.firstName + " " + userDetail.user.lastName}
                  </span>
                </div>
              ) : (
                <div className="">
                  <div>
                    <h6 className="text-danger">{firstNameError}</h6>
                    <input
                      type="text"
                      placeholder="First Name..."
                      className={`form-control ${
                        firstNameError === "" ? "" : "border border-danger"
                      }`}
                      value={editedfirstName}
                      onChange={(e) => seteditedFirstName(e.target.value)}
                    ></input>
                  </div>
                  <div>
                    <h6 className="text-danger">{lastNameError}</h6>
                    <input
                      type="text"
                      placeholder="Last Name..."
                      className={`form-control mt-2 ${
                        lastNameError === "" ? "" : "border border-danger"
                      }`}
                      value={editedlastName}
                      onChange={(e) => seteditedLastName(e.target.value)}
                    ></input>
                  </div>
                </div>
              )}
            </td>
            <td className="text-end">
              {firstNameEditFlag && (
                <button
                  className="btn btn-outline-success mx-1"
                  onClick={(e) => handleNameUpdate(e)}
                >
                  Save
                </button>
              )}
              <button
                className="btn btn-outline-primary"
                onClick={(e) => setFirstNameEditFlag(!firstNameEditFlag)}
              >
                {firstNameEditFlag ? "Cancel" : <span>&#9998;</span>}
              </button>
            </td>
          </tr>
          <tr>
            <td>Date Of Birth </td>
            <td>:</td>
            <td>
              {!dobEditFlag ? (
                <div>{userDetail.user.dateOfBirth}</div>
              ) : (
                <div className="">
                  <div className="text-danger">{dobError}</div>
                  <input
                    type="date"
                    className={`form-control ${
                      dobError === "" ? "" : "border border-danger"
                    }`}
                    value={editedDob}
                    onChange={(e) => seteditedDob(e.target.value)}
                  ></input>
                </div>
              )}
            </td>
            <td className="text-end">
              {dobEditFlag && (
                <button
                  className="btn btn-outline-success mx-1"
                  onClick={(e) => handleDobUpdate(e)}
                >
                  Save
                </button>
              )}
              <button
                className="btn btn-outline-primary"
                onClick={(e) => setDobEditFlag(!dobEditFlag)}
              >
                {dobEditFlag ? "Cancel" : <span>&#9998;</span>}
              </button>
            </td>
          </tr>
          <tr>
            <td>Email</td>
            <td>:</td>
            <td>{userDetail.credentials.email}</td>
          </tr>
          <tr>
            <td>Phone Number </td>
            <td>:</td>
            <td>
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
            <td className="text-end">
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
                {phoneEditFlag ? "Cancel" : <span>&#9998;</span>}
              </button>
            </td>
          </tr>

          <tr>
            <td>Address</td>
            <td>:</td>
            <td>
              {!addressEditFlag ? (
                <div>
                  {"Area : " +
                    userDetail.address.area +
                    " , " +
                    "City : " +
                    userDetail.address.city +
                    " , " +
                    "State : " +
                    userDetail.address.state +
                    " , " +
                    "Country : " +
                    userDetail.address.country +
                    " , " +
                    "Pincode : " +
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
            </td>
            <td className="text-end">
              {addressEditFlag && (
                <button
                  className="btn btn-outline-success mx-1"
                  onClick={(e) => handleAddressUpdate(e)}
                >
                  Save
                </button>
              )}
              <button
                className="btn btn-outline-primary"
                onClick={(e) => setAddressEditFlag(!addressEditFlag)}
              >
                {addressEditFlag ? "Cancel" : <span>&#9998;</span>}
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <ChangePassword
        userDetail={userDetail}
        handlePwdUpdate={handlePwdUpdate}
        oldPwd={oldPwd}
        setOldPwd={setOldPwd}
        newPwd1={newPwd1}
        setNewPwd1={setNewPwd1}
        newConfirmPwd={newConfirmPwd}
        setNewConfirmPwd={setNewConfirmPwd}
        oldPwdError={oldPwdError}
        newPwdError={newPwdError}
        newConfirmPwdError={newConfirmPwdError}
        pwdUpdateResponse={pwdUpdateResponse}
        pwdMissMatch={pwdMissMatch}
      />
    </div>
  );
}
