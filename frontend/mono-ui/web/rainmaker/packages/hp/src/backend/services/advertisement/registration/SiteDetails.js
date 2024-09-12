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

const SiteDetails = ({ setFormData, formData, errors }) => {
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({ [name]: value });
	};

	return (
		<Card>
			<CardHeader>
				<Col md={12}>
					<CardTitle>Site Details</CardTitle>
				</Col>
			</CardHeader>
			<CardBody>
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
									<option value="Advertising Hoarding Site">
										Advertising Hoarding Site
									</option>
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
									style={{ height: "38px" }}
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
							{geoError && (
								<Form.Text className="text-danger">{geoError}</Form.Text>
							)}
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
									<option value="">--Select--</option>
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
								<Row>
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
										<Form.Control.Feedback type="invalid">
											{errors.sizeLength}
										</Form.Control.Feedback>
									</Col>
									<Col xs="auto">
										<Form.Control
											type="text"
											name="sizeWidth"
											placeholder="Width"
											value={formData.sizeWidth}
											onChange={handleInputChange}
											style={{ width: "138px" }}
											isInvalid={!!errors.sizeWidth}
										/>
										<Form.Control.Feedback type="invalid">
											{errors.sizeWidth}
										</Form.Control.Feedback>
									</Col>
								</Row>
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
			</CardBody>
		</Card>
	);
};

export default SiteDetails;
