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
const OwnerDetails = ({ setFormData, formData, errors }) => {
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({ [name]: value });
	};
	return (
		<Card>
			<CardHeader>
				<Col md={12}>
					<CardTitle> Owner Details</CardTitle>
				</Col>
			</CardHeader>
			<CardBody>
				<Row className="mb-4">
					<Col md={4}>
						<div className="form-group propertyOwnerType required">
							<Form.Group controlId="propertyOwnerType">
								<Form.Label className="control-label">Are you owner or Tenant.</Form.Label>
								<Form.Select
									value={formData.propertyOwnerType}
									className="form-control"
									name="propertyOwnerType"
									onChange={handleInputChange}
									isInvalid={!!errors.propertyOwnerType}
								>
									<option value="">--Please Select--</option>
									<option value="Owner">Owner</option>
									<option value="Tenant">Tenant</option>
								</Form.Select>
								<Form.Control.Feedback type="invalid">
									{errors.propertyOwnerType}
								</Form.Control.Feedback>
							</Form.Group>
						</div>

					</Col>
					<Col md={4}>
						<div className="form-group ownerName required">
							<Form.Group controlId="ownerName">
								<Form.Label className="control-label">
									{" "}
									Name{" "}
								</Form.Label>{" "}
								<Form.Control
									name="ownerName"
									type="text"
									placeholder="Name"
									value={formData.ownerName}
									onChange={handleInputChange}
									isInvalid={!!errors.ownerName}
								/>
								<Form.Control.Feedback type="invalid">
									{errors.ownerName}
								</Form.Control.Feedback>
							</Form.Group>
						</div>
					</Col>

					<Col md={4}>
						<div className="form-group ownerGender required">
							<Form.Group controlId="ownerGender">
								<Form.Label className="control-label">Gender</Form.Label>
								<Form.Select
									value={formData.ownerGender}
									className="form-control"
									name="ownerGender"
									onChange={handleInputChange}
									isInvalid={!!errors.ownerGender}
								>
									<option value="">--Please Select--</option>
									<option value="Male">Male</option>
									<option value="Female">Female</option>
								</Form.Select>
								<Form.Control.Feedback type="invalid">
									{errors.ownerGender}
								</Form.Control.Feedback>
							</Form.Group>
						</div>

					</Col>
				</Row>
				<Row className="mb-4">
					<Col md={4}>
						<div className="form-group ownerMobileNumber required">
							<Form.Group controlId="ownerMobileNumber">
								<Form.Label className="control-label">
									{" "}
									Mobile Number{" "}
								</Form.Label>{" "}
								<Form.Control
									type="number"
									name="ownerMobileNumber"
									placeholder="Mobile Number"
									value={formData.ownerMobileNumber}
									onChange={handleInputChange}
									isInvalid={!!errors.ownerMobileNumber}
								/>
								<Form.Control.Feedback type="invalid">
									{errors.ownerMobileNumber}
								</Form.Control.Feedback>
							</Form.Group>
						</div>
					</Col>
					<Col md={4}>
						<div className="form-group ownerEmailAddress required">
							<Form.Group controlId="ownerEmailAddress">
								<Form.Label className="control-label">
									{" "}
									Email{" "}
								</Form.Label>{" "}
								<Form.Control
									type="email"
									name="ownerEmailAddress"
									placeholder="Email Address"
									value={formData.ownerEmailAddress}
									onChange={handleInputChange}
									isInvalid={!!errors.ownerEmailAddress}
								/>
								<Form.Control.Feedback type="invalid">
									{errors.ownerEmailAddresss}
								</Form.Control.Feedback>
							</Form.Group>
						</div>
					</Col>
				</Row>
			</CardBody>
		</Card>
	);
};
export default OwnerDetails;
