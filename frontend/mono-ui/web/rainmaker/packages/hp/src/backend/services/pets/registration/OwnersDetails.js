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
import ToolTip from "../../../Layouts/ToolTip";
const OwnersDetails = ({ setFormData, formData, errors }) => {
  const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({ [name]: value });
	};

  
  return (
    <Card>
      <CardHeader>
        <Col md={12}>
          <CardTitle>Owner Details</CardTitle>
        </Col>
      </CardHeader>
      <CardBody>
        <Row className="mb-4">
          <Col md={3}>
            <div className="form-group petOwnerName required">
              <Form.Group controlId="petOwnerName">
                <Form.Label className="control-label">
                  Pet Owner Name
                </Form.Label>
                <Form.Control
                  name="petOwnerName"
                  type="text"
                  placeholder="Pet Owner Name"
                  value={formData.petOwnerName}
                  onChange={handleInputChange}
                  isInvalid={!!errors.petOwnerName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.petOwnerName}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
          </Col>

          <Col md={3}>
            <div className="form-group petOwnerFatherName required">
              <Form.Group controlId="petOwnerFatherName">
                <Form.Label className="control-label">
                  Pet Owner Father’s Name
                </Form.Label>
                <Form.Control
                  type="text"
                  name="petOwnerFatherName"
                  placeholder="Pet Owner Father's Name"
                  value={formData.petOwnerFatherName}
                  onChange={handleInputChange}
                  isInvalid={!!errors.petOwnerFatherName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.petOwnerFatherName}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
          </Col>

          <Col md={2}>
            <div className="form-group petOwnerGender required">
              <Form.Group controlId="petOwnerGender">
                <Form.Label className="control-label">Gender </Form.Label>
                <Form.Select
                  name="petOwnerGender"
                  value={formData.petOwnerGender}
                  className="form-control"
                  onChange={handleInputChange}
                  isInvalid={!!errors.petOwnerGender}
                >
                  <option>--Please Select--</option>

                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.petOwnerGender}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
          </Col>

          <Col md={2}>
            <div className="form-group petOwnerMobileNumber required">
              <Form.Group controlId="petOwnerMobileNumber">
                <Form.Label className="control-label">
                  Mobile Number
                </Form.Label>
                <Form.Control
                  type="text"
                  name="petOwnerMobileNumber"
                  placeholder="Mobile Number"
                  value={formData.petOwnerMobileNumber}
                  onChange={handleInputChange}
                  isInvalid={!!errors.petOwnerMobileNumber}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.petOwnerMobileNumber}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
          </Col>
          <Col md={2}>
            <div className="form-group petOwnerEmailAddress required">
              <Form.Group controlId="petOwnerEmailAddress">
                <Form.Label className="control-label"> Email </Form.Label>
                <Form.Control
                  type="text"
                  name="petOwnerEmailAddress"
                  placeholder="Email Address"
                  value={formData.petOwnerEmailAddress}
                  onChange={handleInputChange}
                  isInvalid={!!errors.petOwnerEmailAddress}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.petOwnerEmailAddresss}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};
export default OwnersDetails;
