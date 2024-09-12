import React, { useContext, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import PageHeading from "../../../../components/PageHeading";
import GarbageApplicationStats from "../../employee/garbageCollection/GarbageApplicationStats";

const EmployeeGarbageDashboard = () => {

	return (
		<div>
		
			<div className="content-wrapper">
				<Container fluid>
					<PageHeading headingText=" Dashboard "></PageHeading>

					<div className="container-div">
						<div className="content">
							<GarbageApplicationStats/>
						</div>
					</div>
				</Container>
			</div>
		
		</div>
	);
};
export default EmployeeGarbageDashboard;
