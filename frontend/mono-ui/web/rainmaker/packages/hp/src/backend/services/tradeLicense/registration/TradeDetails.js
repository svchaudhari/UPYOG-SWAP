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
const TradeDetails = ({ setFormData, formData, errors }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ [name]: value });
  };

  return (
    <Card>
      <CardHeader>
        <Col md={12}>
          <CardTitle>Trade Details</CardTitle>
        </Col>
      </CardHeader>
      <CardBody>
        <Row className="mb-4">
          <Col md={3}>
            <div className="form-group businessName required">
              <Form.Group controlId="businessName">
                <Form.Label className="control-label">Business Name</Form.Label>
                <ToolTip
                  toolTipText={
                    "This name will be reflected on your final certificate"
                  }
                />
                <Form.Control
                  type="text"
                  name="businessName"
                  placeholder="Business Name"
                  value={formData.businessName}
                  onChange={handleInputChange}
                  isInvalid={!!errors.businessName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.businessName}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
          </Col>
          <Col md={2}>
            <div className="form-group scaleOfBusiness required">
              <Form.Group controlId="scaleOfBusiness">
                <Form.Label className="control-label">
                  Scale of Business
                </Form.Label>
                <ToolTip
                  toolTipText={
                    "Small Scale: Premises covering maximum area of 100 sq. ft.\n" +
                    "Medium Scale: Premises covering area of 100 sq. ft to 500 sq. ft.\n" +
                    "Large Scale: Premises covering area of more than 500 sq. ft."
                  }
                />

                <Form.Select
                  value={formData.scaleOfBusiness}
                  className="form-control"
                  name="scaleOfBusiness"
                  onChange={handleInputChange}
                  isInvalid={!!errors.scaleOfBusiness}
                >
                  <option value="">--Please Select--</option>
                  <option value="Small">Small</option>
                  <option value="Medium">Medium</option>
                  <option value="Large">Large</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.scaleOfBusiness}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
          </Col>
          <Col md={2}>
            <div className="form-group gstNumber">
              <Form.Group controlId="gstNumber">
                <Form.Label className="control-label">GST Number</Form.Label>
                <Form.Control
                  type="text"
                  name="gstNumber"
                  placeholder="GST Number"
                  value={formData.gstNumber}
                  onChange={handleInputChange}
                  isInvalid={!!errors.gstNumber}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.propertyType}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
          </Col>
          <Col md={5}>
            <div className="form-group businessDetails required">
              <Form.Group controlId="businessDetails">
                <Form.Label className="control-label">
                  Business Details
                </Form.Label>
                <ToolTip
                  toolTipText={
                    "Write brief details of business in 500 characters"
                  }
                />
                <Form.Control
                  as="textarea"
                  placeholder="Business Details"
                  name="businessDetails"
                  value={formData.businessDetails}
                  onChange={handleInputChange}
                  isInvalid={!!errors.businessDetails}
                  maxLength={500}
                  rows={2}
                  className="fixed-height-textarea"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.businessDetails}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
          </Col>
        </Row>
        <Row className="mb-4">
        <Col md={3}>
            <div className="form-group tradeIndustryType">
              <Form.Group controlId="tradeIndustryType">
                <Form.Label className="control-label">Industry Type</Form.Label>
                <Form.Select
                  name="tradeIndustryType"
                  value={formData.tradeIndustryType}
                  className="form-control"
                  onChange={handleInputChange}
                  isInvalid={!!errors.tradeIndustryType}
                >
                  <option value="">--Please Select--</option>
                  <option value="Goods">Goods</option>
                  <option value="Services">Services</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.tradeIndustryType}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
          </Col>
          <Col md={3}>
            <div className="form-group mapApproved required">
              <Form.Group controlId="mapApproved">
                <Form.Label className="control-label">Map Approved</Form.Label>
                <Form.Select
                  value={formData.mapapproved}
                  className="form-control"
                  name="mapApproved"
                  onChange={handleInputChange}
                  isInvalid={!!errors.mapApproved}
                >
                  <option value="">--Please Select--</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.mapApproved}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
          </Col>
          <Col md={3}>
            <div className="form-group propertyType required">
              <Form.Group controlId="propertyType">
                <Form.Label className="control-label">Property Type</Form.Label>
                <Form.Select
                  value={formData.propertyType}
                  className="form-control"
                  name="propertyType"
                  onChange={handleInputChange}
                  isInvalid={!!errors.propertyType}
                >
                  <option value="">--Please Select--</option>
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.propertyType}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
          </Col>
          <Col md={3}>
            <div className="form-group infraStrOwnType required">
              <Form.Group controlId="infraStrOwnType">
                <Form.Label className="control-label">
                  Ownership Type
                </Form.Label>
                <Form.Select
                  value={formData.infraStrOwnType}
                  className="form-control"
                  name="infraStrOwnType"
                  onChange={handleInputChange}
                  isInvalid={!!errors.infraStrOwnType}
                >
                  <option value="">--Please Select--</option>
                  <option value="Owned">Owned</option>
                  <option value="Rented">Rented</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.infraStrOwnType}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
          </Col>

          
        </Row>
      </CardBody>
    </Card>
  );
};
export default TradeDetails;
