import React from 'react';
import { Card, Row, Col, Table } from 'react-bootstrap';
import './../../../../assets/dist/css/PreviewApp.css';

const LicenseSpecifications = ({ fetchTrdData }) => {
  const tradeLicenseDetail = fetchTrdData?.tradeLicenseDetail;
  const tradeUnits = tradeLicenseDetail?.tradeUnits || [];
  const additionalDetail = tradeLicenseDetail?.additionalDetail || {};

  return (
    <Card border="primary" className="mb-4 shadow-sm card-common">
      <Card.Header className="card-header-common">
        TRADE SPECIFICATIONS
      </Card.Header>
      <Card.Body className="card-body-common">
        <Row>
          <Col>
            <Table striped bordered hover className="styled-table">
              <tbody>
                <tr className="table-row">
                  <th className="table-header">Trade Industry Type</th>
                  <td className="table-data">{tradeUnits[0]?.tradeType || "N/A"}</td>
                  <th className="table-header">License Category</th>
                  <td className="table-data">{additionalDetail.tradeCategory || "N/A"}</td>
                  <th className="table-header">Trade Sub-Category</th>
                  <td className="table-data">{additionalDetail.tradeSubType || "N/A"}</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default LicenseSpecifications;