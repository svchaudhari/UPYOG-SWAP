import React, { useEffect, useState } from "react";
import { CommonFunctions } from "../../../utils/CommonFunctions";
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from "react-bootstrap";
import { showAlert } from "../../../utils/Alerts";
import { FaDownload, FaTrashAlt, FaFilePdf, FaFile } from 'react-icons/fa';
import './../../assets/dist/css/PreviewApp.css';

const Documents = ({ applicationNo, serviceName }) => {
  const [appDocuments, setAppDocuments] = useState([]);

  const { getServiceDocuments } = CommonFunctions();

  useEffect(() => {
    (async () => {
      let appDocs = await getServiceDocuments(serviceName, applicationNo);
      if (appDocs && appDocs.document) {
        setAppDocuments(appDocs.document);
      } else {
        showAlert("Error", "No Documents found", "error");
      }
    })();
  }, [applicationNo, serviceName]); // Add serviceName to dependencies as well

  return (
    <>
      <Card border="primary" className="mb-4 shadow-sm card-common">
        <CardHeader className="card-header-common card-header">
          Application Documents
        </CardHeader>
        <CardBody>
          <Row>
            <Col xs={12}>
              <div className="">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Sr. No.</th>
                      <th>Document</th>
                      <th>File Name</th>
                      <th>View/Download</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appDocuments.map((document, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{document.documentName}</td>
                        <td>{document.attachment ? document.attachment.name : ""}</td>
                        <td>{document.attachment ? <a href={process.env.REACT_APP_DMS_URL + document.attachment.url} target="_blank" rel="noopener noreferrer"> {(document.documentType=="PDF" ? <FaFilePdf className="file-icon" style={{ color: "red" }} /> : <FaFile className="file-icon" style={{ color: "grey" }} />)} </a> : ""}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </>
  );
};

export default Documents;
