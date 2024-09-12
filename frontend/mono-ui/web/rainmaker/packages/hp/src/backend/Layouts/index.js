import React, { useContext } from "react";
import {AuthContext } from './../../utils/AuthContext';
// import common css
import "./../assets/plugins/fontawesome-free/css/all.min.css";
import "./../assets/dist/css/adminlte.min.css?v=3.2.0";
import "./../assets/plugins/overlayScrollbars/css/OverlayScrollbars.min.css";
import "./../assets/dist/css/custom.css";

import "./../assets/plugins/jquery-ui/jquery-ui.min.js";
import "popper.js/dist/umd/popper.min.js";
import "moment/min/moment.min.js";
import "./../assets/plugins/sparklines/sparkline.js";
import "./../assets/plugins/jquery-knob/jquery.knob.min.js";
import './../assets/plugins/moment/moment.min.js';
import "./../assets/plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js";
import "./../assets/dist/js/app.js";
import "./../assets/dist/js/adminlte.js";

import Header from "./Header";
import CitizenMenu from "./CitizenMenu";
import EmployeeMenu from "./EmployeeMenu";

const Layout = () => {
  const { user, userType } = useContext(AuthContext);
  return (
    <div class="wrapper">
      {user && userType === "EMPLOYEE" ? (
        <>
            <Header />
            <EmployeeMenu />
        </>
      ) : (
        <>
           <Header />
           <CitizenMenu /> 
        </>
      )}
    </div>
  );
};
export default Layout;
