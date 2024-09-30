import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button } from "react-bootstrap";
import PageHeading from "./../../../../../components/PageHeading";
import { showAlert } from "./../../../../../utils/Alerts";
import { CommonFunctions } from "./../../../../../utils/CommonFunctions";
import StepProgress from "../../../../../components/StepProgress";

const PreviewApp = ({ onBack, onNext, queryString = null }) => {

  const handleSubmit = async () => {
   
  };

  return (
    <div className="content-wrapper d-flex flex-column" style={{ minHeight: "100vh", padding: "20px" }}>
      <Container fluid className="d-flex flex-column flex-grow-1">
        <PageHeading headingText="New Trade Registration"/>
        <div className="container-div">
          {/* <StepProgress activeStep={activeStep} /> */}
        </div>
        <div style={{ margin: "0 5px", backgroundColor: "white", padding: "20px", marginBottom: "40px", borderRadius: "10px", flexGrow: 1 }}>
          <SiteRegistrationDetails fetchTrdData={fetchTrdData} />
        </div>
        <div
          className="mt-auto"
          style={{
            backgroundColor: "white",
            padding: "20px",
            marginLeft: "-25px",
            marginRight: "-25px",
            marginBottom: "-20px",
          }}
        >
          <Row className="justify-content-end">
            <Col xs="auto" style={{ paddingRight: "1rem" }}>
              <Button
                variant="light"
                style={{
                  marginRight: "15px",
                  borderColor: "#49627E",
                  width: "115px",
                }}
                onClick={onBack}
              >
                Cancel
              </Button>
              <Button
                style={{
                  backgroundColor: "#49627E",
                  borderColor: "#49627E",
                  width: "115px",
                }}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default PreviewApp;