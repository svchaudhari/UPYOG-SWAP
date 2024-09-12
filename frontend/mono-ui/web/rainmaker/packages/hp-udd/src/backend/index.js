import React, { useContext } from "react";
import { AuthContext } from "../utils/AuthContext";
import Layout from "./Layouts";
import Footer from './Layouts/Footer';
import CitizeDashboard from './dashboard/citizen'
import EmployeeDashboard from "./dashboard/employee";
const Backend = () => {
	const { user, userType } = useContext(AuthContext);

  return (
    <>
    <Layout />
    {user && userType === "EMPLOYEE" ? (
      <>
         <EmployeeDashboard />
        
      </>
    ) : (
      <>
         <CitizeDashboard />
      </>
    )}
    <Footer />
  </>
  );  
};
export default Backend;
