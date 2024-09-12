import React, { useState } from "react";
import {
	Card,
	CardBody,
	CardHeader,
	CardTitle,
	Col,
	Container,
	Row,
} from "react-bootstrap";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import "primereact/resources/themes/saga-blue/theme.css"; // or any other theme
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { useNavigate } from 'react-router-dom';

const ApplicationList = ({ applicationLists }) => {
	const navigate = useNavigate();
	const [filters, setFilters] = useState({
		global: { value: null, matchMode: "contains" },
		applicationNo: { value: null, matchMode: "contains" },
		category: { value: null, matchMode: "contains" },
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
			applicationNo: { value: null, matchMode: "contains" },
			category: { value: null, matchMode: "contains" },
			ulbName: { value: null, matchMode: "contains" },
			district: { value: null, matchMode: "contains" },
			status: { value: null, matchMode: "contains" },
			passedDays: { value: null, matchMode: "gte" },
		});
	};
	const serialNumberBodyTemplate = (rowData, { rowIndex }) => {
		return rowIndex + 1;
	};

	const ulbNameBodyTemplate = (rowData) => {
		return rowData.addresses[0].ulbName;
	};

	const categoryBodyTemplate = (rowData) => {
		return rowData.grbgCollectionUnits[0].category;
	};

	const districtNameBodyTemplate = (rowData) => {
		return rowData.addresses[0].additionalDetail ? rowData.addresses[0].additionalDetail.district : '';
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
		approved: "Approved",
		rejected: "Rejected",
		pendingforpayment: "Payment Due",
		pendingformodification: "Reverted Back",
		// Add any other statuses and their display names here
	};

	const actionTemplate = (rowData) => {
		// Define the buttons based on the status
		let buttons = null;
		rowData.businessService = "GarbageCollection";
		switch (rowData.status.toLowerCase()) {
			case "approved":
				buttons = (
					<div style={{ display: "flex", gap: "10px" }}>
						<Button
							icon="pi pi-eye"
							className="p-button-rounded p-button-info p-mr-2"
							onClick={() => actionTaken(rowData.grbgApplication.applicationNo, rowData.businessService, rowData.id, 'view')}
						/>
						<Button
							icon="pi pi-download"
							className="p-button-rounded p-button-info"
							onClick={() => actionTaken(rowData.grbgApplication.applicationNo, rowData.businessService, rowData.id, 'certificateDownload')}
						/>
					</div>
				);
				break;
			case "rejected":
				buttons = (
					<div style={{ display: "flex", gap: "10px" }}>
						<Button
							icon="pi pi-eye"
							className="p-button-rounded p-button-info p-mr-2"
							onClick={() => actionTaken(rowData.grbgApplication.applicationNo, rowData.businessService, rowData.id, 'view')}
						/>
					</div>
				);
				break;
			case "pendingforpayment":
			case "pendingformodification":
			case "initiated":
				buttons = (
					<div style={{ display: "flex", gap: "10px" }}>
						<Button
							icon="pi pi-pencil"
							className="p-button-rounded p-button-warning p-mr-2"
							onClick={() => actionTaken(rowData.grbgApplication.applicationNo, rowData.businessService, rowData.id, 'payment')}
						/>
					</div>
				);
				break;
			case "pendingforverification":
				buttons = (
					<div style={{ display: "flex", gap: "10px" }}>
						<Button
							icon="pi pi-eye"
							title="View Timelines"
							className="p-button-rounded p-button-primary p-mr-2"
							onClick={() => actionTaken(rowData.grbgApplication.applicationNo, rowData.businessService, rowData.id, 'view')}
						/>
						<Button
							icon="pi pi-print"
							title="Print your application"
							className="p-button-rounded p-button-secondary p-mr-2"
							onClick={() => actionTaken(rowData.grbgApplication.applicationNo, rowData.businessService, rowData.id, 'print')}
						/>
					</div>
				);
				break;
			case "pendingforapproval":
				buttons = (
					<div style={{ display: "flex", gap: "10px" }}>
						<Button
							icon="pi pi-eye"
							title="View Timelines"
							className="p-button-rounded p-button-primary p-mr-2"
							onClick={() => actionTaken(rowData.grbgApplication.applicationNo, rowData.businessService, rowData.id, 'view')}
						/>
						<Button
							icon="pi pi-print"
							title="Print your application"
							className="p-button-rounded p-button-secondary p-mr-2"
							onClick={() => actionTaken(rowData.grbgApplication.applicationNo, rowData.businessService, rowData.id, 'print')}
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
							onClick={() => viewApplication(rowData.grbgApplication.applicationNo, rowData.businessService, rowData.id, 'view')}
						/>
					</div>
				);
				break;
		}

		return buttons;
	};

	const actionTaken = (applicationNo, businessService, id, action) => {
		let uri = '';
		switch (action) {
			case 'view':
				uri = `/backend/employee/view-application?application=${btoa(applicationNo)}&id=${btoa(id)}&service=${btoa(businessService)}`;
				break;

			default:
				break;
		}
		navigate(uri);
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
							globalFilterFields={["applicationNo", "category", "status"]}
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
								field="grbgApplication.applicationNo"
								header="Application ID"
								filter
								filterField="applicationNo"
								filterElement={
									<InputText
										name="applicationNo"
										value={filters.applicationNo.value}
										onChange={onFilter}
									/>
								}
							/>
							<Column
								field="grbgCollectionUnits.category"
								header="Category"
								body={categoryBodyTemplate}
								filter
								filterField="category"
								filterElement={
									<InputText
										name="category"
										value={filters.category.value}
										onChange={onFilter}
									/>
								}
							/>
							<Column
								field="addresses[0].ulbName"
								header="ULB Name"
								body={ulbNameBodyTemplate}
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
								field=""
								header="District"
								body={districtNameBodyTemplate}
								filter
								filterField="district"
								filterElement={
									<InputText
										name="district"
										value={filters.district.value}
										onChange={onFilter}
									/>
								}
							/>
							<Column
								field="status"
								header="Status"
								body={statusBodyTemplate}

							/>
							<Column field="passedDays" header="Days" sortable />
							<Column field="passedDays" header=" " body={actionTemplate} />
						</DataTable>
					</CardBody>
				</Card>
			</Container>
		</div>
	);
};

export default ApplicationList;
