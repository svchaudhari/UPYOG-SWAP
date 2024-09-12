import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
} from "react-bootstrap";
const TradeOwnerDetails = ({ setFormData, formData, errors }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ [name]: value });
  };
  return (
    <Card>
      <CardHeader>
        <Col md={12}>
          <CardTitle>Trade Owner Details</CardTitle>
        </Col>
      </CardHeader>
      <CardBody>
        <Row className="mb-4">
          <Col md={3}>
            <div className="form-group tradeOwnerName required">
              <Form.Group controlId="tradeOwnerName">
                <Form.Label className="control-label">
                  {" "}
                  Trade Owner Name{" "}
                </Form.Label>{" "}
                <Form.Control
                  name="tradeOwnerName"
                  type="text"
                  placeholder="Trade Owner Name"
                  value={formData.tradeOwnerName}
                  onChange={handleInputChange}
                  isInvalid={!!errors.tradeOwnerName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.tradeOwnerName}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
          </Col>

          <Col md={3}>
            <div className="form-group tradeOwnerFatherName required">
              <Form.Group controlId="tradeOwnerFatherName">
                <Form.Label className="control-label">
                  {" "}
                  Trade Owner Father’s Name{" "}
                </Form.Label>{" "}
                <Form.Control
                  type="text"
                  name="tradeOwnerFatherName"
                  placeholder="Trade Owner Father's Name"
                  value={formData.tradeOwnerFatherName}
                  onChange={handleInputChange}
                  isInvalid={!!errors.tradeOwnerFatherName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.tradeOwnerFatherName}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
          </Col>

          <Col md={2}>
            <div className="form-group tradeOwnerGender required">
              <Form.Group controlId="tradeOwnerGender">
                <Form.Label className="control-label">
                  {" "}
                  Gender{" "}
                </Form.Label>{" "}
                <Form.Select
                  name="tradeOwnerGender"
                  value={formData.tradeOwnerGender}
                  className="form-control"
                  onChange={handleInputChange}
                  isInvalid={!!errors.licenseSubCategory}
                >
                <option>--Please Select--</option>
                 
                 <option value="Male">Male</option>
                 <option value="Female">Female</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.tradeOwnerGender}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
          </Col>

          <Col md={2}>
            <div className="form-group tradeOwnerMobileNumber required">
              <Form.Group controlId="tradeOwnerMobileNumber">
                <Form.Label className="control-label">
                  {" "}
                  Mobile Number{" "}
                </Form.Label>{" "}
                <Form.Control
                  type="text"
                  name="tradeOwnerMobileNumber"
                  placeholder="Mobile Number"
                  value={formData.tradeOwnerMobileNumber}
                  onChange={handleInputChange}
                  isInvalid={!!errors.tradeOwnerMobileNumber}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.tradeOwnerMobileNumber}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
          </Col>
          <Col md={2}>
            <div className="form-group tradeOwnerEmailAddress required">
              <Form.Group controlId="tradeOwnerEmailAddress">
                <Form.Label className="control-label">
                  {" "}
                 Email{" "}
                </Form.Label>{" "}
                <Form.Control
                  type="text"
                  name="tradeOwnerEmailAddress"
                  placeholder="Email Address"
                  value={formData.tradeOwnerEmailAddress}
                  onChange={handleInputChange}
                  isInvalid={!!errors.tradeOwnerEmailAddress}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.tradeOwnerEmailAddresss}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};
export default TradeOwnerDetails;
