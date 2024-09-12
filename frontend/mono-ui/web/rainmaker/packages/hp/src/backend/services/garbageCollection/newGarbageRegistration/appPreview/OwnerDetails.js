import React from 'react';
import { Card, Row, Col, Table } from 'react-bootstrap';
import './../../../../assets/dist/css/PreviewApp.css';

const OwnerDetails = ({ garbageData }) => {

	const owner = garbageData;

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
										Owner Type
									</th>
									<td className="table-data">{owner.isOwner == false ? "Tenant" : "Owner" || "N/A"}</td>
									<th className="table-header">
										Owner Name
									</th>
									<td className="table-data">{owner?.name || "N/A"}</td>
									<th className="table-header">
										Gender
									</th>
									<td className="table-data">{owner?.gender || "N/A"}</td>
								</tr>
								<tr className="table-row">
									<th className="table-header">
										Mobile Number
									</th>
									<td className="table-data">{owner?.mobileNumber || "N/A"}</td>
									<th className="table-header">
										Email
									</th>
									<td className="table-data" colSpan={3}>{owner?.emailId || "N/A"}</td>
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
