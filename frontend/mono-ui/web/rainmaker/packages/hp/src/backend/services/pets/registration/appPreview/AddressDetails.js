import React from 'react';
import { Card, Row, Col, Table } from 'react-bootstrap';
import './../../../../assets/dist/css/PreviewApp.css';

const PropertyLocationDetails = ({ petData }) => {

	const address = petData.address;
	const additionalDetail = petData.additionalDetail || {};

	return (
		<Card border="primary" className="mb-4 shadow-sm card-common">
			<Card.Header className="card-header-common">
				PROPERTY LOCATION DETAILS
			</Card.Header>
			<Card.Body className="card-body-common">
				<Row>
					<Col>
						<Table striped bordered hover className="styled-table">
							<tbody>
								<tr className="table-row">
									<th className="table-header">
										Property ID
									</th>
									<td className="table-data">{additionalDetail.propertyId || "N/A"}</td> {/* Convert to string if object */}
									<th className="table-header">
									Address
									</th>
									<td className="table-data">{address.addressLine1 || "N/A"}</td>
									<th className="table-header">
									District
									</th>
									<td className="table-data">{additionalDetail.districtName || "N/A"}</td>
								</tr>

								<tr className="table-row">
									<th className="table-header">
									ULB Name
									</th>
									<td className="table-data">{additionalDetail.ulbName || "N/A"}</td>
									<th className="table-header">
									ULB Type
									</th>
									<td className="table-data">{additionalDetail.ulbType || "N/A"}
									</td>
									<th className="table-header">
									Ward Name
									</th>
									<td className="table-data">{additionalDetail.wardNumber || "N/A"}</td>

								</tr>
								<tr className="table-row">
									<th className="table-header">
									Pin Code
									</th>
									<td className="table-data">{address.pincode || "N/A"}</td>
								</tr>

							</tbody>
						</Table>
					</Col>
				</Row>
			</Card.Body>
		</Card>
	);
};

export default PropertyLocationDetails;
