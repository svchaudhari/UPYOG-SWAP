import React, { useState } from "react";

import {
    Container,
    Row,
    Col,
    Form,
    Button,
} from "react-bootstrap";


import StepProgress from "../../../../components/StepProgress";
import PageHeading from "../../../../components/PageHeading";
import ApplicantDetails from "./ApplicantDetails";
import { showAlert } from "../../../../utils/Alerts";
import SiteDetails from "./SiteDetails";
import LocationDetails from "./LocationDetails";


const SiteRegistration = ({ onBack, onNext }) => {

    const [activeStep, setActiveStep] = useState(1);

    const [formData, setFormData] = useState({

        siteDetails: {
            gpsLocation:""
        },
        locationDetails: {

        },
        applicantDetails: {
            applicantName: localStorage.getItem("user"),
            applicantMobileNumber: JSON.parse(localStorage.getItem("userInfo")).mobileNumber,
            applicantEmailAddress: JSON.parse(localStorage.getItem("userInfo")).emailId,
        }
    });

    const [errors, setErrors] = useState({});
    const handleNextClick = async () => {
        if (!validateForm()) {
            showAlert(
                "Error",
                "Please resolve highligted errors",
                "error"
            );
            return;
        }

        const { submitSiteRegistrationSubmission } = SiteRegistrationSubmission();
        const response = await submitSiteRegistrationSubmission(formData);

        if (response.ResponseInfo.status && response.ResponseInfo.status === "successful") {
            const garbageData = response.garbageAccounts[0];
            showAlert(
                "Success",
                "Data has been saved successfully!",
                "success"
            );
            // 	localStorage.setItem("ID", garbageData.uuid);
            // 	localStorage.setItem("applicationNumber", garbageData.grbgApplication.applicationNo);
            // 	localStorage.setItem("businessService", "GarbageCollection");
            // 	localStorage.setItem("module", "GarbageCollection");
            // 	localStorage.setItem("ULB", garbageData.addresses[0].ulbName);
            // onNext();
        } else {
            showAlert(
                "Error",
                "Something went wrong. Please try again.",
                "error"
            );
        }



    };

    let requiredFields = [""];

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
                <PageHeading headingText="New Site Registration"></PageHeading>
                <div className="container-div">
                    <StepProgress activeStep={activeStep} stepName={'New Site Registration'} />
                </div>

                <div className="continer-div">
                    <Form>



                        <SiteDetails
                            setFormData={(data) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    siteDetails: {
                                        ...prev.siteDetails,
                                        ...data,
                                    },
                                }))
                            }
                            formData={formData.siteDetails}
                            errors={errors}
                        />
                        <LocationDetails
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

export default SiteRegistration;
