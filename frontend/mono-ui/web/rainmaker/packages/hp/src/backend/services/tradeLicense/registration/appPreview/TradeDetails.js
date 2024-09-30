import PropTypes from 'prop-types';
import React from 'react';
import { Card, Row, Col, Table } from 'react-bootstrap';
import './../../../../assets/dist/css/PreviewApp.css';

const TradeDetails = ({ fetchTrdData = {} }) => {
  const tradeLicenseDetail = fetchTrdData.tradeLicenseDetail || {};
  const additionalDetail = tradeLicenseDetail.additionalDetail || {};

  return (
    <Card border="primary" className="mb-4 shadow-sm card-common">
      <Card.Header className="card-header-common">
        TRADE DETAILS
      </Card.Header>
      <Card.Body className="card-body-common">
        <Row>
          <Col>
            <Table striped bordered hover className="styled-table">
              <tbody>
                <tr className="table-row">
                  <th className="table-header">Business Name</th>
                  <td className="table-data">{fetchTrdData.tradeName || "N/A"}</td>
                  <th className="table-header">Scale of Business</th>
                  <td className="table-data">{additionalDetail.scaleOfBusiness || "N/A"}</td>
                  <th className="table-header">Period of License (in Years)</th>
                  <td className="table-data">{additionalDetail.periodOfLicense || "N/A"}</td>
                </tr>
                <tr className="table-row">
                  <th className="table-header">Map Approved</th>
                  <td className="table-data">{additionalDetail.mapApproved || "N/A"}</td>
                  <th className="table-header">Infrastructure Ownership Type</th>
                  <td className="table-data">{additionalDetail.InfrastructureOwnershipType || "N/A"}</td>
                  <th className="table-header">Property Type</th>
                  <td className="table-data">{additionalDetail.propertyType || "N/A"}</td>
                </tr>
                <tr className="table-row"></tr>
                <tr className="table-row">
                  <th className="table-header">GST Number</th>
                  <td className="table-data">{additionalDetail.gstNumber || "N/A"}</td>
                  <th className="table-header">Business Details</th>
                  <td className="table-data" colSpan={3}>{additionalDetail.businessDetails || "N/A"}</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

TradeDetails.propTypes = {
  fetchTrdData: PropTypes.object
};

export default TradeDetails;