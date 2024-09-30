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
import { CommonFunctions } from "../../../../utils/CommonFunctions.js";
import { showAlert } from "../../../../utils/Alerts.js";
import "./../../../assets/plugins/select2/css/select2.min.css";
import "./../../../assets/plugins/select2-bootstrap4-theme/select2-bootstrap4.min.css";
import "../../../assets/plugins/select2/js/select2.full.min.js";
import ToolTip from "../../../Layouts/ToolTip.js";

const LocationDetails = ({ setFormData, formData, errors }) => {

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({ [name]: value });
	};



	return (
		<Card>
			<CardHeader>
				<Col md={12}>
					<CardTitle>Location Details</CardTitle>
				</Col>
			</CardHeader>
			<CardBody>
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
			</CardBody>
		</Card>
	);
};

export default LocationDetails;
