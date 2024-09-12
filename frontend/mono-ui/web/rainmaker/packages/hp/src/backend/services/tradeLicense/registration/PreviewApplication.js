import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import StepProgress from "./../../../../components/StepProgress";
import PageHeading from "../../../../components/PageHeading";
import { showAlert } from "./../../../../utils/Alerts";
import RegistrationDetails from './appPreview/RegistrationDetails';
import TradeDetails from './appPreview/TradeDetails';
import LicenseSpecifications from './appPreview/LicenseSpecifications';
import TradeLocationDetails from './appPreview/TradeLocationDetails';
import TradeOwnerDetails from './appPreview/TradeOwnerDetails';
import ApplicantDetails from './appPreview/ApplicantDetails';
import { CommonFunctions } from "../../../../utils/CommonFunctions";
import { useNavigate } from 'react-router-dom';
import { TradeLicenseSubmission } from "./TradeLicenseSubmission";

const PreviewApp = ({ onBack, onNext, applicationNo=null, ulb=null, applicaitonType="NEW"}) => {
  const [activeStep, setActiveStep] = useState(3);
  const [fetchTrdData, setFetchTrdData] = useState([]);
  const [errorMessage, setErrMessage] = useState([]);
  const { getTLApplicationData }= CommonFunctions();
  const navigate = useNavigate();
  const [applicationID, setApplicationID] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      // console.log("calling api");
      try {
        let uri =`?tenantId=${process.env.REACT_APP_TENANTID}.${localStorage.getItem("ULB")}&applicationNumber=${localStorage.getItem("applicationNumber")}`;
        if(applicationNo && ulb )
          uri =`?tenantId=${process.env.REACT_APP_TENANTID}.${ulb}&applicationNumber=${applicationNo}`;
        const appData = await getTLApplicationData(uri);
        if(appData.ResponseInfo.status && appData.ResponseInfo.status==="successful"){
            setFetchTrdData(appData.Licenses[0]);
            setApplicationID(appData.Licenses[0].tradeLicenseDetail.id);
        }else{
          showAlert(
            "Error",
            "Something went wrong. Could not connect with server",
            "error"
          );
        }
      } catch (error) {
        console.error("Error fetching trade license data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async () => {
    const { submitTradeApplication } = TradeLicenseSubmission();
    
    const response = await submitTradeApplication(localStorage.getItem("ID"),"NEW","NewTL","FORWARD_TO_VERIFIER",localStorage.getItem("applicationNumber"));
    
    if(response && response.ResponseInfo && response.ResponseInfo.status==="successful"){
      showAlert(
        "Success",
        "Application has been submitted successfully with application number " + appNo,
        "success"
      );
      localStorage.removeItem("ID");
      localStorage.removeItem("applicationNumber");
      localStorage.removeItem("businessService");
      localStorage.removeItem("module");
      localStorage.removeItem("ULB");

      navigate('/backend');
      // redirect to home page
      

    }else{
      showAlert(
        "Error",
        "Something went wrong. Please try again.",
        "error"
      );
    }
  };
  
  return (
    <div className="content-wrapper d-flex flex-column" style={{ minHeight: "100vh", padding: "20px" }}>
      <Container fluid className="d-flex flex-column flex-grow-1">
      <PageHeading headingText=  {applicaitonType==="NEW" ? ' New Trade Registration' : ( applicaitonType === "RENEWAL" ? " Trade License Renewal" : ( applicaitonType === "CLOSURE" ? " Trade License Closure" : " Trade License Modification" ))   }></PageHeading>
        <div className="container-div">
          <StepProgress activeStep={activeStep} stepName={applicaitonType==="NEW" ? ' New Trade Registration' : ( applicaitonType === "RENEWAL" ? " Trade License Renewal" : ( applicaitonType === "CLOSURE" ? " Trade License Closure" : " Trade License Modification" ))   }/>
        </div>
        <div style={{ margin: "0 5px", backgroundColor: "white", padding: "20px", marginBottom: "40px", borderRadius: "10px", flexGrow: 1 }}>
          <RegistrationDetails fetchTrdData={fetchTrdData} />
          <TradeDetails fetchTrdData={fetchTrdData} />
          <LicenseSpecifications fetchTrdData={fetchTrdData} />
          <TradeLocationDetails fetchTrdData={fetchTrdData} />
          <TradeOwnerDetails fetchTrdData={fetchTrdData} />
          <ApplicantDetails fetchTrdData={fetchTrdData} />
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