import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchCountries, fetchIndianState } from "../API/Registration";

export default function Register({
  handleRegister,
  gender,
  setGender,
  firstNameError,
  firstName,
  setFirstName,
  lastNameError,
  lastName,
  setLastName,
  dob,
  setDob,
  emailError,
  email,
  setEmail,
  phoneError,
  phoneNo,
  setPhoneNo,
  pwdError,
  pwd,
  setPwd,
  confirmPwdError,
  pwdMissMatch,
  confirmPwd,
  setConfirmPwd,
  areaError,
  area,
  setArea,
  cityError,
  city,
  setCity,
  state1Error,
  state1,
  setState1,
  countryError,
  country,
  setCountry,
  pincodeError,
  pincode,
  setPincode,
  isRegistrationSuccess,
  clearRegistrationForm,
  dobError,
  showLoginPwd,
  setShowLoginPwd,
}) {
  const [countryList, setCountryList] = useState([]);
  const [indianStateList, setIndianStateList] = useState([]);

  const loadIndianStates = (value) => {
    if (country === "India") {
      fetchIndianState(setIndianStateList);
      setState1("Andaman and Nicobar Islands");
    } else {
      setIndianStateList([]);
    }
  };

  useEffect(() => {
    fetchCountries(setCountryList);
    loadIndianStates();
  }, []);

  const handleCountryChange = (value) => {
    setCountry(value);
    if (value === "India") {
      fetchIndianState(setIndianStateList);
      setState1("Andaman and Nicobar Islands");
    } else {
      setState1("");
      setIndianStateList([]);
    }
  };

  return (
    <div class="container bg-light my-5 rounded-3 register boxShadow p-4">
      <div class="modal-content">
        <div class="modal-header row">
          <div className="text-start col-6">
            <h3 class="modal-title text-success" id="exampleModalLabel">
              Registration
            </h3>
          </div>
        </div>
        <div class="modal-body">
          <div className="text-center ">
            <Link to="/login" className="link-primary text-decoration-none">
              Already registered ? Login
            </Link>
          </div>
          <hr />
          <form onSubmit={(e) => handleRegister(e)}>
            <div className="row my-1">
              <div class="col-3">
                <div className="mb-3">Salutation</div>
                <select
                  class="form-control border border-info"
                  label="Gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="Male">Mr.</option>
                  <option value="Female">Ms.</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div class="mb-3 mt-2 row">
              <div className="col-6">
                <div className="row">
                  <label for="fname" className="text-start form-label col-6">
                    First Name
                  </label>
                </div>
                <div
                  className="text-danger text-start"
                  style={{ fontSize: "12px" }}
                >
                  {firstNameError}
                </div>
                <input
                  type="text"
                  class="form-control border border-info"
                  id="fname"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>

              <div class="mb-3 col-6">
                <div className="row">
                  <label for="lname" className="text-start form-label col-6">
                    Last Name
                  </label>
                </div>
                <div
                  className="text-danger text-start"
                  style={{ fontSize: "12px" }}
                >
                  {lastNameError}
                </div>
                <input
                  type="text"
                  placeholder=""
                  className="form-control border border-info"
                  id="lname"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            <div class="mb-3">
              <div className="row">
                <label for="dob" className="text-start form-label col-6">
                  Date of birth
                </label>
              </div>
              <div
                className="text-danger text-start"
                style={{ fontSize: "12px" }}
              >
                {dobError}
              </div>
              <input
                type="date"
                placeholder=""
                className="form-control border border-info"
                id="dob"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
            </div>

            <div class="mb-3">
              <div className="row">
                <label for="mail" className="text-start form-label col-6">
                  Email
                </label>
                <span className="text-danger text-end col-6">{emailError}</span>
              </div>

              <input
                type="text"
                class="form-control border border-info"
                id="mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div class="mb-3">
              <div className="row">
                <label for="phone" className="text-start form-label col-4">
                  Phone number
                </label>
                <span className="text-danger text-end col-8">{phoneError}</span>
              </div>

              <input
                type="text"
                class="form-control border border-info"
                id="phone"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
              />
            </div>
            <div class="mb-3">
              <div className="text-start">
                <label for="pwd" className="form-label">
                  Password
                </label>
              </div>
              <div
                className="text-danger text-start"
                style={{ fontSize: "12px" }}
              >
                {pwdError}
              </div>

              <input
                type={`${showLoginPwd ? "text" : "password"}`}
                class="form-control border border-info"
                id="pwd"
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
              />
            </div>
            <div class="mb-3">
              <div className="row">
                <label for="confirmPwd" className="text-start form-label col-6">
                  Confirm Password
                </label>
                <span className="text-danger text-end col-6">
                  {confirmPwdError === "" ? pwdMissMatch : confirmPwdError}
                </span>
              </div>
              <input
                type={`${showLoginPwd ? "text" : "password"}`}
                class="form-control border border-info"
                id="confirmPwd"
                value={confirmPwd}
                onChange={(e) => setConfirmPwd(e.target.value)}
              />
              <div class="form-check my-2">
                <input
                  checked={showLoginPwd}
                  type="checkbox"
                  class="form-check-input text-center"
                  id="exampleCheck1"
                  onClick={() => setShowLoginPwd(!showLoginPwd)}
                />
                <label
                  className="form-check-label text-primary"
                  for="exampleCheck1"
                >
                  {showLoginPwd ? "Hide passwords" : "Show passwords"}
                </label>
              </div>
            </div>
            <h5 className="text-start text-info">Address:</h5>
            <hr />
            <div class="mb-3 row">
              <div class="col-6">
                <div className="row">
                  <label for="area" className="text-start form-label col-6">
                    Country
                  </label>
                  <span className="text-danger text-end col-6">
                    {countryError}
                  </span>
                </div>
                {/* <input
                  type="text"
                  class="form-control"
                  id="country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                /> */}
                <select
                  className="form-control border border-info"
                  name="country"
                  id="country"
                  value={country}
                  onChange={(e) => handleCountryChange(e.target.value)}
                >
                  {countryList.map((country) => (
                    <option>{country.name}</option>
                  ))}
                </select>
              </div>
              <div className="col-6">
                <div className="row">
                  <label for="area" className="text-start form-label col-6">
                    State
                  </label>
                  <span className="text-danger text-end col-6">
                    {state1Error}
                  </span>
                </div>

                {indianStateList.length !== 0 ? (
                  <select
                    className="form-control border border-info"
                    name="state"
                    id="state"
                    value={state1}
                    onChange={(e) => setState1(e.target.value)}
                  >
                    {indianStateList.length !== 0 &&
                      indianStateList.map((state) => (
                        <option>{state.name}</option>
                      ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    class="form-control border border-info"
                    id="state1"
                    value={state1}
                    onChange={(e) => setState1(e.target.value)}
                  />
                )}
              </div>
            </div>
            <div class="mb-3 row">
              <div class="col-6">
                <div className="row">
                  <label for="area" className="text-start form-label col-6">
                    City
                  </label>
                  <span className="text-danger text-end col-6">
                    {cityError}
                  </span>
                </div>

                <input
                  type="text"
                  class="form-control border border-info"
                  id="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div className="col-6">
                <div className="row">
                  <label for="area" className="text-start form-label col-6">
                    Area
                  </label>
                  <span className="text-danger text-end col-6">
                    {areaError}
                  </span>
                </div>
                <input
                  type="text"
                  class="form-control border border-info"
                  id="area"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                />
              </div>
            </div>

            <div class="mb-3">
              <div className="row">
                <label for="area" className="text-start form-label col-6">
                  Pincode
                </label>
                <span className="text-danger text-end col-6">
                  {pincodeError}
                </span>
              </div>
              <input
                type="text"
                class="form-control border border-info"
                id="pincode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
              />
            </div>
            <div>
              <div className="text-center p-2">
                <span class="text-success">
                  {isRegistrationSuccess
                    ? "Registration successful. please proceed to login page"
                    : ""}
                </span>
              </div>
              <div className="row">
                <div className="col-6 text-start">
                  <button type="submit" class="btn btn-success w-100">
                    Register
                  </button>
                </div>
                <div className="col-6 text-start">
                  <button
                    className="btn btn-outline-danger w-100"
                    data-toggle="modal"
                    data-target="#resetRegForm"
                    onClick={(e) => e.preventDefault()}
                  >
                    Reset Form
                  </button>
                </div>
              </div>

              <div
                class="modal fade"
                id="resetRegForm"
                tabindex="-1"
                role="dialog"
                aria-labelledby="resetRegForm"
                aria-hidden="true"
              >
                <div class="modal-dialog" role="document">
                  <div class="modal-content  bg-light">
                    <div class="modal-footer">
                      <div class="modal-body text-dark">
                        Are you sure ? All form data will be lost!
                      </div>
                      <div>
                        <button
                          type="button"
                          class="btn btn-success mx-4"
                          data-dismiss="modal"
                        >
                          No, Close
                        </button>
                        <button
                          type="button"
                          class="btn btn-danger"
                          data-dismiss="modal"
                          onClick={(e) => clearRegistrationForm(e)}
                        >
                          Yes,Reset
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center my-3">
                <Link to="/login" className="link-primary text-decoration-none">
                  Already registered ? Login
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
