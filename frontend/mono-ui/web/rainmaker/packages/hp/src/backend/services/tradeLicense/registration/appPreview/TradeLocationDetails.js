import React from 'react';
import { Card, Row, Col, Table } from 'react-bootstrap';
import './../../../../assets/dist/css/PreviewApp.css';

const TradeLocationDetails = ({ fetchTrdData }) => {
  const tradeLicenseDetail = fetchTrdData?.tradeLicenseDetail || {};
  const address = tradeLicenseDetail.address || {};
  const additionalDetail = address.additionalDetail || {};
  const propertyId = fetchTrdData?.propertyId ?? "N/A"; // Ensure propertyId is a primitive or provide a default

  return (
    <Card border="primary" className="mb-4 shadow-sm card-common">
      <Card.Header className="card-header-common">
        TRADE LOCATION DETAILS
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
                  <td className="table-data">{typeof propertyId === 'object' ? JSON.stringify(propertyId) : propertyId}</td> {/* Convert to string if object */}
                  <th className="table-header">
                    Property Owner Name
                  </th>
                  <td className="table-data">{tradeLicenseDetail.additionalDetail?.propertyOwner || "N/A"}</td>
                  <th className="table-header">
                    Address
                  </th>
                  <td className="table-data">{address.addressLine1 || "N/A"}</td>
                </tr>
                <tr className="table-row">
                  <th className="table-header">
                    District
                  </th>
                  <td className="table-data">{additionalDetail.district || "N/A"}</td>
                  <th className="table-header">
                    ULB Name
                  </th>
                  <td className="table-data">{additionalDetail.ulbName || "N/A"}</td>
                  <th className="table-header">
                    ULB Type
                  </th>
                  <td className="table-data">{additionalDetail.ulbType || "N/A"}</td>
                </tr>
                <tr className="table-row">
                  <th className="table-header">
                    Ward Name
                  </th>
                  <td className="table-data">{additionalDetail.wardNo || "N/A"}</td>
                  <th className="table-header">
                    Pin Code
                  </th>
                  <td className="table-data" colSpan={3}>{address.pincode || "N/A"}</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default TradeLocationDetails;
