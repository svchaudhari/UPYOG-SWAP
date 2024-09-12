import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { FaDownload, FaTrashAlt, FaFilePdf, FaFile } from "react-icons/fa";
import { APICall } from "../../../utils/api";
import { saveAs } from "file-saver";
import { CommonFunctions } from "../../../utils/CommonFunctions";
import PageHeading from "../../../components/PageHeading";
import StepProgress from "../../../components/StepProgress";
import { showAlert } from "../../../utils/Alerts";
const DocumentUpload = ({ onBack, onNext, module }) => {
  const [activeStep, setActiveStep] = useState(2);
  const [uploadStatus, setUploadStatus] = useState({});
  const [documentsConfig, setDocumentsConfig] = useState([]);
  const [files, setFiles] = useState([]);
  const fileInputs = useRef([]);
  const { getServiceDocuments } = CommonFunctions();

  useEffect(() => {
    (async () => {
      const applicationNo = localStorage.getItem("ID");
      let appDocs = await getServiceDocuments(module, applicationNo);
      if (appDocs && appDocs.document) {
        setDocumentsConfig(appDocs.document);
        console.log(appDocs.document); 
        setFiles(
          appDocs.document.map((doc) =>
            doc.attachment
              ? {
                  file: new File([], doc.attachment.name),
                  fileName: doc.attachment.name,
                  fileSize: "",
                  isPdf: doc.attachment.name.endsWith(".pdf"),
                }
              : null
          )
        );
      } else {
        showAlert("Error", "No Documents found", "error");
      }
      console.log(files);

    })();
  }, [module]);

  const validateFile = (file, allowedTypes, maxSize) => {
    const fileType = file.type;
    const fileSize = file.size;

    if (!allowedTypes.includes(fileType)) {
      return `File must be one of the following types: ${allowedTypes.join(", ")}.`;
    }

    if (fileSize > maxSize) {
      return `File size must be less than ${(maxSize / (1024 * 1024)).toFixed(
        2
      )} MB.`;
    }

    return null;
  };

  const uploadFile = async (file, uploadType, documentId) => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", JSON.parse(localStorage.getItem("userInfo")).id);
    formData.append("objectId", localStorage.getItem("ID") || "");
    formData.append("description", "trd-registeration");
    formData.append("id", "");
    formData.append("type", file.type);
    formData.append("objectName", localStorage.getItem("module"));
    formData.append("comments", "comments text here...");
    formData.append("status", "PENDING");
    formData.append("uploadType", uploadType);
    formData.append("documentId", documentId);

    try {
      const response = await APICall(
        `${process.env.REACT_APP_DMS_URL}/dms/uploadAttachments`,
        "POST",
        formData
      );
      if (response.status && response.status === "SUCCESS") {
        setUploadStatus((prevState) => ({
          ...prevState,
          [uploadType]: "File uploaded successfully!",
        }));
      }
    } catch (error) {
      console.error(`Error uploading ${uploadType} file:`, error);
      setUploadStatus((prevState) => ({
        ...prevState,
        [uploadType]: "Error uploading file.",
      }));
    }
  };

  const handleFileChange = (index, fileTypeKey, documentId) => async (e) => {
    const file = e.target.files[0];
    if (!file) {
      setUploadStatus((prevState) => ({
        ...prevState,
        [fileTypeKey]: "Please select a file first.",
      }));
      return;
    }

    const error = validateFile(
      file,
      ["application/pdf", "image/jpeg", "image/png"],
      2 * 1024 * 1024
    );
    if (error) {
      setUploadStatus((prevState) => ({
        ...prevState,
        [fileTypeKey]: error,
      }));
      return;
    }

    const fileInfo = {
      file,
      fileName: file.name,
      fileSize: (file.size / (1024 * 1024)).toFixed(2) + " MB",
      isPdf: file.type === "application/pdf",
    };

    setFiles((prevFiles) => {
      const newFiles = [...prevFiles];
      newFiles[index] = fileInfo;
      return newFiles;
    });

    setUploadStatus((prevState) => ({
      ...prevState,
      [fileTypeKey]: "File selected successfully!",
    }));

    await uploadFile(file, fileTypeKey, documentId);
  };

  const saveFile = (fileInfo) => {
    if (fileInfo && fileInfo.file) {
      saveAs(fileInfo.file, fileInfo.file.name);
    }
  };

  const deleteFile = (index, fileTypeKey, event) => {
    event.stopPropagation();
    setFiles((prevFiles) => {
      const newFiles = [...prevFiles];
      newFiles[index] = null;
      return newFiles;
    });
    setUploadStatus((prevState) => ({
      ...prevState,
      [fileTypeKey]: "",
    }));
    if (fileInputs.current[index]) {
      fileInputs.current[index].value = "";
    }
  };

  const stopPropagation = (event) => {
    event.stopPropagation();
  };

  const handleNextClick = () => {
    let hasError = false;
    let newUploadStatus = {};

    documentsConfig.forEach((doc, index) => {
      console.log(files);
      console.log(doc.required);
      if (doc.required && (!files[index] || !files[index].file)) {
        newUploadStatus[doc.id] = `Please upload ${doc.documentName}.`;
        hasError = true;
      }
    });

    if (hasError) {
      setUploadStatus(newUploadStatus);
      return;
    }
    setActiveStep((prev) => Math.min(prev + 1, 4));
    if (onNext) {
      onNext();
    }
  };

  return (
    <div className="content-wrapper">
      <Container fluid>
        <PageHeading headingText="Upload Documents"></PageHeading>
        <div className="container-div">
          <StepProgress activeStep={activeStep} />
        </div>

        <div className="container-div">
          <Row className="upload-row">
            {documentsConfig.map((doc, index) => (
              <Col md={4} key={index}>
                <div className="upload-label">
                  {doc.documentName}
                  {doc.required && <span className="text-red"> *</span>}
                </div>
                <Card
                  className="upload-card"
                  onClick={() => fileInputs.current[index]?.click()}
                >
                  <Card.Body className="d-flex justify-content-between align-items-center">
                    <Form.Control
                      type="file"
                      ref={(el) => (fileInputs.current[index] = el)}
                      onChange={handleFileChange(index, doc.id, doc.id)}
                      style={{ display: "none" }}
                    />
                    <div
                      className="d-flex align-items-center"
                      style={{ width: "100%" }}
                    >
                      <div
                        className="d-flex align-items-center"
                        style={{ flex: 1 }}
                      >
                        {files[index]?.isPdf ? (
                          <FaFilePdf
                            className="file-icon"
                            style={{ color: "red" }}
                          />
                        ) : (
                          <FaFile
                            className="file-icon"
                            style={{ color: "grey" }}
                          />
                        )}
                        <div>
                          <span className="file-name" style={{ color: "blue" }}>
                            {files[index]?.fileName || "No file selected"}
                          </span>
                          <br />
                          <span className="file-size">
                            {files[index]?.fileSize}
                          </span>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-end">
                        <FaDownload
                          className="action-icon"
                          onClick={(event) => {
                            stopPropagation(event);
                            saveFile(files[index]);
                          }}
                        />
                        <FaTrashAlt
                          className="action-icon text-red"
                          onClick={(event) =>
                            deleteFile(index, doc.id, event)
                          }
                        />
                      </div>
                    </div>
                  </Card.Body>
                </Card>
                {uploadStatus[doc.id] && (
                  <div
                    className="upload-status"
                    style={{
                      color:
                        uploadStatus[doc.id] ===
                          "File selected successfully!" ||
                        uploadStatus[doc.id] ===
                          "File uploaded successfully!"
                          ? "green"
                          : "red",
                    }}
                  >
                    {uploadStatus[doc.id]}
                  </div>
                )}
              </Col>
            ))}
          </Row>
          <Row className="justify-content-end">
            <Col xs="auto" style={{ paddingRight: "1rem" }}>
              <Button
                variant="light"
                style={{
                  marginRight: "15px",
                  borderColor: "#49627E",
                  width: "115px",
                }}
                onClick={onBack}
              >
                Back
              </Button>
              <Button
                style={{
                  backgroundColor: "#49627E",
                  borderColor: "#49627E",
                  width: "115px",
                }}
                onClick={handleNextClick}
              >
                Next
              </Button>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default DocumentUpload;
