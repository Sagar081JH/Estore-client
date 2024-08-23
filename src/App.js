import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import "./SearchBar.css";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  redirect,
  Navigate,
} from "react-router-dom";
import Profile from "./componenets/Profile";
import ErrorPage from "./componenets/ErrorPage";
import Login from "./componenets/Login";
import Register from "./componenets/Register";
import ProductCards from "./componenets/ProductCards";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  notifyLoggedIn,
  notifyLoggedOut,
  notifyLoginFailed,
} from "./notification/Login";
import Footer from "./componenets/Footer";
import AboutUs from "./componenets/About";
import Cart from "./componenets/Cart";
import { getCartItems } from "./API/CartAPI";

import {
  notifyRegistrationFailed,
  notifyRegistrationSuccess,
} from "./notification/Registration";
import MyOrders from "./componenets/MyOrders";
import { Base_URL } from "./API/Base_URL";
import Navigation from "./componenets/Navigation";

function App() {
  const [products, setProducts] = useState([]);

  //login
  const [loginEmailOrPhone, setLoginEmailOrPhonesetEmail] = useState("");
  const [loginPwd, setLoginPwd] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userDetail, setUserDetails] = useState({});
  const [loginFailedMsg, setLoginFailedMsg] = useState("");
  const [loginEmailOrPhoneError, setLoginEmailOrPhonesetEmailError] =
    useState("");
  const [loginPwdError, setLoginPwdError] = useState("");

  const [showLoginPwd, setShowLoginPwd] = useState(false);
  //Registration
  const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false);
  const [gender, setGender] = useState("Male");
  const [dob, setDob] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [pwd, setPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [area, setArea] = useState("");
  const [city, setCity] = useState("");
  const [state1, setState1] = useState("");
  const [country, setCountry] = useState("India");
  const [pincode, setPincode] = useState("");

  //Search
  const [searchProduct, setSearchProduct] = useState("");
  const [pathName, setPathName] = useState("");

  useEffect(() => {
    if (searchProduct.length > 1) {
      setPathName("/");
    } else {
      setPathName(window.location.pathname);
    }
  });

  const onSearchChange = (e) => {
    e.preventDefault();
    setSearchProduct(e.target.value);
    //window.location.href = "/";
  };

  const [filteredProducts, setfilteredProducts] = useState(products);

  const handleSearch = () => {
    setTimeout(() => {
      let filtered = products.filter((product) =>
        product.title.toLowerCase().includes(searchProduct.toLowerCase())
      );
      setfilteredProducts(filtered);
    }, 500);
  };

  useEffect(() => {
    handleSearch();
  });

  const resetLoginForm = (e) => {
    e.preventDefault();
    setLoginEmailOrPhonesetEmailError("");
    setLoginPwdError("");
    setLoginEmailOrPhonesetEmail("");
    setLoginPwd("");
    setLoginFailedMsg("");
    setShowLoginPwd("");
  };

  const hangleLogin = (e) => {
    e.preventDefault();
    var phoneNumber = 0;
    var email1 = "";
    if (loginEmailOrPhone === "" || loginPwd === "") {
      if (loginEmailOrPhone === "") {
        setLoginEmailOrPhonesetEmailError("Empty username!");
      } else {
        setLoginEmailOrPhonesetEmailError("");
      }
      if (loginPwd === "") {
        setLoginPwdError("Empty password!");
      } else {
        setLoginPwdError("");
      }
    } else {
      setLoginEmailOrPhonesetEmailError("");
      setLoginPwdError("");

      if (loginEmailOrPhone.toString().includes("@")) {
        email1 = loginEmailOrPhone;
      } else {
        phoneNumber = parseInt(loginEmailOrPhone);
      }
      axios
        .post(`${Base_URL}/login`, {
          username: loginEmailOrPhone,
          password: loginPwd,
        })
        .then((response) => {
          if (response.status === 200) {
            setLoginFailedMsg("Login successful, please close this pop-up");
            setIsAuthenticated(true);
            // setUserId(response.data.user.userId);
            sessionStorage.setItem("email", response.data.credentials.email);
            sessionStorage.setItem(
              "phone",
              response.data.credentials.phoneNumber
            );
            sessionStorage.setItem("user_id", response.data.user.userId);
            sessionStorage.setItem("pwd", response.data.credentials.pwd);
            setUserDetails(response.data);
            resetLoginForm(e);
            notifyLoggedIn();
          }
        })
        .catch((error) => {
          notifyLoginFailed();
          if (error.message.includes("401")) {
            setLoginFailedMsg("Incorrect username or password !");
          } else {
            setLoginFailedMsg("Network error !");
          }

          setIsAuthenticated(false);
        });
    }
  };

  const [cartItems, setCartItems] = useState([]);

  const handleLogout = (e) => {
    e.preventDefault();
    sessionStorage.clear();

    setTimeout(() => {
      setIsAuthenticated(false);
      setLoginFailedMsg("");
    }, 500);
    notifyLoggedOut();
  };

  const [pwdMissMatch, setPwdMissmatch] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [dobError, setDobError] = useState("");
  const [pwdError, setPwdError] = useState("");
  const [confirmPwdError, setConfirmPwdError] = useState("");
  const [areaError, setAreaError] = useState("");
  const [cityError, setCityError] = useState("");
  const [state1Error, setState1Error] = useState("");
  const [countryError, setCountryError] = useState("");
  const [pincodeError, setPincodeError] = useState("");

  //cart
  // const [userId, setUserId] = useState();

  const clearRegistrationForm = (e) => {
    e.preventDefault();
    setGender("Male");
    setDobError("");
    setDob("");
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhoneNo("");
    setPwd("");
    setConfirmPwd("");
    setArea("");
    setCity("");
    setState1("Andaman and Nicobar Islands");
    setCountry("India");
    setPincode("");
    setPwdMissmatch("");
    setEmailError("");
    setPhoneError("");
    setFirstNameError("");
    setLastNameError("");
    setPwdError("");
    setConfirmPwdError("");
    setAreaError("");
    setCityError("");
    setState1Error("");
    setCountryError("");
    setPincodeError("");
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      pwd === "" ||
      confirmPwd === "" ||
      phoneNo === "" ||
      area === "" ||
      city === "" ||
      state1 === "" ||
      country === "" ||
      pincode === "" ||
      dob === ""
    ) {
      if (pwd !== confirmPwd) {
        setPwdMissmatch("Password doesn't match!");
      } else {
        setPwdMissmatch("");
      }

      if (dob === "") {
        setDobError("Please select date of birth!");
      } else {
        setDobError("");
      }

      let pwdRegex =
        "(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,}";
      if (!pwd.match(pwdRegex)) {
        setPwdError(
          "Password contains at least 8 characters including at least one upper case letter, one lower case letter,one special symbol(@#$%^&+=) and one number!"
        );
      } else {
        setPwdError("");
      }

      if (confirmPwd === "") {
        setConfirmPwdError("Empty Confirm password!");
      } else {
        setConfirmPwdError("");
      }

      let regexp = "^[A-Za-z]{1,29}$";
      if (!firstName.match(regexp)) {
        setFirstNameError(
          "Please include only alphabets ranging from 1 to 29 characters!"
        );
      } else {
        setFirstNameError("");
      }

      if (!lastName.match(regexp)) {
        setLastNameError(
          "Please include only alphabets ranging from 1 to 29 characters!"
        );
      } else {
        setLastNameError("");
      }

      let emailRegex = "[a-z0-9_%+-]+@[a-z0-9]+.[a-z]{2,3}$";
      if (!email.match(emailRegex)) {
        setEmailError("Please enter valid email!");
      } else {
        setEmailError("");
      }

      let phoneRegex = "^[0-9]{10}$";
      if (!phoneNo.match(phoneRegex)) {
        setPhoneError("Please ensure 10 digit number!");
      } else {
        setPhoneError("");
      }

      if (area === "") {
        setAreaError("Empty area!");
      } else {
        setAreaError("");
      }
      if (city === "") {
        setCityError("Empty city!");
      } else {
        setCityError("");
      }
      if (state1 === "") {
        setState1Error("Empty state!");
      } else {
        setState1Error("");
      }
      if (country === "") {
        setCountryError("Empty country!");
      } else {
        setCountryError("");
      }

      let pincodeRegex = "^[0-9]{6}$";
      if (!pincode.match(pincodeRegex)) {
        setPincodeError("Please ensure 6 digit pincode!");
      } else {
        setPincodeError("");
      }
    } else {
      setFirstNameError("");
      setLastNameError("");
      setPwdError("");
      setConfirmPwdError("");
      setAreaError("");
      setPhoneError("");
      setCityError("");
      setState1Error("");
      setCountryError("");
      setPincodeError("");
      setEmailError("");

      let newUser = {
        user: {
          firstName: firstName,
          lastName: lastName,
          gender: gender,
          dateOfBirth: new Date(dob).toLocaleDateString(),
        },
        credentials: {
          email: email,
          phoneNumber: parseInt(phoneNo + "l"),
          pwd: pwd,
        },
        address: {
          area: area,
          city: city,
          state: state1,
          country: country,
          pinCode: parseInt(pincode + "l"),
        },
      };

      axios
        .post(`${Base_URL}/register`, newUser)
        .then((response) => {
          if (typeof response.data === typeof "") {
            if (response.data.includes("Email and Phone")) {
              setEmailError("Email already exists!");
              setPhoneError("Phone Number already exists!");
            } else {
              setEmailError("");
              setPhoneError("");

              response.data === "Email already exists!"
                ? setEmailError("Email already exists!")
                : setEmailError("");

              response.data === "Phone Number already exists!"
                ? setPhoneError("Phone Number already exists!")
                : setPhoneError("");
            }
          }
          if (typeof response.data === typeof {}) {
            setIsRegistrationSuccess(true);
            setTimeout(() => {
              setIsRegistrationSuccess(false);
            }, 10000);
            notifyRegistrationSuccess();
            clearRegistrationForm(e);
          } else {
            setIsRegistrationSuccess(false);
            notifyLoginFailed();
          }
          setUserDetails(response.data);
        })
        .catch((error) => {
          setIsRegistrationSuccess(false);
          notifyRegistrationFailed();
        });
    }
  };

  const [productsLoadMsg, setProductsLoadMsg] = useState("");

  const handleLogin = () => {
    if (sessionStorage.getItem("pwd") != null) {
      let uname =
        sessionStorage.getItem("email") === ""
          ? sessionStorage.getItem("phone")
          : sessionStorage.getItem("email");
      if (uname != "") {
        let upwd = sessionStorage.getItem("pwd");
        axios
          .post(`${Base_URL}/login`, {
            username: uname,
            password: upwd,
          })
          .then((response) => {
            if (response.status === 200) {
              setLoginFailedMsg("Login successful, please close this pop-up");
              setIsAuthenticated(true);
              setUserDetails(response.data);
              redirect("/");
            }
          })
          .catch((error) => {
            if (error.message.includes("401")) {
              setLoginFailedMsg("Incorrect username or password !");
            } else {
              setLoginFailedMsg("Network error !");
            }
            setIsAuthenticated(false);
          });
      }
    } else {
      setIsAuthenticated(false);
    }
  };

  const [healthStatus, setHealthStatus] = useState();

  const getApplicationHealth = () => {
    axios
      .get(`${Base_URL}/actuator/health`)
      .then((response) => {
        setHealthStatus(response.data.status);
        console.log("health:", response.data.status);
      })
      .catch((error) => console.error(error));
  };

  const getProducts = () => {
    axios
      .get(`${Base_URL}/products`)
      .then((response) => {
        setProducts(response.data);
        if (response.data.length === 0) {
          setProductsLoadMsg("Products not available!");
        }
      })
      .catch((error) => {
        setProductsLoadMsg(`Server Error ! : ${error.message}`);
      });
  };
  useEffect(() => {
    handleLogin();
    getCartItems(setCartItems);
    getProducts();
    getApplicationHealth();
  }, []);

  return (
    <Router>
      {products && products.length > 0 ? (
        <div className="">
          <ToastContainer />
          <div className="">
            <Navigation
              isAuthenticated={isAuthenticated}
              searchProduct={searchProduct}
              onSearchChange={onSearchChange}
              handleSearch={handleSearch}
              userDetail={userDetail}
              cartItems={cartItems}
              handleLogout={handleLogout}
              filteredProducts={filteredProducts}
            />
          </div>

          {isAuthenticated && userDetail.user.role === "ADMIN" && (
            <div
              className={`text-center mt-3 pt-5 boxShadow ${
                healthStatus === "UP" ? "text-success" : "text-danger"
              }`}
            >
              Application Health Status : {healthStatus}
            </div>
          )}

          <Routes>
            <Route
              path="/"
              element={
                <ProductCards
                  products={products}
                  searchInput={searchProduct}
                  userDetail={userDetail}
                  setCartItems={setCartItems}
                  isAuthenticated={isAuthenticated}
                  cartItems={cartItems}
                />
              }
            />
            <Route
              path="/profile"
              element={
                isAuthenticated ? (
                  <Profile userDetail={userDetail} handleLogin={handleLogin} />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/*"
              element={
                <ErrorPage
                  filteredProducts={filteredProducts}
                  msg={productsLoadMsg}
                />
              }
            />
            <Route
              path="/about-us"
              element={<AboutUs msg={productsLoadMsg} />}
            />
            <Route
              path="/cart"
              element={
                !isAuthenticated ? (
                  <Navigate to="/" />
                ) : (
                  <Cart
                    isAuthenticated={isAuthenticated}
                    userDetails={userDetail}
                    setCartItems1={setCartItems}
                    handleLogin={handleLogin}
                  />
                )
              }
            />

            <Route
              path="/login"
              element={
                isAuthenticated ? (
                  <Navigate to="/" />
                ) : (
                  <Login
                    hangleLogin={hangleLogin}
                    loginEmailOrPhoneError={loginEmailOrPhoneError}
                    loginEmailOrPhone={loginEmailOrPhone}
                    setLoginEmailOrPhonesetEmail={setLoginEmailOrPhonesetEmail}
                    loginPwdError={loginPwdError}
                    showLoginPwd={showLoginPwd}
                    loginPwd={loginPwd}
                    setLoginPwd={setLoginPwd}
                    setShowLoginPwd={setShowLoginPwd}
                    isAuthenticated={isAuthenticated}
                    loginFailedMsg={loginFailedMsg}
                    resetLoginForm={resetLoginForm}
                  />
                )
              }
            />
            <Route
              path="/sign-up"
              element={
                <Register
                  handleRegister={handleRegister}
                  gender={gender}
                  setGender={setGender}
                  firstNameError={firstNameError}
                  firstName={firstName}
                  setFirstName={setFirstName}
                  lastNameError={lastNameError}
                  lastName={lastName}
                  setLastName={setLastName}
                  dob={dob}
                  setDob={setDob}
                  emailError={emailError}
                  email={email}
                  setEmail={setEmail}
                  phoneError={phoneError}
                  phoneNo={phoneNo}
                  setPhoneNo={setPhoneNo}
                  pwdError={pwdError}
                  pwd={pwd}
                  setPwd={setPwd}
                  confirmPwdError={confirmPwdError}
                  pwdMissMatch={pwdMissMatch}
                  confirmPwd={confirmPwd}
                  setConfirmPwd={setConfirmPwd}
                  areaError={areaError}
                  area={area}
                  setArea={setArea}
                  cityError={cityError}
                  city={city}
                  setCity={setCity}
                  state1Error={state1Error}
                  state1={state1}
                  setState1={setState1}
                  countryError={countryError}
                  country={country}
                  setCountry={setCountry}
                  pincodeError={pincodeError}
                  pincode={pincode}
                  setPincode={setPincode}
                  isRegistrationSuccess={isRegistrationSuccess}
                  clearRegistrationForm={clearRegistrationForm}
                  dobError={dobError}
                  showLoginPwd={showLoginPwd}
                  setShowLoginPwd={setShowLoginPwd}
                />
              }
            />
            <Route
              path="/orders"
              element={
                !isAuthenticated ? (
                  <Navigate to="/" />
                ) : (
                  <MyOrders userId={sessionStorage.getItem("user_id")} />
                )
              }
            />
          </Routes>
          <Footer />
        </div>
      ) : (
        <ErrorPage />
      )}
    </Router>
  );
}

export default App;
