import React, { useState } from "react";

export default function ChangePassword({
  handlePwdUpdate,
  oldPwd,
  setOldPwd,
  newPwd1,
  setNewPwd1,
  newConfirmPwd,
  setNewConfirmPwd,
  oldPwdError,
  newPwdError,
  newConfirmPwdError,
  pwdUpdateResponse,
  pwdMissMatch,
}) {
  const [showPwds, setShowPwds] = useState(false);

  return (
    <div>
      <button
        type="button"
        class="btn btn-primary"
        data-toggle="modal"
        data-target="#edit-profie"
      >
        Change Password
      </button>

      <div
        class="modal fade"
        id="edit-profie"
        tabindex="-1"
        role="dialog"
        aria-labelledby="edit-profie"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="row modal-header">
              <div className=" col-6">
                <h5 class="modal-title" id="edit-profie">
                  Change Password
                </h5>
              </div>
              <div className=" text-end col-6">
                <button
                  type="button"
                  class="close btn btn-danger"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            </div>
            <div class="modal-body">
              <div className="mb-4">
                <span className="mb-2">Old password</span>
                <div className="text-danger text-end">{oldPwdError}</div>
                <input
                  type={`${showPwds ? "text" : "password"}`}
                  placeholder="Enter your old password..."
                  className={`form-control mt-2 ${
                    oldPwdError === "" ? "" : "border border-danger"
                  }`}
                  value={oldPwd}
                  onChange={(e) => setOldPwd(e.target.value)}
                ></input>
              </div>
              <div className="mb-4">
                <span>New password</span>
                <div
                  className="text-danger text-start"
                  style={{ fontSize: "12px" }}
                >
                  {newPwdError}
                </div>
                <input
                  type={`${showPwds ? "text" : "password"}`}
                  placeholder="Enter new password..."
                  className={`form-control mt-2 ${
                    newPwdError === "" ? "" : "border border-danger"
                  }`}
                  value={newPwd1}
                  onChange={(e) => setNewPwd1(e.target.value)}
                ></input>
              </div>
              <div className="mb-4">
                <span>Confirm New password</span>
                <div className="text-danger text-start">
                  {newConfirmPwdError}
                </div>
                <div className="text-danger text-start">{pwdMissMatch}</div>
                <input
                  type={`${showPwds ? "text" : "password"}`}
                  placeholder="Enter new password..."
                  className={`form-control mt-2 ${
                    newConfirmPwdError === "" ? "" : "border border-danger"
                  }`}
                  value={newConfirmPwd}
                  onChange={(e) => setNewConfirmPwd(e.target.value)}
                ></input>
              </div>
              <div class="form-check text-start my-2">
                <input
                  checked={showPwds}
                  type="checkbox"
                  class="form-check-input"
                  id="exampleCheck1"
                  onClick={() => setShowPwds(!showPwds)}
                />
                <label
                  className="form-check-label text-primary"
                  for="exampleCheck1"
                >
                  Show passwords
                </label>
              </div>
            </div>
            <div
              className={`text-center ${
                pwdUpdateResponse.includes("Successful")
                  ? "text-success"
                  : "text-danger"
              }`}
            >
              {pwdUpdateResponse}
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                onClick={(e) => handlePwdUpdate(e)}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
