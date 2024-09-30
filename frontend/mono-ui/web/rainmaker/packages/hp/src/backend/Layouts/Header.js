import React, { Component } from "react";
import userlogo from "./../assets/dist/img/avatar5.png";
import { CommonFunctions } from "./../../utils/CommonFunctions";

// Ensure to use $ only where necessary, consider removing if not needed.
window.$ = window.jQuery;
$.widget.bridge("uibutton", $.ui.button);

export default class Header extends Component {
  render() {
    const userRoleInfo =
      JSON.parse(localStorage.getItem("userMappedRoles")) || [];
    const currentUser = localStorage.getItem("user") || "";
    const currentRole =
      JSON.parse(localStorage.getItem("userCurrentRole")) || {};
    const { updateUserCurrentRole } = CommonFunctions();
    return (
      <>
        {/* Navbar */}
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a
                className="nav-link"
                data-widget="pushmenu"
                href="#"
                role="button"
              >
                <i className="fas fa-bars" />
              </a>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item dropdown">
              <a className="nav-link" data-toggle="dropdown" href="#">
                <div className="image">
                  <img
                    src={userlogo}
                    className="img-circle elevation-2 user-logo"
                    alt="User"
                  />
                  <span className="user-name">{currentUser.toUpperCase()}</span>
                </div>
              </a>
              <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                {userRoleInfo.map((userInfo, index) => {
                  const { code, name, tenantId } = userInfo;
                  const isCurrentRole = currentRole.code === code;

                  if (code === "EMPLOYEE" && (name=="Employee" || name=="EMPLOYEE")) return null;
                  return (
                    <a
                      href="#"
                      className="dropdown-item"
                      onClick={(e) => {
                        e.preventDefault();
                        updateUserCurrentRole(index,currentRole.code);
                      }}
                      key={code}
                    >
                      <div className="media">
                        <div className="media-body">
                          <h3 className="dropdown-item-title">
                            {name}
                            {isCurrentRole && (
                              <span className="float-right text-sm text-danger">
                                <i className="fas fa-star" />
                              </span>
                            )}
                          </h3>
                          {code !== "CITIZEN" && tenantId && (
                            <p className="text-sm">
                              {tenantId.split(".")[1].toUpperCase()}
                            </p>
                          )}
                        </div>
                      </div>
                    </a>
                  );
                })}
                <div className="dropdown-divider" />
                <a
                  href="/logout"
                  className="bg bg-danger dropdown-item dropdown-footer"
                >
                  <i className="fas fa-sign-out-alt" /> Sign out
                </a>
              </div>
            </li>
          </ul>
        </nav>
      </>
    );
  }
}
