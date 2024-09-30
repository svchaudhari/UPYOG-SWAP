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
const ApplicantDetails = ({ setFormData, formData, errors }) => {
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({ [name]: value });
	};
	return (
		<Card>
			<CardHeader>
				<Col md={12}>
					<CardTitle>Applicant Details</CardTitle>
				</Col>
			</CardHeader>
			<CardBody>
				<Row className="mb-4">
					<Col md={4}>
						<div className="form-group applicantName required">
							<Form.Group controlId="applicantName">
								<Form.Label className="control-label">
									{" "}
									Applicant Name{" "}
								</Form.Label>{" "}
								<Form.Control
									name="applicantName"
									type="text"
									placeholder="Name of Applicant"
									value={formData.applicantName || localStorage.getItem("user")}
									onLoad={handleInputChange}
									readOnly="readonly"
									isInvalid={!!errors.applicantName}
								/>
								<Form.Control.Feedback type="invalid">
									{errors.applicantName}
								</Form.Control.Feedback>
							</Form.Group>
						</div>
					</Col>

					<Col md={4}>
						<div className="form-group applicantMobileNumber required">
							<Form.Group controlId="applicantMobileNumber">
								<Form.Label className="control-label">
									{" "}
									Mobile Number{" "}
								</Form.Label>{" "}
								<Form.Control
									name="applicantMobileNumber"
									type="text"
									placeholder="Mobile Number"
									value={formData.applicantMobileNumber || JSON.parse(localStorage.getItem("userInfo")).mobileNumber}
									onChange={handleInputChange}
									readOnly="readonly"
									isInvalid={!!errors.applicantMobileNumber}
								/>
								<Form.Control.Feedback type="invalid">
									{errors.applicantMobileNumber}
								</Form.Control.Feedback>
							</Form.Group>
						</div>
					</Col>
					<Col md={4}>
						<div className="form-group applicantEmailAddress required">
							<Form.Group controlId="x">
								<Form.Label className="control-label">
									{" "}
									Email Address{" "}
								</Form.Label>{" "}
								<Form.Control
									name="applicantEmailAddress"
									type="text"
									placeholder="Email Address"
									value={formData.applicantEmailAddress || JSON.parse(localStorage.getItem("userInfo")).emailId}
									onChange={handleInputChange}
									readOnly="readonly"
									isInvalid={!!errors.applicantEmailAddress}
								/>
								<Form.Control.Feedback type="invalid">
									{errors.applicantEmailAddress}
								</Form.Control.Feedback>
							</Form.Group>
						</div>
					</Col>

				</Row>
			</CardBody>
		</Card>
	);
};
export default ApplicantDetails;
