import React from 'react';
import { Card, Row, Col, Table } from 'react-bootstrap';
import './../../../../assets/dist/css/PreviewApp.css';

const RegistrationDetails = ({ fetchTrdData }) => {
  const tradeLicenseDetail = fetchTrdData?.tradeLicenseDetail;
  const additionalDetail = tradeLicenseDetail?.additionalDetail;

  return (
    <Card border="primary" className="mb-4 shadow-sm card-common">
      <Card.Header className="card-header-common">
        LABOUR REGISTRATION DETAILS
      </Card.Header>
      <Card.Body className="card-body-common">
        <Row>
          <Col>
            <Table striped bordered hover className="styled-table">
              <tbody>
                <tr className="table-row">
                  <th className="table-header">
                    Registration/License Number
                  </th>
                  <td className="table-data">{additionalDetail?.labourLicenseNumber || "N/A"}</td>
                  <th className="table-header">
                    Registration Commencement Date
                  </th>
                  <td className="table-data">{additionalDetail?.labourRegistrationCommencementDate || "N/A"}</td>
                  <th className="table-header">
                    Registration Validity Date
                  </th>
                  <td className="table-data">{additionalDetail?.labourRegistrationValidityDate || "N/A"}</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default RegistrationDetails;