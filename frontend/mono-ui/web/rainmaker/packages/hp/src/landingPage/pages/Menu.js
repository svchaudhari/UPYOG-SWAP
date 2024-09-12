import React, { Component } from "react";
export default class Menu extends Component {
  componentDidMount() {
    $("#citizen-login").click(function (e) {
      e.preventDefault();
      getIframeSSO(process.env.REACT_APP_SSO_SERVICE_ID, "login", "user_type");
    });
  }
  render() {
    return (
      <div>
        {/* Main menu */}
        <div className="backdrop" />
        <div id="dynamicIframe" className="" />
        <div id="iframeContainer" className="iframe-container" />
        <div className="menuWrapper">
          <div className="menuMoreText hide">More</div>
          <div className="container">
            <nav className="menu">
              <ul id="menu-header-en" className="nav clearfix">
                {/* Menu items */}
                <li className="menu-item">
                  <a href="./site/index">Home</a>
                </li>
                <li className="menu-item menu-item-has-children has-sub">
                  <a href="#">
                    About us<span className="indicator"></span>
                  </a>
                  <ul className="sub-menu" aria-hidden="true">
                    <li className="menu-item">
                      <a href="./pages/introduction">Introduction</a>
                    </li>
                    <li className="menu-item">
                      <a href="./pages/whos-who">Organization Chart</a>
                    </li>
                  </ul>
                </li>
                <li className="menu-item">
                  <a href="./transaction/default/top-ten-contributors">
                    Notification/Order
                  </a>
                </li>
                <li className="menu-item menu-item-has-children has-sub">
                  <a href="#">
                    Reports<span className="indicator"></span>
                  </a>
                  <ul className="sub-menu" aria-hidden="true">
                    <li className="menu-item">
                      <a href="./transaction/default/online-contributors">
                        Report 1
                      </a>
                    </li>
                    <li className="menu-item">
                      <a href="./transaction/default/offline-contributors">
                        Report 2
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="menu-item">
                  <a href="./transaction">User Manual/Guide</a>
                </li>
                <li className="menu-item">
                  <a href="./pages/faq">FAQ</a>
                </li>
                <li className="menu-item menu-item-has-children has-sub">
                  <a href="#">
                    RTI<span className="indicator"></span>
                  </a>
                  <ul className="sub-menu" aria-hidden="true">
                    <li className="menu-item">
                      <a href="./pages/rti-documents">RTI Documents</a>
                    </li>
                  </ul>
                </li>
               
                <li className="menu-item menu-item-has-children has-sub btn btn-blue pull-right">
                  <a href="#">
                    Login<span className="indicator"></span>
                  </a>
                  <ul className="sub-menu login-btn" aria-hidden="true">
                    <li className="menu-item">
                      <a href="#" id="citizen-login">
                        Citizen
                      </a>
                    </li>
                    <li className="menu-item">
                      <a href="/employee-login" tabIndex={-1}>
                        Official
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Main menu end */}

        <div id="overflowMenu">
          <div className="ofMenu">
            <ul></ul>
          </div>
          <a href="#" title="Close" className="closeMenu">
            <span className="icon-close" aria-hidden="true"></span> Close
          </a>
        </div>
      </div>
    );
  }
}