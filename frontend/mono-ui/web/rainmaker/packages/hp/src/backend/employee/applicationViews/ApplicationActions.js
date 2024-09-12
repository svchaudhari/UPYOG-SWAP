import React, { useState, useEffect } from "react";
import { Card, CardBody, CardHeader, CardTitle, Col, FormGroup, Row, Form, Button } from "react-bootstrap";
import { APICall } from "../../../utils/api";
import { CommonFunctions } from "../../../utils/CommonFunctions";
import { showAlert } from "../../../utils/Alerts";
import { useNavigate } from 'react-router-dom';
import './../../assets/dist/css/PreviewApp.css';
import PaymentModal from "./PaymentModal";

const ApplicationActions = ({ applicationNo, serviceName }) => {
	const [formData, setFormData] = useState({});
	const [errors, setErrors] = useState({});
	const [userActions, setUserActions] = useState([]);
	const [showPaymentModal, setShowPaymentModal] = useState(false);

	const { updateNewTLStatus } = CommonFunctions();
	const { updateNewGarbageStatus } = CommonFunctions();
	const navigate = useNavigate();

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		if (name === 'userAction' && value === "RETURN_TO_INITIATOR_FOR_PAYMENT") {
			setShowPaymentModal(true);
			return;
		}
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		// Perform validation or submit data here
		const newErrors = {};

		if (!formData.userComments) {
			newErrors.userComments = "Comments are required";
		}
		if (!formData.userAction) {
			newErrors.userAction = "Action is required";
		}

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
		} else {
			setErrors({});
			if (formData.userAction == 'RETURN_TO_INITIATOR_FOR_PAYMENT') {
				setShowPaymentModal(true);
				return;
			}
			let response = '';
			switch (serviceName) {
				case "NewTL":
					response = await updateNewTLStatus(applicationNo, formData.userComments, formData.userAction);
					break;
				case "GarbageCollection":
					response = await updateNewGarbageStatus(applicationNo, formData.userComments, formData.userAction);
					break;
				default:
					break;
			}

			if (response && response.ResponseInfo && response.ResponseInfo.status === "successful") {
				showAlert(
					"Success",
					"Application has been updated successfully",
					"success"
				);

				navigate('/backend');

			} else {
				showAlert(
					"Error",
					"Could not update. Please try again",
					"error"
				);
			}
		}
	};
	const updateStatusLabel = (status) => {
		let statusLabel = '';
		switch (status) {
			case 'VERIFY':
				statusLabel = 'Verify Application'
				break;
			case 'RETURN_TO_INITIATOR':
				statusLabel = 'Raise Query to Citizen'
				break;
			case 'RETURN_TO_INITIATOR_FOR_PAYMENT':
				statusLabel = 'Request for Payment'
				break;
			case 'RETURN_TO_VERIFIER':
				statusLabel = 'Return to Verifier';
				break;
			case 'CLOSE':
				statusLabel = 'Terminate License';
				break;
			default:
				statusLabel = status
		}
		return statusLabel;
	}

	let url = '';
	switch (serviceName) {
		case "NewTL":
			url = `${process.env.REACT_APP_TRADE_LICENSE_SERVICE}/tl-services/v1/fetch/ACTIONS`;
			break;
		case "GarbageCollection":
			url = `${process.env.REACT_APP_GARBAGE_COLLECTION_SERVICE}/grbg-services/garbage-accounts/fetch/ACTIONS`;
			break;
		default:
			break;
	}
	useEffect(() => {
		(async () => {
			const postData = {
				RequestInfo: {
					apiId: process.env.REACT_APP_APIID,
					authToken: localStorage.getItem("token"),
					userInfo: JSON.parse(localStorage.getItem("userInfo")),
				},
				applicationNumbers: [applicationNo],
			};
			try {
				const response = await APICall(
					url,
					"POST",
					JSON.stringify(postData),
					{ "Content-Type": "application/json" }
				);
				if (response.applicationDetails[0]) {
					setUserActions(response.applicationDetails[0].action)
				}
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		})();
	}, [applicationNo]); // Add dependencies here


	return (
		<Card border="primary" className="mb-4 shadow-sm card-common">
			<CardHeader className="card-header-common card-header">
				Take Necessary Action
			</CardHeader>
			<CardBody>
				<Form>
					<Row>
						<Col md={4}>
							<div className="form-group userAction required">
								<FormGroup controlId="userAction" className="userAction required">
									<Form.Label className="control-label">Select Action</Form.Label>
									<Form.Select
										name="userAction"
										className="form-control"
										value={formData.userAction || ""}
										onChange={handleInputChange}
										isInvalid={!!errors.userAction}
									>
										<option value=''>--Please Select--</option>
										{userActions.map((action, index) => (
											<option key={action} value={action}>
												{updateStatusLabel(action)}
											</option>
										))}
									</Form.Select>
									<Form.Control.Feedback type="invalid">
										{errors.userAction}
									</Form.Control.Feedback>
								</FormGroup>
							</div>
						</Col>
						<Col md={12}>
							<div className="form-group userComments required">
								<FormGroup controlId="userComments" className="userComments">
									<Form.Label className="control-label">
										Please enter your remarks/comments
									</Form.Label>
									<Form.Control
										as="textarea"
										name="userComments"
										placeholder="Enter your remarks"
										value={formData.userComments || ""}
										onChange={handleInputChange}
										isInvalid={!!errors.userComments}
										maxLength={500}
										rows={2}
										className="fixed-height-textarea"
									/>
									<Form.Control.Feedback type="invalid">
										{errors.userComments}
									</Form.Control.Feedback>
								</FormGroup>
							</div>
						</Col>
					</Row>
					<Row className="justify-content">
						<Col xs="auto" style={{ paddingRight: "1rem", marginLeft: "10px" }}>
							<Button variant="danger" onClick={handleSubmit}>
								Update Status
							</Button>
						</Col>
					</Row>
				</Form>
				{showPaymentModal && <PaymentModal applicationNo={applicationNo} serviceName={serviceName} />}
			</CardBody>
		</Card>
	);
};

export default ApplicationActions;
