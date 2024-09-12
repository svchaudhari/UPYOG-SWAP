import React, { useContext, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import PageHeading from "../../../../components/PageHeading";
import Layout from "../../../Layouts";
import Footer from '../../../Layouts/Footer';
 import PetApplicationStats from "./PetApplicationStats";

const EmployeePetDashboard = () => {

	return (
		<div>
			{/* <Layout /> */}
			<div className="content-wrapper">
				<Container fluid>
					<PageHeading headingText=" Dashboard "></PageHeading>

					<div className="container-div">
						<div className="content">
							<PetApplicationStats />
						</div>
					</div>
				</Container>
			</div>
			{/* <Footer /> */}
		</div>
	);
};
export default EmployeePetDashboard;
