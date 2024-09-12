import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
} from "react-bootstrap";
import ToolTip from "../../../Layouts/ToolTip";

const RegistrationDetails = ({ setFormData, formData, errors }) => {

  const handleInputChange = (e) => {
    const { name, value} = e.target;
    setFormData({ [name]: value });
  };

  // console.log(formData.registrationLicenseNumber);
  return (
    <Card>
      <CardHeader>
        <Col md={12}>
          <CardTitle>Labour Registration Details</CardTitle>
        </Col>
        <ToolTip toolTipText="Please fill registration details with Department of Labour & Employment under Shop & Commercial Establishment Act, 1969 " />
      </CardHeader>
      <CardBody>
        <Row className="mb-4">
          <Col md={4}>
            <div className="form-group registrationLicenseNumber required">
              <Form.Group controlId="registrationLicenseNumber">
                <Form.Label className="control-label">
                  {" "}
                  Registration/License Number{" "}
                </Form.Label>{" "}
                <ToolTip toolTipText="Enter Registration Number for Certificate of Shop & Establishments of Labor Department" />
                <Form.Control
                  type="text"
                  name="registrationLicenseNumber"
                  className="form-control required-field registration-number address_field_with_space"
                  placeholder="Registration/License Number"
                  value={formData.registrationLicenseNumber || ''}
                  onChange={handleInputChange}
                  isInvalid={!!errors.registrationLicenseNumber}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.registrationLicenseNumber}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
          </Col>
          <Col md={4}>
            <div className="form-group registrationCommencementDate required">
              <Form.Group controlId="registrationCommencementDate">
                <Form.Label className="control-label">
                  {" "}
                  Registration Commencement Date{" "}
                </Form.Label>{" "}
                <ToolTip toolTipText={"Certificate issued date (printed on certificate)"} />
                <Form.Control
                  type="date"
                  name="registrationCommencementDate"
                  className="form-control required-field"
                  placeholder="Registration Commencement Date"
                  value={formData.registrationCommencementDate}
                  onChange={handleInputChange}
                  isInvalid={!!errors.registrationCommencementDate}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.registrationCommencementDate}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
          </Col>

          <Col md={4}>
            <div className="form-group registrationValidityDate required">
              <Form.Group controlId="registrationValidityDate">
                <Form.Label className="control-label">
                  {" "}
                  Registration Validity date{" "}
                </Form.Label>{" "}
                <Form.Control
                  type="date"
                  name="registrationValidityDate"
                  className="form-control required-field"
                  placeholder="Registration Validity date"
                  value={formData.registrationValidityDate}
                  onChange={handleInputChange}
                  isInvalid={!!errors.registrationValidityDate}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.registrationValidityDate}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};
export default RegistrationDetails;
