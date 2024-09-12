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
import { CommonFunctions } from "../../../../utils/CommonFunctions.js";

const PetDetails = ({ setFormData, formData, errors }) => {

	const [petcategories, setPetcategories] = useState([]);
	const [petType, setPetType] = useState([]);
	const [breedType, setbreedType] = useState([]);
	const { getMdmseSearch } = CommonFunctions();

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({ [name]: value });
	};


	useEffect(() => {
		(async () => {
			const petcategories = await getMdmseSearch("PetService", "BreedType");
			if (petcategories?.MdmsRes?.PetService) {
				setPetcategories(petcategories.MdmsRes.PetService.BreedType);
			}
		})();
	}, []);

	useEffect(() => {
		const uniqueCategories = [...new Set(petcategories.map(item => item.PetType))];
		setPetType(uniqueCategories);
	}, [petcategories]);

	useEffect(() => {
		const selectedbreeds = petcategories
			.filter(item => item.PetType === formData.petType)
			.map(item => item.name);
		setbreedType([...new Set(selectedbreeds)]);
	}, [formData.petType, petcategories]);


	return (
		<Card>
			<CardHeader>
				<Col md={12}>
					<CardTitle>Pet Details</CardTitle>
				</Col>
			</CardHeader>
			<CardBody>
				<Row className="mb-4">
					<Col md={4}>
						<div className="form-group petType required">
							<Form.Group controlId="petType">
								<Form.Label className="control-label">Pet Animal Type</Form.Label>
								<Form.Select
									name="petType"
									value={formData.petType}
									className="form-control"
									onChange={handleInputChange}
									isInvalid={!!errors.petType}
								>
									<option>--Please Select--</option>
									{petType.map((type, index) => (
										<option key={index} value={type}>{type}</option>
									))}
								</Form.Select>
								<Form.Control.Feedback type="invalid">
									{errors.petType}
								</Form.Control.Feedback>
							</Form.Group>
						</div>
					</Col>
					<Col md={4}>
						<div className="form-group breedType required">
							<Form.Group controlId="breedType">
								<Form.Label className="control-label">Pet Breed</Form.Label>
								<Form.Select
									name="breedType"
									value={formData.breedType}
									className="form-control"
									onChange={handleInputChange}
									isInvalid={!!errors.breedType}
								>
									<option value="">--Please Select--</option>

									{breedType.map((breedtype, index) => (
										<option key={index} value={breedtype}>{breedtype}</option>
									))}

								</Form.Select>
								<Form.Control.Feedback type="invalid">
									{errors.breedType}
								</Form.Control.Feedback>
							</Form.Group>
						</div>
					</Col>
					<Col md={4}>
						<div className="form-group petName required">
							<Form.Group controlId="petName">
								<Form.Label className="control-label">Pet Name</Form.Label>
								<Form.Control
									type="text"
									name="petName"
									placeholder="Pet Name"
									value={formData.petName}
									onChange={handleInputChange}
									isInvalid={!!errors.petName}
								/>
								<Form.Control.Feedback type="invalid">
									{errors.petName}
								</Form.Control.Feedback>
							</Form.Group>
						</div>
					</Col>
				</Row>
				<Row className="mb-4">
					<Col md={4}>
						<div className="form-group petGender required">
							<Form.Group controlId="petGender">
								<Form.Label className="control-label">Pet Gender</Form.Label>
								<Form.Select
									value={formData.petGender}
									name="petGender"
									className="form-control"
									onChange={handleInputChange}
									isInvalid={!!errors.petGender}
								>
									<option value="">--Please Select--</option>
									<option value="Male">Male</option>
									<option value="Female">Female</option>
								</Form.Select>
								<Form.Control.Feedback type="invalid">
									{errors.petGender}
								</Form.Control.Feedback>
							</Form.Group>
						</div>
					</Col>
					<Col md={4}>
						<div className="form-group petAge required">
							<Form.Group controlId="petAge">
								<Form.Label className="control-label">
									Pet Age (in months)
								</Form.Label>
								<Form.Control
									type="number"
									name="petAge"
									min="0"
									step="0.01"
									placeholder="Pet Age"
									value={formData.petAge}
									onChange={handleInputChange}
									isInvalid={!!errors.petAge}
								/>
								<Form.Control.Feedback type="invalid">
									{errors.petAge}
								</Form.Control.Feedback>
								{/* <span className="control-label">1 Years 2 Months</span> */}
							</Form.Group>
						</div>
					</Col>
					<Col md={4}>
						<div className="form-group petStrelization required">
							<Form.Group controlId="petStrelization">
								<Form.Label className="control-label">Pet Strelization</Form.Label>
								<Form.Select
									name="petStrelization"
									value={formData.petStrelization}
									className="form-control"

									onChange={handleInputChange}
									isInvalid={!!errors.petStrelization}
								>
									<option value="">--Please Select--</option>
									<option value="Yes">Yes</option>
									<option value="No">No</option>
								</Form.Select>
								<Form.Control.Feedback type="invalid">
									{errors.petStrelization}
								</Form.Control.Feedback>
							</Form.Group>
						</div>
					</Col>
				</Row>
				<Row className="mb-4">
					<Col md={4}>
						<div className="form-group petPurchaseSource required">
							<Form.Group controlId="petPurchaseSource">
								<Form.Label className="control-label">
									Pet Purchase Source
								</Form.Label>
								<Form.Select
									name="petPurchaseSource"
									value={formData.petPurchaseSource}
									className="form-control"

									onChange={handleInputChange}
									isInvalid={!!errors.petPurchaseSource}
								>
									<option value="">--Please Select--</option>
									<option value="Stray Dog Adoption">Stray Dog Adoption</option>
									<option value="Licensed Breeder">Licensed Breeder</option>
									<option value="Pet Store">Pet Store</option>
									<option value="Online Store">Online Store</option>
								</Form.Select>
								<Form.Control.Feedback type="invalid">
									{errors.petPurchaseSource}
								</Form.Control.Feedback>
								{/* <span className="control-label">1 Years 2 Months</span> */}
							</Form.Group>
						</div>
					</Col>

					<Col md={4}>
						<div className="form-group petPurchaseSourceDetail required">
							<Form.Group controlId="petPurchaseSourceDetail">
								<Form.Label className="control-label">
									Pet Purchase Source Details
								</Form.Label>

								<Form.Control
									as="textarea"
									placeholder="Pet Purchase Source Details"
									name="petPurchaseSourceDetail"
									value={formData.petPurchaseSourceDetail}
									onChange={handleInputChange}
									isInvalid={!!errors.petPurchaseSourceDetail}
									maxLength={500}
									rows={2}
									className="fixed-height-textarea"
								/>
								<Form.Control.Feedback type="invalid">
									{errors.petPurchaseSourceDetail}
								</Form.Control.Feedback>
								{/* <span className="control-label">1 Years 2 Months</span> */}
							</Form.Group>
						</div>
					</Col>
					<Col md={4}>
						<div className="form-group vaccinationStatus required">
							<Form.Group controlId="vaccinationStatus">
								<Form.Label className="control-label">Pet Vaccination Status</Form.Label>
								<Form.Select
									name="vaccinationStatus"
									value={formData.vaccinationStatus}
									className="form-control"

									onChange={handleInputChange}
									isInvalid={!!errors.vaccinationStatus}
								>
									<option value="">--Please Select--</option>
									<option value="Yes">Yes</option>
									<option value="No">No</option>
								</Form.Select>
								<Form.Control.Feedback type="invalid">
									{errors.vaccinationStatus}
								</Form.Control.Feedback>
							</Form.Group>
						</div>
					</Col>
				</Row>
				<Row className="mb-4">
					<Col md={4}>
						<div className="form-group vaccinationDate">
							<Form.Group controlId="vaccinationDate">
								<Form.Label className="control-label">
									Pet Vaccination Date
								</Form.Label>
								<Form.Control
									name="vaccinationDate"
									type="date"
									placeholder="Vaccination Date"
									value={formData.vaccinationDate}
									onChange={handleInputChange}
									isInvalid={!!errors.vaccinationDate}
								/>
								<Form.Control.Feedback type="invalid">
									{errors.vaccinationDate}
								</Form.Control.Feedback>
							</Form.Group>
						</div>
					</Col>
					<Col md={4}>
						<div className="form-group doctorName">
							<Form.Group controlId="doctorName">
								<Form.Label className="control-label">Veterinary Doctor Name</Form.Label>
								<Form.Control
									name="doctorName"
									type="text"
									placeholder="Veterinary Doctor Name"
									value={formData.doctorName}
									onChange={handleInputChange}
									isInvalid={!!errors.doctorName}
								/>
								<Form.Control.Feedback type="invalid">
									{errors.doctorName}
								</Form.Control.Feedback>
							</Form.Group>
						</div>
					</Col>
					<Col md={4}>
						<div className="form-group doctorRegistrationNumber">
							<Form.Group controlId="doctorRegistrationNumber">
								<Form.Label className="control-label">Veterinary Doctor Registration Number</Form.Label>
								<Form.Control
									name="doctorRegistrationNumber"
									type="text"
									placeholder="Veterinary Doctor Registration Number"
									value={formData.doctorRegistrationNumber}
									onChange={handleInputChange}
									isInvalid={!!errors.doctorRegistrationNumber}
								/>
								<Form.Control.Feedback type="invalid">
									{errors.doctorRegistrationNumber}
								</Form.Control.Feedback>
							</Form.Group>
						</div>
					</Col>
				</Row>
			</CardBody>
		</Card>
	);
};
export default PetDetails;
