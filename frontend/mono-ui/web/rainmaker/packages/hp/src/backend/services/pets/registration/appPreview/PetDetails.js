import React from 'react';
import { Card, Row, Col, Table } from 'react-bootstrap';
import './../../../../assets/dist/css/PreviewApp.css';

const PetDetails = ({ petData }) => {

	const petDetails = petData?.petDetails;
	const additionalDetail = petData?.additionalDetail;


	return (
		<Card border="primary" className="mb-4 shadow-sm card-common">
			<Card.Header className="card-header-common">
				PET DETAILS
			</Card.Header>
			<Card.Body className="card-body-common">
				<Row>
					<Col>
						<Table striped bordered hover className="styled-table">
							<tbody>
								<tr className="table-row">
									<th className="table-header">
										Pet Animal Type
									</th>
									<td className="table-data">{petDetails?.petType || "N/A"}</td>
									<th className="table-header">
										Pet Breed Type
									</th>
									<td className="table-data">{petDetails?.breedType || "N/A"}</td>
									<th className="table-header">
										Pet Name
									</th>
									<td className="table-data">{petDetails?.petName || "N/A"}</td>
								</tr>
								<tr className="table-row">
									<th className="table-header">
									Pet Gender
									</th>
									<td className="table-data">{petDetails?.petGender || "N/A"}</td>
									<th className="table-header">
									Pet Age
									</th>
									<td className="table-data">{petDetails?.petAge || "N/A"}</td>
									<th className="table-header">
									Pet Purchase Source
									</th>
									<td className="table-data">{additionalDetail?.petPurchaseSource || "N/A"}</td>
								</tr>
								<tr className="table-row">
									<th className="table-header">
									Pet Purchase Source Detail
									</th>
									<td className="table-data">{additionalDetail?.petPurchaseSourceDetail || "N/A"}</td>
									<th className="table-header">
									Vaccination Status
									</th>
									<td className="table-data">{additionalDetail?.vaccinationStatus || "N/A"}</td>
									<th className="table-header">
									Vaccination Date
									</th>
									<td className="table-data">{petDetails?.lastVaccineDate || "N/A"}</td>
								</tr>
								<tr className="table-row">
									<th className="table-header">
									Doctor Name
									</th>
									<td className="table-data">{petDetails?.doctorName || "N/A"}</td>
									<th className="table-header">
									Doctor Registration Number
									</th>
									<td className="table-data">{additionalDetail?.doctorRegistrationNumber || "N/A"}</td>
									
								</tr>
							</tbody>
						</Table>
					</Col>
				</Row>
			</Card.Body>
		</Card>
	);
}

export default PetDetails;