import React from 'react';
import { Card, Row, Col, Table } from 'react-bootstrap';
import './../../../../assets/dist/css/PreviewApp.css';

const OwnerDetails = ({ petData }) => {

	const owner = petData;
	const additionalDetail = petData.additionalDetail || {};

	return (
		<Card border="primary" className="mb-4 shadow-sm card-common">
			<Card.Header className="card-header-common">
				OWNER DETAILS
			</Card.Header>
			<Card.Body className="card-body-common">
				<Row>
					<Col>
						<Table striped bordered hover className="styled-table">
							<tbody>
								<tr className="table-row">
									<th className="table-header">
										Pet Owner Name
									</th>
									<td className="table-data">{additionalDetail?.applicantName || "N/A"}</td>
									<th className="table-header">
									Pet Owner Father’s Name
									</th>
									<td className="table-data">{petData?.fatherName || "N/A"}</td>
									<th className="table-header">
										Gender
									</th>
									<td className="table-data">{additionalDetail?.petOwnerGender || "N/A"}</td>
								</tr>
								<tr className="table-row">
									<th className="table-header">
										Mobile Number
									</th>
									<td className="table-data">{petData?.mobileNumber || "N/A"}</td>
									<th className="table-header">
										Email
									</th>
									<td className="table-data" colSpan={3}>{petData?.emailId || "N/A"}</td>
								</tr>
							</tbody>
						</Table>
					</Col>
				</Row>
			</Card.Body>
		</Card>
	);
};

export default OwnerDetails;
