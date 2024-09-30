import React, { useState, useEffect } from "react";
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
import { CommonFunctions } from "../../../../utils/CommonFunctions.js";
import { showAlert } from "../../../../utils/Alerts.js";
import "./../../../assets/plugins/select2/css/select2.min.css";
import "./../../../assets/plugins/select2-bootstrap4-theme/select2-bootstrap4.min.css";
import "../../../assets/plugins/select2/js/select2.full.min.js";
import ToolTip from "../../../Layouts/ToolTip";

const GarbageSpecifications = ({ setFormData, formData, errors }) => {
	const { getCategory } = CommonFunctions();

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({ [name]: value });
	};

	const [garbageCategory, setGarbageCategory] = useState([]);
	const [categories, setCategories] = useState([]);
	const [subcategories, setSubcategories] = useState([]);
	const [subcategoryTypes, setSubcategoryTypes] = useState([]);

	useEffect(() => {
		(async () => {
			const categ = await getCategory("Garbage");
			if (categ?.MdmsRes?.Garbage) {
				setGarbageCategory(categ.MdmsRes.Garbage.Categories);
			}
		})();
	}, []);


	useEffect(() => {
		const uniqueCategories = [...new Set(garbageCategory.map(item => item.categories))];
		setCategories(uniqueCategories);
	}, [garbageCategory]);


	useEffect(() => {
		const selectedSubcategories = garbageCategory
			.filter(item => item.categories === formData.category)
			.map(item => item.subcategories);
		setSubcategories([...new Set(selectedSubcategories)]);
	}, [formData.category, garbageCategory]);



	useEffect(() => {
		const selectedSubcategoryTypes = garbageCategory
			.filter(item => item.subcategories === formData.subCategory)
			.map(item => item.subcategorytype);
		setSubcategoryTypes([...new Set(selectedSubcategoryTypes)]);
	}, [formData.subCategory, garbageCategory]);


	return (
		<Card>
			<CardHeader>
				<Col md={12}>
					<CardTitle>Garbage Specifications</CardTitle>
				</Col>
			</CardHeader>
			<CardBody>
				<Row className="mb-4">
					<Col md={4}>
						<div className="form-group oldGarbageId">
							<Form.Group controlId="oldGarbageId">
								<Form.Label className="control-label">Old Garbage ID</Form.Label>
								<ToolTip toolTipText={"Please enter Your old garbage ID"} />
								<Form.Control
									type="text"
									name="oldGarbageId"
									placeholder="Enter Property ID"
									value={formData.oldGarbageId}
									onChange={handleInputChange}
								/>
								<Form.Control.Feedback type="invalid">
									{errors.oldGarbageId}
								</Form.Control.Feedback>
							</Form.Group>
						</div>
					</Col>
					<Col md={4}>
						<div className="form-group typeOfCollection required">
							<Form.Group controlId="typeOfCollection">
								<Form.Label className="control-label">Type of Collection Unit from Garbage ID.</Form.Label>
								<Form.Select
									value={formData.typeOfCollection}
									className="form-control"
									name="typeOfCollection"
									onChange={handleInputChange}
									isInvalid={!!errors.typeOfCollection}
								>
									<option value="">--Please Select--</option>
									<option value="Single Collection">Single Collection Unit</option>
									<option value="Multi  Collection">Multi  Collection Unit</option>
								</Form.Select>
								<Form.Control.Feedback type="invalid">
									{errors.typeOfCollection}
								</Form.Control.Feedback>
							</Form.Group>
						</div>
					</Col>
				</Row>
				<Row className="mb-4">
					<Col md={4}>
						<div className="form-group category required">
							<Form.Group controlId="category">
								<Form.Label className="control-label">Collection Unit Category</Form.Label>
								<Form.Select
									value={formData.category}
									name="category"
									className="form-control"
									onChange={handleInputChange}
									isInvalid={!!errors.category}
								>
									<option>--Please Select--</option>
									{categories.map((category, index) => (
										<option key={index} value={category}>{category}</option>
									))}
								</Form.Select>
								<Form.Control.Feedback type="invalid">
									{errors.category}
								</Form.Control.Feedback>
							</Form.Group>
						</div>
					</Col>

					<Col md={4}>
						<div className="form-group subCategory required">
							<Form.Group controlId="subCategory">
								<Form.Label className="control-label">Collection Unit Sub Category</Form.Label>
								<Form.Select
									value={formData.subCategory}
									name="subCategory"
									className="form-control select2"
									onChange={handleInputChange}
									isInvalid={!!errors.subCategory}
								>
									<option>--Please Select--</option>
									{subcategories.map((subcategory, index) => (
										<option key={index} value={subcategory}>{subcategory}</option>
									))}
								</Form.Select>
								<Form.Control.Feedback type="invalid">
									{errors.subCategory}
								</Form.Control.Feedback>
							</Form.Group>
						</div>
					</Col>
					<Col md={4}>
						<div className="form-group subCategoryType">
							<Form.Group controlId="subCategoryType">
								<Form.Label className="control-label">Sub Category Type</Form.Label>
								<Form.Select
									value={formData.subCategoryType}
									name="subCategoryType"
									className="form-control select2"
									onChange={handleInputChange}
									isInvalid={!!errors.subCategoryType}
								>
									<option>--Please Select--</option>
									{subcategoryTypes.map((subcategoryType, index) => (
										<option key={index} value={subcategoryType}>{subcategoryType}</option>
									))}
								</Form.Select>
								<Form.Control.Feedback type="invalid">
									{errors.subCategoryType}
								</Form.Control.Feedback>
							</Form.Group>
						</div>
					</Col>
				</Row>
			</CardBody>
		</Card>
	);
};

export default GarbageSpecifications;
