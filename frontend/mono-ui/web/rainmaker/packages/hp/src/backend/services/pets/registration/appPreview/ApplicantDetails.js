import React from 'react';
import { Card, Row, Col, Table } from 'react-bootstrap';
import './../../../../assets/dist/css/PreviewApp.css';

const ApplicantDetails = ({ petData }) => {

	const additionalDetail = petData?.additionalDetail;

	return (
		<Card border="primary" className="mb-4 shadow-sm card-common">
			<Card.Header className="card-header-common">
				APPLICANT DETAILS
			</Card.Header>
			<Card.Body className="card-body-common">
				<Row>
					<Col>
						<Table striped bordered hover className="styled-table">
							<tbody>
								<tr className="table-row">
									<th className="table-header">
										Applicant Name
									</th>
									<td className="table-data">{additionalDetail?.applicantName || "N/A"}</td>
									<th className="table-header">
										Mobile Number
									</th>
									<td className="table-data">{additionalDetail?.applicantPhoneNumber || "N/A"}</td>
									<th className="table-header">
										Email Address
									</th>
									<td className="table-data">{additionalDetail?.applicantEmail || "N/A"}</td>
								</tr>
							</tbody>
						</Table>
					</Col>
				</Row>
			</Card.Body>
		</Card>
	);
}

export default ApplicantDetails;