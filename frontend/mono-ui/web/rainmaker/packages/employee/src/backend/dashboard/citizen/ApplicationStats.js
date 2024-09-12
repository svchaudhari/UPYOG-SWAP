import React, { useContext, useEffect, useState } from "react";
import { CommonFunctions } from "../../../utils/CommonFunctions";
import { Col, Container, Row } from "react-bootstrap";
import ApplicationList from "./ApplicationList";

const ApplicationStats = () => {
  const { getCitizenAppStats } = CommonFunctions();
  const [draftApps, setDraftApps] = useState(0);
  const [pendingForPay, setPendingForPay] = useState(0);
  const [appliedApps, setAppliedApps] = useState(0);
  const [revertedApps, setRevertedApps] = useState(0);
  const [approvedApps, setApprovedApps] = useState(0);
  const [rejectedApps, setRejectedApps] = useState(0);
  const [applicationLists, setApplicationLists] = useState([]);

  useEffect(() => {
    (async () => {
      const citizenDash = await getCitizenAppStats();
      if (citizenDash && citizenDash.Count > 0) {
        setDraftApps(citizenDash.applicationInitiated);
        setPendingForPay(citizenDash.applicationPendingForPayment);
        setAppliedApps(citizenDash.applicationApplied);
        setApprovedApps(citizenDash.applicationApproved);
        setRejectedApps(citizenDash.applicationRejected);
        setApplicationLists(citizenDash.Licenses);
      }
    })();
  }, []);
   const getStatuswiseApplications = async (status) => {
    const citizenDash = await getCitizenAppStats(`?accountId=${JSON.parse(localStorage.getItem("userInfo")).uuid}&status=${status}`);
    if (citizenDash && citizenDash.Licenses) {
      setApplicationLists(citizenDash.Licenses);
    }
  };
  return (
    <>
      <Container fluid>
        <Row>
          <Col lg={2} sm={6}>
            <div className="small-box bg-lightblue">
              <div className="inner">
                <h3>{draftApps}</h3>
                <p>Initiated</p>
              </div>
              <div className="icon">
                <i className="fas fa-pen" />
              </div>
              <a
                href="#"
                className="small-box-footer"
                onClick={() => getStatuswiseApplications("INITIATED")}
              >
                More info <i className="fas fa-arrow-circle-right" />
              </a>
            </div>
          </Col>

          <Col lg={2} sm={6}>
            <div className="small-box bg-info">
              <div className="inner">
                <h3>{pendingForPay}</h3>
                <p>Payments Due</p>
              </div>
              <div className="icon">
                <i className="fas fa-rupee-sign" />
              </div>
              <a
                href="#"
                className="small-box-footer"
                onClick={() => getStatuswiseApplications("PENDINGFORPAYMENT")}
              >
                More info <i className="fas fa-arrow-circle-right" />
              </a>
            </div>
          </Col>
          <Col lg={2} sm={6}>
            <div className="small-box bg-maroon disabled color-palette">
              <div className="inner">
                <h3>{appliedApps}</h3>
                <p>Submitted</p>
              </div>
              <div className="icon">
                <i className="fas fa-tasks" />
              </div>
              <a
                href="#"
                className="small-box-footer"
                onClick={() =>
                  getStatuswiseApplications(
                    "PENDINGFORVERIFICATION, PENDINGFORAPPROVAL"
                  )
                }
              >
                More info <i className="fas fa-arrow-circle-right" />
              </a>
            </div>
          </Col>

          <Col lg={2} sm={6}>
            <div className="small-box bg-warning">
              <div className="inner">
                <h3>{revertedApps}</h3>
                <p>Reverted Back </p>
              </div>
              <div className="icon">
                <i className="fas fa-undo" />
              </div>
              <a
                href="#"
                className="small-box-footer"
                onClick={() =>
                  getStatuswiseApplications("PENDINGFORMODIFICATION")
                }
              >
                More info <i className="fas fa-arrow-circle-right" />
              </a>
            </div>
          </Col>
          <Col lg={2} sm={6}>
            <div className="small-box bg-success">
              <div className="inner">
                <h3>{approvedApps}</h3>
                <p>Approved</p>
              </div>
              <div className="icon">
                <i className="fas fa-check-square" />
              </div>
              <a
                href="#"
                className="small-box-footer"
                onClick={() => getStatuswiseApplications("APPROVED")}
              >
                More info <i className="fas fa-arrow-circle-right" />
              </a>
            </div>
          </Col>
          <Col lg={2} sm={6}>
            <div className="small-box bg-danger">
              <div className="inner">
                <h3>{rejectedApps}</h3>
                <p>Rejected</p>
              </div>
              <div className="icon">
                <i className="fa fa-ban" />
              </div>
              <a
                href="#"
                className="small-box-footer"
                onClick={() => getStatuswiseApplications("REJECTED")}
              >
                More info <i className="fas fa-arrow-circle-right" />
              </a>
            </div>
          </Col>
        </Row>
      </Container>

      <ApplicationList applicationLists={applicationLists} />
    </>
  );
};
export default ApplicationStats;
