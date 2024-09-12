import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import StepProgress from "./../../../../components/StepProgress";
import PageHeading from "../../../../components/PageHeading";
import { showAlert } from "./../../../../utils/Alerts";
import ApplicantDetails from "./appPreview/ApplicantDetails";
import { CommonFunctions } from "../../../../utils/CommonFunctions";
import OwnerDetails from "./appPreview/OwnerDetails";
import PropertyLocationDetails from "./appPreview/PropertyLocationDetails";
import GarbageSpecifications from "./appPreview/GarbageSpecifications";
import NewRegistrationSubmission from "./NewRegistrationSubmission";
import { useNavigate } from 'react-router-dom';


const PreviewApp = ({ onBack, onNext }) => {
	const [activeStep, setActiveStep] = useState(3);
	const [fetchGarbageData, setFetchGarbageData] = useState(null); // Changed to null initially
	const { getGarbageApplicationData } = CommonFunctions();
	const navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const appData = await getGarbageApplicationData(
					`?tenantId=${process.env.REACT_APP_TENANTID}.${localStorage.getItem("ULB")}&applicationNumber=${localStorage.getItem("applicationNumber")}`
				);

				if (appData.ResponseInfo.status && appData.ResponseInfo.status === "successful") {
					setFetchGarbageData(appData.garbageAccounts[0]);
				} else {
					showAlert(
						"Error",
						"Something went wrong. Could not connect with server",
						"error"
					);
				}
			} catch (error) {
				console.error("Error fetching Garbage data:", error);
			}
		};

		fetchData();
	}, []);

	const handleSubmit = async () => {
		const { submitNewRegistrationSubmission } = NewRegistrationSubmission();
		const response = await submitNewRegistrationSubmission(localStorage.getItem("ID"),"NEW","GarbageCollection","FORWARD_TO_VERIFIER",localStorage.getItem("applicationNumber"));
		if(response && response.ResponseInfo && response.ResponseInfo.status==="successful"){
		  showAlert(
			"Success",
			"Application has been submitted successfully with application number " + localStorage.getItem("applicationNumber"),
			"success"
		  );
		  localStorage.removeItem("ID");
		  localStorage.removeItem("applicationNumber");
		  localStorage.removeItem("businessService");
		  localStorage.removeItem("module");
		  localStorage.removeItem("ULB");
	
		  navigate('/backend/garbage-dashboard');
		  // redirect to Garbage home page
		}else{
		  showAlert(
			"Error",
			"Something went wrong. Please try again.",
			"error"
		  );
		}
	  };

	if (!fetchGarbageData) {
		return (
			<div className="content-wrapper d-flex flex-column justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
				<Spinner animation="border" role="status">
					<span className="sr-only">Loading...</span>
				</Spinner>
				<p>Loading data, please wait...</p>
			</div>
		);
	}

	return (
		<div className="content-wrapper d-flex flex-column" style={{ minHeight: "100vh", padding: "20px" }}>
			<Container fluid className="d-flex flex-column flex-grow-1">
				<PageHeading headingText="New Garbage Registration"></PageHeading>
				<div className="container-div">
					<StepProgress activeStep={activeStep}  stepName="Pet Registration"/>
				</div>
				<div style={{ margin: "0 5px", backgroundColor: "white", padding: "20px", marginBottom: "40px", borderRadius: "10px", flexGrow: 1 }}>
					<GarbageSpecifications garbageData={fetchGarbageData} />
					<OwnerDetails garbageData={fetchGarbageData} />
					<PropertyLocationDetails garbageData={fetchGarbageData} />
					<ApplicantDetails garbageData={fetchGarbageData} />
				</div>
				<div
					className="mt-auto"
					style={{
						backgroundColor: "white",
						padding: "20px",
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
								onClick={onBack}
							>
								Cancel
							</Button>
							<Button
								style={{
									backgroundColor: "#49627E",
									borderColor: "#49627E",
									width: "115px",
								}}
								onClick={handleSubmit}
							>
								Submit
							</Button>
						</Col>
					</Row>
				</div>
			</Container>
		</div>
	);
};

export default PreviewApp;
