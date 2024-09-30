import React, { Component } from "react";
import UDLogo from "./../assets/dist/img/UDDLogo.png";
import userlogo from "./../assets/dist/img/avatar5.png";
export default class CitizenMenu extends Component {
  render() {
    return (
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        {/* Brand Logo */}
        <img
          src={UDLogo}
          alt="Directorate of Urban Development"
          className="brand-image img-circle elevation-3"
          style={{ opacity: ".8" }}
        />

        <a href="#" className="brand-link">
          <span className="brand-text">
            Department of <h5 className="pl-5">Urban Development</h5>
          </span>
        </a>
        {/* Sidebar */}
        <div className="sidebar">
          <div className="user-panel pb-3 mb-3 d-flex">
            <div className="image">
              <img
                src={userlogo}
                className="img-circle elevation-2"
                alt="User Image"
              />
            </div>
            <div className="info">
              <a href="#" className="d-block">
                {localStorage.getItem("user")}
              </a>
            </div>
          </div>

          {/* SidebarSearch Form */}
          <div className="form-inline  mt-3">
            <div className="input-group" data-widget="sidebar-search">
              <input
                className="form-control form-control-sidebar"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <div className="input-group-append">
                <button className="btn btn-sidebar">
                  <i className="fas fa-search fa-fw" />
                </button>
              </div>
            </div>
          </div>
          {/* Sidebar Menu */}
          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              {/* Add icons to the links using the .nav-icon class
                                with font-awesome or any other icon font library */}
              <li className="nav-item menu-open">
                <a href="#" className="nav-link active">
                  <i className="nav-icon fas fa-tachometer-alt" />
                  <p>Dashboard</p>
                </a>
              </li>
              <li className="nav-header">Services</li>
              <li className="nav-item">
                <a href="#" className="nav-link">
                  <i className="nav-icon fas fa-copy" />
                  <p>
                    Trade License
                    <i className="fas fa-angle-left right" />
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <a
                      href="/backend/new-trade-registration"
                      className="nav-link"
                    >
                      <i className="far fa-circle nav-icon" />
                      <p>New Registration</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="/backend/trade-license-renewal"
                      className="nav-link"
                    >
                      <i className="far fa-circle nav-icon" />
                      <p>Renewal</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="pages/layout/boxed.html" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>Modification</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="pages/layout/fixed-sidebar.html"
                      className="nav-link"
                    >
                      <i className="far fa-circle nav-icon" />
                      <p>Closure</p>
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link"> 
                  <i className="nav-icon fas fa-copy" />
                  <p>
                    Garbage Collection
                    <i className="fas fa-angle-left right" />
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <a
                      href="/backend/garbage-dashboard"
                      className="nav-link"
                    >
                      <i className="far fa-circle nav-icon" />
                      <p>Dashboard</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="/backend/new-garbage-registration"
                      className="nav-link"
                    >
                      <i className="far fa-circle nav-icon" />
                      <p>New Garbage Registration</p>
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-header">Permissions</li>
              <li className="nav-item">
                <a href="/backend/new-pet-registration" className="nav-link">
                  <i className="nav-icon fas fa-copy" />
                  <p>Pet Registration</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="/backend/new-site-registration" className="nav-link">
                  <i className="nav-icon fas fa-copy" />
                  <p>Advertisement</p>
                </a>
              </li>

            </ul>   
          </nav>
          {/* /.sidebar-menu */}
        </div>
        {/* /.sidebar */}
      </aside>
    );
  }   
}
