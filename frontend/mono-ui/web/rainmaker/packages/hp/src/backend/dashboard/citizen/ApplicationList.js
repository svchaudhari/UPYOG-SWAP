import React, { useState } from "react";
import {Card,CardBody,CardHeader,CardTitle,Col,Container,Row} from "react-bootstrap";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useNavigate } from 'react-router-dom';

import "primereact/resources/themes/saga-blue/theme.css"; // or any other theme
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

const ApplicationList = ({ applicationLists }) => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: "contains" },
    applicationNumber: { value: null, matchMode: "contains" },
    tradeName: { value: null, matchMode: "contains" },
    ulbName: { value: null, matchMode: "contains" },
    district: { value: null, matchMode: "contains" },
    status: { value: null, matchMode: "contains" },
    passedDays: { value: null, matchMode: "gte" },
  });

  const onFilter = (e) => {
    const { value, name } = e.target;
    const _filters = { ...filters };
    _filters[name].value = value;

    setFilters(_filters);
  };

  const clearFilter = () => {
    setFilters({
      global: { value: null, matchMode: "contains" },
      applicationNumber: { value: null, matchMode: "contains" },
      tradeName: { value: null, matchMode: "contains" },
      ulbName: { value: null, matchMode: "contains" },
      district: { value: null, matchMode: "contains" },
      status: { value: null, matchMode: "contains" },
      passedDays: { value: null, matchMode: "gte" },
    });
  };
  const serialNumberBodyTemplate = (rowData, { rowIndex }) => {
    return rowIndex + 1;
  };
  const rowClassName = (rowData) => {
    return {
      "table-success": rowData.status === "APPROVED",
      "table-secondary": rowData.status === "INITIATED",
      "table-danger": rowData.status === "REJECTED",
      "table-info":
        rowData.status === "PENDINGFORVERIFICATION" ||
        rowData.status === "PENDINGFORAPPROVAL",
      "table-warning":
        rowData.status === "PENDINGFORPAYMENT" ||
        rowData.status === "PENDINGFORMODIFICATION",
    };
  };

  const statusBodyTemplate = (rowData) => {
    let statusClass = "";
    switch (rowData.status.toLowerCase()) {
      case "approved":
        statusClass = "badge-success";
        break;
      case "rejected":
        statusClass = "badge-danger";
        break;
      case "pendingforpayment":
      case "pendingformodification":
        statusClass = "badge-warning";
        break;
      default:
        statusClass = "";
        break;
    }
    const displayStatus =
      statusMapping[rowData.status.toLowerCase()] || rowData.status;
    return <span className={`badge ${statusClass}`}>{displayStatus}</span>;
    s;
  };
  const statusMapping = {
    INITIATED: "Initiated",
    pendingforverification: "SUBMITTED",
    pendingforapproval: "SUBMITTED",
    approved: "Approved",
    rejected: "Rejected",
    pendingforpayment: "Payment Due",
    pendingformodification: "Reverted Back",
    PENDINGFORAPPROVAL: "SUBMITTED"
    // Add any other statuses and their display names here
  };
  const viewAppBtn= (rowData) =>{
    return <Button
      icon="pi pi-eye"
      className="p-button-rounded p-button-info p-mr-2"
      onClick={() => viewApplication(rowData.applicationNumber)}
    />
  }
  const renewAppBtn= (rowData) =>{
    if(rowData.status.toLowerCase()==="approved"){
      return <Button
      icon="pi pi-refresh"
      className="p-button-rounded p-button-danger p-mr-2"
      title="Renew Application"
      onClick={() => renewApplication(rowData.applicationNumber,rowData.tradeLicenseDetail.address.additionalDetail.ulbName)}
    />
    }
  }
  const modifyAppBtn= (rowData) =>{
    if(rowData.status.toLowerCase()==="approved"){
      return <Button
      icon="pi pi-pencil"
      className="p-button-rounded p-button-warning p-mr-2"
      title="Modify Application"
      onClick={() => editApplication(rowData.applicationNumber,rowData.tradeLicenseDetail.address.additionalDetail.ulbName)}
    />
    }
  }
  const closeAppBtn=(rowData) =>{
    if(rowData.status.toLowerCase()==="approved"){
      return  <Button
      icon="pi pi-times"
      className="p-button-rounded p-button-danger p-mr-2"
      title="Close Application"
      onClick={() => closeApplication(rowData.applicationNumber,rowData.tradeLicenseDetail.address.additionalDetail.ulbName)}
    />
    }
  }
  const initiatePaymentBtn = (rowData) => {
    if(rowData.status.toLowerCase()==="pendingforpayment"){
      return  <Button
      icon="pi pi-indian-rupee"
      className="p-button-rounded p-button-warning p-mr-2"
      title="Pay application fee"
      label="Pay"
      onClick={() => initiatePayment(rowData.applicationNumber, rowData.businessService ,rowData.id)}
    />
    }
  }
  const downloadCertBtn = (rowData) =>{
    if(rowData.status.toLowerCase()==="approved"){
      return  <Button
      icon="pi pi-download"
      className="p-button-rounded p-button-danger p-mr-2"
      title="Download Certificate"
      onClick={() => closeApplication(rowData.applicationNumber,rowData.tradeLicenseDetail.address.additionalDetail.ulbName)}
    />
    }
  }
  const actionTemplate = (rowData) => {
    // Define the buttons based on the status
    let buttons = null;

    switch (rowData.status.toLowerCase()) {
      case "rejected":
        buttons = (
          <div style={{ display: "flex", gap: "10px" }}>
            <Button
              icon="pi pi-eye"
              className="p-button-rounded p-button-info p-mr-2"
              onClick={() => viewApplication(rowData.applicationNumber)}
            />
          </div>
        );
        break;
        case "pendingformodification":
        case "initiated":
        buttons = (
          <div style={{ display: "flex", gap: "10px" }}>
           <Button
              icon="pi pi-pencil"
              className="p-button-rounded p-button-warning p-mr-2"
              onClick={() => editApplication(rowData.applicationNumber,rowData.tradeLicenseDetail.address.additionalDetail.ulbName)}
            />
          </div>
        );
      break;
      case "pendingforverification":
      case "pendingforapprovals":
        buttons = (
          <div style={{ display: "flex", gap: "10px" }}>
           <Button
              icon="pi pi-eye"
              title="View Timelines"
              className="p-button-rounded p-button-primary p-mr-2"
              onClick={() => viewApplication(rowData.applicationNumber)}
            />
            <Button
              icon="pi pi-print"
              title="Print your application"
              className="p-button-rounded p-button-secondary p-mr-2"
              onClick={() => printApplication(rowData.applicationNumber)}
            />
          </div>
        );
      break;
      default:
        buttons = (
          <div style={{ display: "flex", gap: "10px" }}>
            <Button
              icon="pi pi-eye"
              className="p-button-rounded p-button-info p-mr-2"
              onClick={() => viewApplication(rowData.applicationNumber)}
            />
          </div>
        );
        break;
    }

    return buttons;
  };

  const viewApplication = (rowData) => {
    // Implement view logic here
    console.log("Viewing application", rowData);
  };

  const editApplication = (appNo, ULBName) => {
    // Implement edit logic here
    navigate(`/backend/new-trade-registration?application=${btoa(appNo)}&ulb=${btoa(ULBName)}`);
   
  };

  const renewApplication = (appNo, ULBName) => {
    navigate(`/backend/trade-license-renewal?application=${btoa(appNo)}&ulb=${btoa(ULBName)}`);

  }
  const closeApplication = (appNo, ULBName) => {
    navigate(`/backend/trade-license-closure?application=${btoa(appNo)}&ulb=${btoa(ULBName)}`);

  }
  const initiatePayment = (applicationNo, serviceName, id) => {
    // Implement delete logic here
    navigate(`/backend/citizen-payments?application=${btoa(applicationNo)}&service=${btoa(serviceName)}&id=${btoa(id)}`);
  };
   

  return (
    <div className="content">
      <Container fluid>
        <Card className="card card-default color-palette-box">
          <CardHeader>
            <CardTitle> Applications</CardTitle>
          </CardHeader>
          <CardBody>
            <DataTable
              value={applicationLists}
              paginator
              rows={10}
              filters={filters}
              globalFilterFields={["applicationNumber", "tradeName", "status"]}
              rowClassName={rowClassName}
              emptyMessage="No applications found."
              key="datatable"
            >
              <Column
                header="Sr. No."
                body={serialNumberBodyTemplate}
                style={{ width: "4%" }}
              />
              <Column
                field="applicationNumber"
                header="Application ID"
                filter
                filterField="applicationNumber"
                filterElement={
                  <InputText
                    name="applicationNumber"
                    value={filters.applicationNumber.value}
                    onChange={onFilter}
                  />
                }
              />
              <Column
                field="tradeName"
                header="Name"
                filter
                filterField="tradeName"
                filterElement={
                  <InputText
                    name="tradeName"
                    value={filters.tradeName.value}
                    onChange={onFilter}
                  />
                }
              />
              <Column
                field="tradeLicenseDetail.address.additionalDetail.ulbName"
                header="ULB Name"
                filter
                filterField="ulbName"
                filterElement={
                  <InputText
                    name="ulbName"
                    value={filters.ulbName.value}
                    onChange={onFilter}
                  />
                }
              />
              <Column
                field="status"
                header="Status"
                body={statusBodyTemplate}
                filter
                filterField="status"
                filterElement={
                  <InputText
                    name="status"
                    value={filters.status.value}
                    onChange={onFilter}
                  />
                }
              />
              <Column field="passedDays" header="Days" sortable />
              
              <Column
                field="view"
                header="Action"
                body={actionTemplate}
              />
              <Column
                field="Payment"
                header="Payment"
                body={initiatePaymentBtn}
              />
              <Column
                field="Renew"
                header="Renew"
                body={renewAppBtn}
              />
              <Column
                field="Modify"
                header="Modify"
                body={modifyAppBtn}
              />
              <Column
                field="Close"
                header="Close"
                body={closeAppBtn}
              />
              <Column
                field="DownloadCertificate"
                header="Download Certificate"
                body={downloadCertBtn}
              />
            



              {/* <Column field="Action" header=" " body={actionTemplate} /> */}

            </DataTable>
          </CardBody>
        </Card>
      </Container>
    </div>
  );
};

export default ApplicationList;
