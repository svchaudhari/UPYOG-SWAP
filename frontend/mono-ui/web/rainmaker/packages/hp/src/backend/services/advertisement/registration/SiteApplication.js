import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { APICall } from "../../../../utils/api/index";
import { CommonFunctions } from "../../../../utils/CommonFunctions";
// import BackButton from "../../../assets/images/BackButton.png";
import PageHeading from "../../../../components/PageHeading";
import { showAlert } from "./../../../../utils/Alerts";
import "./../../../assets/plugins/select2/css/select2.min.css";
import "./../../../assets/plugins/select2-bootstrap4-theme/select2-bootstrap4.min.css";
import "./../../../assets/plugins/select2/js/select2.full.min.js";
import ToolTip from "../../../Layouts/ToolTip.js";
import StepProgress from "../../../../components/StepProgress.js";
// import DocumentUpload from '../../../../components/DocumentUpload.js';
const SiteApplication = ({ onBack, onNext }) => {
  const { getAllDistricts, getAllULBsFromDistrict, getAllWardsFromULBS } =
    CommonFunctions();
  const [districts, setDistricts] = useState([]);
  const [ulbs, setUlbs] = useState([]);
  const [wards, setWards] = useState([]);
  const [activeStep, setActiveStep] = useState(1);
  const [formData, setFormData] = useState({
    siteType: "",
    siteName: "",
    siteDescription: "",
    gpsLocation: "",
    siteCost: "",
    structureType: "",
    sizeLength: "",
    powerSelection: "",
    ledSelection: "",
    securityAmount: "",
    otherDetails: "",
    districtName: "",
    ulbName: "",
    ulbType: "",
    wardNumber: "",
    siteAddress: "",
    pinCode: "",
  });

  const [errors, setErrors] = useState({});
  const [geoError, setGeoError] = useState("");
  // useEffect(() => {
  //   const getCurrentLocation = () => {
  //     if (navigator.geolocation) {
  //       navigator.geolocation.getCurrentPosition(
  //         (position) => {
  //           const { latitude, longitude } = position.coords;
  //           setFormData({ ["gpsLocation"]: `${latitude},${longitude}` });
  //           setGeoError("");
  //         },
  //         async (error) => {
  //           console.error("Error getting location: ", error);
  //           try {
  //             const response = await axios.get("https://ipapi.co/json/");
  //             const { latitude, longitude } = response.data;
  //             setFormData((prevData) => ({
  //               ...prevData,
  //               gpsLocation: `${latitude},${longitude}`,
  //             }));
  //             setGeoError("");
  //           } catch (ipError) {
  //             console.error("Error getting IP-based location: ", ipError);
  //             setGeoError(
  //               "Unable to retrieve GPS or IP-based location. Please enter it manually."
  //             );
  //           }
  //         }
  //       );
  //     } else {
  //       console.error("Geolocation is not supported by this browser.");
  //       setGeoError("Geolocation is not supported by your browser.");
  //     }
  //   };

  //   getCurrentLocation();
  // }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const requiredFields = [
    "siteType",
    "siteName",
    "siteDescription",
    "gpsLocation",
    "siteCost",
    "structureType",
    "sizeLength",
    "powerSelection",
    "ledSelection",
    "securityAmount",
    "siteAddress",
    "pinCode",
  ];

  const validateForm = () => {
    let formErrors = {};
    requiredFields.forEach((fieldName) => {
      if (!formData[fieldName]) {
        formErrors[fieldName] = `The field is required.`;
      }
    });
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleNextClick = async (e) => {
    if (!validateForm()) {
      showAlert("Error", "Please resolve highlighted errors", "error");
      return;
    }
    //const { submitPetApplication } = PetLicenseSubmission();
    console.log("formDataSubmit:", formData);
    //const response = await submitPetApplication(formData);

    onNext();
  };

  const documentConfig = [
    { key: 'idProof', label: 'ID Proof of Trade Owner', required: false },
    { key: 'ownership', label: 'Premises Ownership Document', required: false },
    { key: 'anyOther', label: 'Site Photographs at least one', required: true },
  ];

  return (
    <div
      className="content-wrapper"
      style={{ minHeight: "100vh", padding: "20px" }}
    >
      <Container fluid>
        <Row className="align-items-center my-4">
          <Col>
            <PageHeading headingText="New Site Registration"></PageHeading>
          </Col>
        </Row>
        <div
          style={{
            margin: "0 5px",
            marginBottom: "40px",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <StepProgress activeStep={activeStep} stepName="New Site Registration" />
        </div>
        <div
          style={{
            margin: "0 5px",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          {geoError && <Alert variant="warning">{geoError}</Alert>}
          <Form>
            <Row className="mb-3">
              <Col>
                <h4 style={{ color: "#49627E" }}>Site Descriptions</h4>
              </Col>
            </Row>
            <Row className="mb-4">
              <Col md={4}>
                <div className="form-group siteType required">
                  <Form.Group controlId="siteType">
                    <Form.Label className="control-label">Site Type</Form.Label>
                    <ToolTip
                      toolTipText={
                        "This name will be reflected on your final certificate"
                      }
                    />
                    <Form.Control
                      as="select"
                      value={formData.siteType}
                      name="siteType"
                      onChange={handleInputChange}
                      isInvalid={!!errors.siteType}
                    >
                      <option value="">--Select--</option>
                      <option value="Advertising Hoarding Site">Advertising Hoarding Site</option>
                      <option value="Canopy Site">Canopy Site</option>
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      {errors.siteType}
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>
              </Col>
              <Col md={4}>
                <div className="form-group siteName required">
                  <Form.Group controlId="siteName">
                    <Form.Label className="control-label">Site Name</Form.Label>
                    <Form.Control
                      name="siteName"
                      type="text"
                      placeholder="Enter Site Name"
                      value={formData.siteName}
                      onChange={handleInputChange}
                      isInvalid={!!errors.siteName}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.siteName}
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>
              </Col>
              <Col md={4}>
                <div className="form-group siteDescription required">
                  <Form.Group controlId="siteDescription">
                    <Form.Label className="control-label">
                      Site Description
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      name="siteDescription"
                      placeholder="Enter Site Description"
                      value={formData.siteDescription}
                      onChange={handleInputChange}
                      isInvalid={!!errors.siteDescription}
                      className="fixed-height-textarea"
                      style={{height:"38px;"}}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.siteDescription}
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>
              </Col>
            </Row>
            <Row className="mb-4">
              <Col md={4}>
                <div className="form-group gpsLocation required">
                  <Form.Group controlId="gpsLocation">
                    <Form.Label className="control-label">
                      GPS Location
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="gpsLocation"
                      placeholder="Enter GPS Location"
                      value={formData.gpsLocation}
                      onChange={handleInputChange}
                      isInvalid={!!errors.gpsLocation}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.gpsLocation}
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>
              </Col>

              <Col md={4}>
                <div className="form-group siteCost required">
                  <Form.Group controlId="siteCost">
                    <Form.Label className="control-label">
                      Site Cost (INR)
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Per Day Cost in INR (excl. GST)"
                      name="siteCost"
                      value={formData.siteCost}
                      onChange={handleInputChange}
                      isInvalid={!!errors.siteCost}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.siteCost}
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>
              </Col>
              <Col md={4}>
                <div className="form-group structureType required">
                  <Form.Group controlId="structureType">
                    <Form.Label className="control-label">
                      Structure Type
                    </Form.Label>
                    <Form.Control
                      as="select"
                      value={formData.structureType}
                      name="structureType"
                      onChange={handleInputChange}
                      isInvalid={!!errors.structureType}
                    >
                      <option value={""}>--Select--</option>
                      <option value="Permanent">Permanent</option>
                      <option value="Temporary">Temporary</option>
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      {errors.structureType}
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>
              </Col>
            </Row>
            <Row className="mb-4">
              <Col md={4}>
                <div className="form-group sizeLength required">
                  <Form.Label className="control-label">
                    Size (Length X Width) in Meters
                  </Form.Label>
                  <Form.Group controlId="size">
                    <Row className="">
                      <Col xs="auto">
                        <Form.Control
                          type="text"
                          name="sizeLength"
                          placeholder="Length"
                          value={formData.sizeLength}
                          onChange={handleInputChange}
                          style={{ width: "137px" }}
                          isInvalid={!!errors.sizeLength}
                        />
                      </Col>
                      <Col xs="auto">
                        <Form.Control
                          type="text"
                          placeholder="Width"
                          value={formData.sizeWidth}
                          onChange={handleInputChange}
                          style={{ width: "138px" }}
                          isInvalid={!!errors.sizeWidth}
                        />
                      </Col>
                    </Row>
                    <Form.Control.Feedback type="invalid">
                      {errors.sizeLength}
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>
              </Col>
              <Col md={4}>
                <div className="form-group powerSelection required">
                  <Form.Group controlId="powerSelection">
                    <Form.Label className="control-label">
                      Powered / Non-Powered
                    </Form.Label>
                    <Form.Control
                      as="select"
                      value={formData.powerSelection}
                      name="powerSelection"
                      onChange={handleInputChange}
                      isInvalid={!!errors.powerSelection}
                    >
                      <option value="">--Select--</option>
                      <option value="Powered">Powered</option>
                      <option value="Non-Powered">Non-Powered</option>
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      {errors.powerSelection}
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>
              </Col>
              <Col md={4}>
                <div className="form-group ledSelection required">
                  <Form.Group controlId="ledSelection">
                    <Form.Label className="control-label">
                      LED / Non-LED
                    </Form.Label>
                    <Form.Control
                      as="select"
                      value={formData.ledSelection}
                      name="ledSelection"
                      onChange={handleInputChange}
                      isInvalid={!!errors.ledSelection}
                    >
                      <option value="">--Select--</option>
                      <option value="LED">LED</option>
                      <option value="Non-LED">Non-LED</option>
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      {errors.ledSelection}
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={4}>
                <div className="form-group securityAmount required">
                  <Form.Group controlId="securityAmount">
                    <Form.Label className="control-label">
                      Security Amount (INR)
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="securityAmount"
                      placeholder="Security Amount (INR)"
                      value={formData.securityAmount}
                      onChange={handleInputChange}
                      isInvalid={!!errors.securityAmount}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.securityAmount}
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>
              </Col>
              <Col md={4}>
                <div className="form-group otherDetails">
                  <Form.Group controlId="otherDetails">
                    <Form.Label className="control-label">
                      Other Details
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="otherDetails"
                      placeholder="Others"
                      value={formData.otherDetails}
                      onChange={handleInputChange}
                      isInvalid={!!errors.otherDetails}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.otherDetails}
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <h4 style={{ color: "#49627E" }}>Site Location Details</h4>
              </Col>
            </Row>
            <Row className="mb-4">
              <Col md={4}>
                <Form.Group controlId="districtName">
                  <Form.Label className="control-label">District</Form.Label>
                  <Form.Control
                    type="text"
                    name="districtName"
                    id="districtName"
                    value="Shimla"
                    onChange={handleInputChange}
                    readOnly="readonly"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.districtName}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={4}>
                <div className="form-group ulbName required">
                  <Form.Group controlId="ulbName">
                    <Form.Label className="control-label">ULB Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="ulbName"
                      id="ulbName"
                      value="Shimla (Muncipal Corporation)"
                      onChange={handleInputChange}
                      readOnly="readonly"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.ulbName}
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>
              </Col>
              <Col md={4}>
                <div className="form-group ulbType">
                  <Form.Group controlId="ulbType">
                    <Form.Label className="control-label">ULB Type</Form.Label>
                    <Form.Control
                      type="text"
                      name="ulbType"
                      id="ulbType"
                      placeholder=""
                      value="Municipal Corporation"
                      onChange={handleInputChange}
                      readOnly="readonly"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.ulbType}
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>
              </Col>
            </Row>
            <Row className="mb-4">
              <Col md={4}>
                <Form.Group controlId="wardNumber">
                  <Form.Label className="control-label">Ward No.</Form.Label>
                  <Form.Control
                    type="text"
                    name="wardNumber"
                    id="wardNumber"
                    placeholder=""
                    value="Khalini"
                    onChange={handleInputChange}
                    readOnly="readonly"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.wardNumber}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={4}>
                <div className="form-group siteAddress required">
                  <Form.Label className="control-label">
                    Site Address
                  </Form.Label>
                  <Form.Group controlId="siteAddress">
                    <Form.Control
                      type="text"
                      name="siteAddress"
                      placeholder="Enter Site Address"
                      value={formData.siteAddress}
                      onChange={handleInputChange}
                      isInvalid={!!errors.siteAddress}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.siteAddress}
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>
              </Col>
              <Col md={4}>
                <div className="form-group pinCode required">
                  <Form.Group controlId="pinCode">
                    <Form.Label className="control-label">Pin Code</Form.Label>
                    <Form.Control
                      type="text"
                      name="pinCode"
                      placeholder="Enter Pin Code"
                      value={formData.pinCode}
                      onChange={handleInputChange}
                      isInvalid={!!errors.pinCode}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.pinCode}
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>
              </Col>
            </Row>
            <Row>
              <div className="upload-box-container dashed">
              <Col style={{marginLeft: '-20px'}}>
              </Col>
              </div>
            </Row>
          </Form>
        </div>
        <div
          style={{
            backgroundColor: "white",
            padding: "20px",
            marginTop: "50px",
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

export default SiteApplication;
