import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import StepProgress from "../../../../components/StepProgress"; // Ensure the path to your StepProgress component is correct
import PageHeading from "../../../../components/PageHeading";
import PetDetails from "./PetDetails";
import OwnersDetails from "./OwnersDetails";
import AddressDetails from "./AddressDetails";
import ApplicantDetails from "./ApplicantDetails";
import { showAlert } from "../../../../utils/Alerts";
import PetRegistrationSubmission from "./PetRegistrationSubmission";

const PetRegistration = ({ onBack, onNext }) => {
	const [activeStep, setActiveStep] = useState(1);
	const [formData, setFormData] = useState({

		ownerDetails: {
			petOwnerName: "",
			petOwnerFatherName: "",
			petOwnerGender: "",
			petOwnerMobileNumber: "",
			petOwnerEmailAddress: "",
		},
		petDetails: {
			petType: "",
			breedType: "",
			petName: "",
			petGender: "",
			petAge: "",
			petPurchaseSource: "",
			petPurchaseSourceDetail: "",
			vaccinationStatus: "",
			vaccinationDate: "",
			doctorName: "",
			doctorRegistrationNumber: "",
		},
		locationDetails: {
			propertyId: "",
			propertyAddress: "",
			landMark: "",
			districtName: "",
			ulbName: "",
			ulbType: "",
			wardNumber: "",
			propertyPinCode: "",
		},
		applicantDetails: {
			applicantName: localStorage.getItem("user"),
			applicantMobileNumber: JSON.parse(localStorage.getItem("userInfo")).mobileNumber,
			applicantEmailAddress: JSON.parse(localStorage.getItem("userInfo")).emailId,
		},
	});

	const [errors, setErrors] = useState({});
	const handleInputChange = (e) => {
		const { name, value } = e.target;

		setFormData({
			...formData,
			[name]: value,
		});
	};


	const handleNextClick = async () => {
		if (!validateForm()) {
			showAlert(
				"Error",
				"Please resolve highligted errors",
				"error"
			);
			return;
		}

		const { submitPetRegistrationSubmission } = PetRegistrationSubmission();
		const response = await submitPetRegistrationSubmission(formData);

		if (response.ResponseInfo.status && response.ResponseInfo.status === "successful") {
			const petRegistrationdata = response.PetRegistrationApplications[0];
			showAlert(
				"Success",
				"Data has been saved successfully!",
				"success"
			);
			localStorage.setItem("ID", petRegistrationdata.id);
			localStorage.setItem("applicationNumber", petRegistrationdata.applicationNumber);
			localStorage.setItem("businessService", "PTR");
			localStorage.setItem("module", "PTR");
			localStorage.setItem("ULB", petRegistrationdata.additionalDetail.ulbName);
			onNext();
		} else {
			showAlert(
				"Error",
				"Something went wrong. Please try again.",
				"error"
			);
		}



	};

	let requiredFields = ["petOwnerName","petOwnerFatherName","petOwnerGender","petOwnerMobileNumber","districtName", "ulbName", "ulbType", "wardNumber","petType","breedType","petName","petGender"];

	const validateForm = () => {
		let formErrors = {};
		Object.entries(formData).forEach(([key, value]) => {
			Object.entries(requiredFields).forEach(([index, fieldName]) => {
				if (formData[`${key}`][`${fieldName}`] !== undefined && !formData[`${key}`][`${fieldName}`]) {
					formErrors[`${fieldName}`] = `This field is required.`;
				}
			});
		});
		setErrors(formErrors);
		return Object.keys(formErrors).length === 0;
	};
	return (
		<div className="content-wrapper">
			<Container fluid>
				<PageHeading headingText="New Pet Registration"></PageHeading>
				<div className="container-div">
					<StepProgress activeStep={activeStep} stepName={'New Pet Registration'} />
				</div>

				<div className="continer-div">
					<Form>

						<OwnersDetails
							setFormData={(data) =>
								setFormData((prev) => ({
									...prev,
									ownerDetails: {
										...prev.ownerDetails,
										...data,
									},
								}))
							}
							formData={formData.ownerDetails}
							errors={errors}
						/>
						<PetDetails
							setFormData={(data) =>
								setFormData((prev) => ({
									...prev,
									petDetails: {
										...prev.petDetails,
										...data,
									},
								}))
							}
							formData={formData.petDetails}
							errors={errors}
						/>
						<AddressDetails
							setFormData={(data) =>
								setFormData((prev) => ({
									...prev,
									locationDetails: {
										...prev.locationDetails,
										...data,
									},
								}))
							}
							formData={formData.locationDetails}
							errors={errors}
						/>

						<ApplicantDetails
							setFormData={(data) =>
								setFormData((prev) => ({
									...prev,
									applicantDetails: {
										...prev.applicantDetails,
										...data,
									},
								}))
							}
							formData={formData.applicantDetails}
							errors={errors}
						/>
					</Form>
				</div>
				<div
					style={{
						backgroundColor: "white",
						padding: "20px",
						marginTop: "50px",
						marginLeft: "-25px",
						marginRight: "-25px",
						marginBottom: "-20px",
					}}
				>
					<Row className="justify-content-end">
						<Col xs="auto" style={{ paddingRight: "1rem" }}>
							<Button
								variant="light"
								style={{
									marginRight: "15px",
									borderColor: "#49627E",
									width: "115px",
								}}
							>
								Cancel
							</Button>
							<Button
								style={{
									backgroundColor: "#49627E",
									borderColor: "#49627E",
									width: "115px",
								}}
								onClick={handleNextClick}
							>
								Next
							</Button>
						</Col>
					</Row>
				</div>
			</Container>
		</div>
	);
};

export default PetRegistration;
