import React from 'react';
import { Card, Row, Col, Table } from 'react-bootstrap';
import './../../../../assets/dist/css/PreviewApp.css';

const GarbageSpecifications = ({ garbageData }) => {

	const data = garbageData;
	
	


	return (
		<Card border="primary" className="mb-4 shadow-sm card-common">
			<Card.Header className="card-header-common">
				GARBAGE SPECIFICATION DETAILS
			</Card.Header>
			<Card.Body className="card-body-common">
				<Row>
					<Col>
						<Table striped bordered hover className="styled-table">
							<tbody>
								<tr className="table-row">
									<th className="table-header">
									Old Garbage ID
									</th>
									<td className="table-data">{"N/A"}</td> 
									<th className="table-header">
									New Garbage ID
									</th>
									<td className="table-data">{garbageData.grbgCollectionUnits[0].garbageId|| "N/A"}</td>
									<th className="table-header">
										Type of Collection Unit from Garbage ID
									</th>
									<td className="table-data">{garbageData.grbgCollectionUnits[0].unitType|| "N/A"}</td>
								</tr>
								<tr className="table-row">
									<th className="table-header">
									Category
									</th>
									<td className="table-data">{garbageData.grbgCollectionUnits[0].category || "N/A"}</td>
									<th className="table-header">
									Sub Category
									</th>
									<td className="table-data">{garbageData.grbgCollectionUnits[0].subCategory || "N/A"}</td>
									<th className="table-header">
									Sub Category Type
									</th>
									<td className="table-data">{garbageData.grbgCollectionUnits[0].subCategoryType || "N/A"}</td>

								</tr>
							</tbody>
						</Table>
					</Col>
				</Row>
			</Card.Body>
		</Card>
	);
};

export default GarbageSpecifications;
