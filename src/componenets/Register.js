import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchCountries, fetchIndianState } from "../API/Registration";

export default function Register(props) {
  const [countryList, setCountryList] = useState([]);
  const [indianStateList, setIndianStateList] = useState([]);

  const loadIndianStates = (value) => {
    if (props.country === "India") {
      fetchIndianState(setIndianStateList);
      props.setState1("Andaman and Nicobar Islands");
    } else {
      setIndianStateList([]);
    }
  };

  useEffect(() => {
    fetchCountries(setCountryList);
    loadIndianStates();
  }, []);

  const handleCountryChange = (value) => {
    props.setCountry(value);
    if (value === "India") {
      fetchIndianState(setIndianStateList);
      props.setState1("Andaman and Nicobar Islands");
    } else {
      props.setState1("");
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
          <form onSubmit={(e) => props.handleRegister(e)}>
            <div className="row my-1">
              <div class="col-3">
                <div className="mb-3">Salutation</div>
                <select
                  class="form-control border border-info"
                  label="Gender"
                  value={props.gender}
                  onChange={(e) => props.setGender(e.target.value)}
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
                  {props.firstNameError}
                </div>
                <input
                  type="text"
                  class="form-control border border-info"
                  id="fname"
                  value={props.firstName}
                  onChange={(e) => props.setFirstName(e.target.value)}
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
                  {props.lastNameError}
                </div>
                <input
                  type="text"
                  placeholder=""
                  className="form-control border border-info"
                  id="lname"
                  value={props.lastName}
                  onChange={(e) => props.setLastName(e.target.value)}
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
                {props.dobError}
              </div>
              <input
                type="date"
                placeholder=""
                className="form-control border border-info"
                id="dob"
                value={props.dob}
                onChange={(e) => props.setDob(e.target.value)}
              />
            </div>

            <div class="mb-3">
              <div className="row">
                <label for="mail" className="text-start form-label col-6">
                  Email
                </label>
                <span className="text-danger text-end col-6">
                  {props.emailError}
                </span>
              </div>

              <input
                type="text"
                class="form-control border border-info"
                id="mail"
                value={props.email}
                onChange={(e) => props.setEmail(e.target.value)}
              />
            </div>
            <div class="mb-3">
              <div className="row">
                <label for="phone" className="text-start form-label col-4">
                  Phone number
                </label>
                <span className="text-danger text-end col-8">
                  {props.phoneError}
                </span>
              </div>

              <input
                type="text"
                class="form-control border border-info"
                id="phone"
                value={props.phoneNo}
                onChange={(e) => props.setPhoneNo(e.target.value)}
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
                {props.pwdError}
              </div>

              <input
                type={`${props.showLoginPwd ? "text" : "password"}`}
                class="form-control border border-info"
                id="pwd"
                value={props.pwd}
                onChange={(e) => props.setPwd(e.target.value)}
              />
            </div>
            <div class="mb-3">
              <div className="row">
                <label for="confirmPwd" className="text-start form-label col-6">
                  Confirm Password
                </label>
                <span className="text-danger text-end col-6">
                  {props.confirmPwdError === ""
                    ? props.pwdMissMatch
                    : props.confirmPwdError}
                </span>
              </div>
              <input
                type={`${props.showLoginPwd ? "text" : "password"}`}
                class="form-control border border-info"
                id="confirmPwd"
                value={props.confirmPwd}
                onChange={(e) => props.setConfirmPwd(e.target.value)}
              />
              <div class="form-check my-2">
                <input
                  checked={props.showLoginPwd}
                  type="checkbox"
                  class="form-check-input text-center"
                  id="exampleCheck1"
                  onClick={() => props.setShowLoginPwd(!props.showLoginPwd)}
                />
                <label
                  className="form-check-label text-primary"
                  for="exampleCheck1"
                >
                  {props.showLoginPwd ? "Hide passwords" : "Show passwords"}
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
                    {props.countryError}
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
                  value={props.country}
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
                    {props.state1Error}
                  </span>
                </div>

                {indianStateList.length !== 0 ? (
                  <select
                    className="form-control border border-info"
                    name="state"
                    id="state"
                    value={props.state1}
                    onChange={(e) => props.setState1(e.target.value)}
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
                    value={props.state1}
                    onChange={(e) => props.setState1(e.target.value)}
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
                    {props.cityError}
                  </span>
                </div>

                <input
                  type="text"
                  class="form-control border border-info"
                  id="city"
                  value={props.city}
                  onChange={(e) => props.setCity(e.target.value)}
                />
              </div>
              <div className="col-6">
                <div className="row">
                  <label for="area" className="text-start form-label col-6">
                    Area
                  </label>
                  <span className="text-danger text-end col-6">
                    {props.areaError}
                  </span>
                </div>
                <input
                  type="text"
                  class="form-control border border-info"
                  id="area"
                  value={props.area}
                  onChange={(e) => props.setArea(e.target.value)}
                />
              </div>
            </div>

            <div class="mb-3">
              <div className="row">
                <label for="area" className="text-start form-label col-6">
                  Pincode
                </label>
                <span className="text-danger text-end col-6">
                  {props.pincodeError}
                </span>
              </div>
              <input
                type="text"
                class="form-control border border-info"
                id="pincode"
                value={props.pincode}
                onChange={(e) => props.setPincode(e.target.value)}
              />
            </div>
            <div>
              <div className="text-center p-2">
                <span class="text-success">
                  {props.isRegistrationSuccess
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
                          onClick={(e) => props.clearRegistrationForm(e)}
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
