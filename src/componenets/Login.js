import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

export default function Login(props) {
  return (
    <div className="container bg-light mt-5 rounded-3 login boxShadow pt-3">
      <div className="text-center fs-3 text-success mt-2">Login</div>
      <form onSubmit={(e) => props.hangleLogin(e)}>
        <div class="mb-3">
          <div className="row">
            <label for="exampleInputEmail1" class="text-start form-label col-6">
              Username
            </label>
            <span className="text-danger text-end col-6">
              {props.loginEmailOrPhoneError}
            </span>
          </div>
          <input
            type="text"
            placeholder="Enter email or phone number"
            className="form-control border border-info"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={props.loginEmailOrPhone}
            onChange={(e) => props.setLoginEmailOrPhonesetEmail(e.target.value)}
          />
        </div>
        <div class="mb-3">
          <div className="row">
            <label for="loginPwd" class="text-start form-label col-6">
              Password
            </label>
            <span className="text-danger text-end col-6">
              {props.loginPwdError}
            </span>
          </div>
          <input
            type={`${props.showLoginPwd ? "text" : "password"}`}
            class="form-control border border-info"
            placeholder="Enter password"
            id="loginPwd"
            value={props.loginPwd}
            onChange={(e) => props.setLoginPwd(e.target.value)}
          />
          <div class="form-check text-start my-2">
            <input
              checked={props.showLoginPwd}
              type="checkbox"
              class="form-check-input"
              id="exampleCheck1"
              onClick={() => props.setShowLoginPwd(!props.showLoginPwd)}
            />
            <label
              className="form-check-label text-primary"
              for="exampleCheck1"
            >
              {props.showLoginPwd ? "Hide" : "Show"} password
            </label>
          </div>
        </div>
        <div>
          <div
            className={`text-center p-2 ${
              props.isAuthenticated ? "text-success" : "text-danger"
            }`}
          >
            {props.isAuthenticated
              ? "Logged In Successfully !"
              : props.loginFailedMsg}
          </div>

          <div className="row">
            <div className="col-6">
              <button type="submit" class={`btn btn-primary w-100`}>
                Login
              </button>
            </div>
            <div className="col-6">
              <button
                class="btn btn-outline-danger w-100"
                data-toggle="modal"
                data-target="#resetLoginForm1"
                onClick={(e) => e.preventDefault()}
              >
                Reset Form
              </button>
            </div>
          </div>

          <div
            class="modal fade"
            id="resetLoginForm1"
            tabindex="-1"
            role="dialog"
            aria-labelledby="resetLoginForm1"
            aria-hidden="true"
          >
            <div class="modal-dialog" role="document">
              <div class="modal-content  bg-light">
                <div class="modal-footer">
                  <div class="modal-body text-dark">Are you sure?</div>
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
                      onClick={(e) => props.resetLoginForm(e)}
                    >
                      Yes,Reset
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center my-3">
            <Link to="/sign-up" className="link-primary text-decoration-none">
              New here ? Please Register
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
