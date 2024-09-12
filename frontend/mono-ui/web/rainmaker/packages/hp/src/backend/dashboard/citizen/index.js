import React, { useContext,useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import PageHeading from "../../../components/PageHeading";
import ApplicationStats from './ApplicationStats'

const CitizeDashboard = () => {
  
  return (
    <div>
      <div className="content-wrapper">
        <Container fluid>
          <PageHeading headingText=" Dashboard "></PageHeading>

          <div className="container-div">
            <div className="content">
              <ApplicationStats />
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};
export default CitizeDashboard;
  