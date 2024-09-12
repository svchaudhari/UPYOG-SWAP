import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Table, Alert } from "react-bootstrap";
import { APICall } from "../../utils/api/index";

const PreviewApp = ({ onBack, onNext, onView }) => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusMsg, setStatusMsg] = useState("");

  const fData = {
    RequestInfo: {
      apiId: "Rainmaker",
      authToken: "e4b04d61-5eb3-4a99-9a35-2c8129213649",
      userInfo: {
        id: 1739,
        type: "CITIZEN",
      },
    },
  };

  useEffect(() => {
    const applicationNumber = localStorage.getItem("new-tlapp-no");
    if (applicationNumber) {
      setStatusMsg(``);
    }

    const fetchData = async () => {
      try {
        const response = await APICall(
          "http://192.168.29.225:8079/tl-services/v1/NewTL/_search?tenantId=hp.shimla",
          "POST",
          JSON.stringify(fData),
          {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          }
        );
        const mappedRows = response.Licenses.map((license) => ({
          applicationNumber: license.applicationNumber,
          applicantName: license.businessService,
          ulbName: license.ulb,
          status: license.status,
          submittedOn: new Date(license.applicationDate).toLocaleDateString(
            "en-US",
            {
              year: "numeric",
              month: "long",
              day: "numeric",
            }
          ),
          nopendingdays: license.passedDays,
        }));
        setRows(mappedRows);
      } catch (error) {
        console.error("Fetch error: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fData]);

  const handleNextClick = () => {
    onNext();
  };

  const handleView = (applicationNumber) => {
    // const url = `/tda-details?n=${encodeURIComponent(applicationNumber)}`;
    // window.open(url, "_blank");
    localStorage.setItem("new-tlapp-no", applicationNumber);
    onView();
  };

  return (
    <div
      className="content-wrapper d-flex flex-column"
      style={{ minHeight: "100vh", padding: "20px" }}
    >
      <Container fluid className="d-flex flex-column flex-grow-1">
        <Row className="align-items-center my-4">
          <Col xs="auto">
            <Button variant="link" onClick={onBack}>
              <img src="" alt="Back Button" />
            </Button>
          </Col>
          <Col>
            <h1>List of All Applications</h1>
          </Col>
        </Row>
        <div
          style={{
            margin: "0 5px",
            backgroundColor: "white",
            padding: "20px",
            marginBottom: "40px",
            borderRadius: "10px",
            border: "1px solid #dee2e6",
          }}
        >
          {statusMsg && (
            <Alert variant="success">
              Status: <strong>{statusMsg}</strong>
            </Alert>
          )}
          <Table
            striped
            bordered
            hover
            responsive
            style={{
              borderRadius: "10px",
              overflow: "hidden",
              borderCollapse: "separate",
            }}
          >
            <thead style={{ backgroundColor: "#49627E", color: "white" }}>
              <tr>
                <th style={{ borderTopLeftRadius: "10px" }}>
                  Application Number
                </th>
                <th>Applicant Name</th>
                <th>ULB Name</th>
                <th>Status</th>
                <th>Submitted On</th>
                <th>No Pending Days</th>
                <th style={{ borderTopRightRadius: "10px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index}>
                  <td>{row.applicationNumber}</td>
                  <td>{row.applicantName}</td>
                  <td>{row.ulbName}</td>
                  <td>{row.status}</td>
                  <td>{row.submittedOn}</td>
                  <td>{row.nopendingdays}</td>
                  <td>
                    <Button
                      variant="primary"
                      onClick={() => handleView(row.applicationNumber)}
                    >
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
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
                onClick={handleNextClick}
              >
                Next
              </Button>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default PreviewApp;
