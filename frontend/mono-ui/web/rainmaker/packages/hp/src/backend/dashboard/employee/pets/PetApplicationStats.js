import React, { useContext, useEffect, useState } from "react";
import { CommonFunctions } from "../../../../utils/CommonFunctions";
import { Col, Container, Row } from "react-bootstrap";
import PetApplicationList from "./PetApplicationList";


const PetApplicationStats = () => {
	const { getCitizenPetAppStats } = CommonFunctions();
	const [draftApps, setDraftApps] = useState(0);
	const [pendingForPay, setPendingForPay] = useState(0);
	const [appliedApps, setAppliedApps] = useState(0);
	const [revertedApps, setRevertedApps] = useState(0);
	const [approvedApps, setApprovedApps] = useState(0);
	const [rejectedApps, setRejectedApps] = useState(0);
	const [applicationLists, setApplicationLists] = useState([]);

	useEffect(() => {
		(async () => {
			const citizenDash = await getCitizenPetAppStats();
			// if (citizenDash && citizenDash.Count > 0) {
			if (citizenDash) {
				setDraftApps(citizenDash.applicationInitiated);
				setPendingForPay(citizenDash.applicationPendingForPayment);
				setAppliedApps(citizenDash.applicationApplied);
				setApprovedApps(citizenDash.applicationApproved);
				setRejectedApps(citizenDash.applicationRejected);
				setApplicationLists(citizenDash.PetRegistrationApplications);
			}
		})();
	}, []);
	const getStatuswiseApplications = async (status) => {
		const citizenDash = await getCitizenPetAppStats(`?accountId=${JSON.parse(localStorage.getItem("userInfo")).uuid}&status=${status}`);
		if (citizenDash) {
			setApplicationLists(citizenDash.PetRegistrationApplications);
		}
	};

	return (
		<>
			<Container fluid>
				<Row>
					<Col lg={3} sm={6}>
						<div className="small-box bg-lightblue">
							<div className="inner">
								<h3>{appliedApps}</h3>
								<p>Submitted</p>
							</div>
							<div className="icon">
								<i className="fas fa-tasks" />
							</div>
							<a href="#" className="small-box-footer">
								More info <i className="fas fa-arrow-circle-right" />
							</a>
						</div>
					</Col>

					<Col lg={3} sm={6}>
						<div className="small-box bg-warning">
							<div className="inner">
								<h3>{revertedApps}</h3>
								<p>Reverted Back </p>
							</div>
							<div className="icon">
								<i className="fas fa-undo" />
							</div>
							<a href="#" className="small-box-footer">
								More info <i className="fas fa-arrow-circle-right" />
							</a>
						</div>
					</Col>
					<Col lg={3} sm={6}>
						<div className="small-box bg-success">
							<div className="inner">
								<h3>{approvedApps}</h3>
								<p>Approved</p>
							</div>
							<div className="icon">
								<i className="fas fa-check-square" />
							</div>
							<a href="#" className="small-box-footer">
								More info <i className="fas fa-arrow-circle-right" />
							</a>
						</div>
					</Col>
					<Col lg={3} sm={6}>
						<div className="small-box bg-danger">
							<div className="inner">
								<h3>{rejectedApps}</h3>
								<p>Rejected</p>
							</div>
							<div className="icon">
								<i className="fa fa-ban" />
							</div>
							<a href="#" className="small-box-footer">
								More info <i className="fas fa-arrow-circle-right" />
							</a>
						</div>
					</Col>
				</Row>
			</Container>
			{/* <PetApplicationList applicationLists={applicationLists} /> */}


		</>
	);
};
export default PetApplicationStats;
