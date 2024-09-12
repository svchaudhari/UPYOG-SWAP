import React, { useContext,useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import PageHeading from "../../../components/PageHeading";
import ApplicationStats from './ApplicationStats'

const EmployeeDashboard = () => {
  
  return (
    <>
      <div className="content-wrapper">
          <PageHeading headingText=" Dashboard "></PageHeading>
          <div className="container-div">
            <div className="content">
              <ApplicationStats />
            </div>
          </div>
      </div>
    </>
  );
};
export default EmployeeDashboard;
