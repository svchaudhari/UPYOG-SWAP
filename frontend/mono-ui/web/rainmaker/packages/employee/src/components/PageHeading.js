import React from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
} from "react-bootstrap";
const PageHeading = ({ headingText }) => {
  return (
    <div className="content-header">
      <Container fluid>
        <Row className="mb-2">
          <Col sm={6}>
            <h1 className="m-0 primary-heading">
              <a href="/backend" className="back-button">
                <i className="fa fa-arrow-left" aria-hidden="true"></i>
              </a>{headingText}
            </h1>
          </Col>
          <Col sm={6}>
            <ol className="breadcrumb float-sm-right">
              <li className="breadcrumb-item">
                <a href="/backend">Home</a>
              </li>
              <li className="breadcrumb-item active">{headingText}</li>
            </ol>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PageHeading;
