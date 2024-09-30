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

const { getTradeSubCategory, getTradeCategory } = CommonFunctions();

const LicenseSpecifications = ({ setFormData, formData, errors }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ [name]: value });
  };
  const [licenseSubCategory, setLicenseSubCategory] = useState([]);
  const [categories, setCategories ]= useState([]);
  const [licenseCategory, setLicenseCategory] = useState([]);
  const [licenseTrade, setLicenseTrade] = useState([]);
  const $trade = $(".licenseTrade");  
  const $sector= $(".licenseSector");
  
  useEffect(() => {
    const fetchTradeCategory = async () => {
      const response = await getTradeCategory("TradeLicense");
      if (response && response.MdmsRes && response.MdmsRes.TradeLicense) {
        setCategories(response.MdmsRes.TradeLicense.Categories);
        const uniqueSectors = Array.from(
          new Set(response.MdmsRes.TradeLicense.Categories.map((category) => category.sector))
        ).map((sector) => {
          return response.MdmsRes.TradeLicense.Categories.find((category) => category.sector === sector);
        });
        setLicenseCategory(uniqueSectors);
      }
    };

    fetchTradeCategory();
  }, []);

  useEffect(() => {
    if (formData.licenseCategory) {
      const trades = categories.filter(
        (category) => category.sector === formData.licenseCategory
      );
       const uniqueTrades = Array.from(
        new Set(trades.map((trade) => trade.trade))
      ).map((trade) => {
        return trades.find((t) => t.trade === trade);
      });
      setLicenseTrade(uniqueTrades);
      setFormData((prevData) => ({ ...prevData, licenseTrade: "" }));
    } else {
      setLicenseTrade([]);
    }
  }, [formData.licenseCategory, categories]);


  useEffect(() => {
    if (formData.licenseTrade) {
      const subCategories = categories.filter(
        (category) => category.trade === formData.licenseTrade
      );
      const uniqueSubCategories = Array.from(
        new Set(subCategories.map((subCategory) => subCategory.subcategory))
      ).map((subcategory) => {
        return subCategories.find((t) => t.subcategory === subcategory);
      });
      setLicenseSubCategory(uniqueSubCategories);
      setFormData((prevData) => ({ ...prevData, licenseSubCategory: "" }));
    } else {
      setLicenseSubCategory([]);
    }
  }, [formData.licenseTrade, categories, setFormData]);


  return (
    <Card>
      <CardHeader>
        <Col md={12}>
          <CardTitle>License Specifications</CardTitle>
        </Col>
      </CardHeader>
      <CardBody>
        <Row className="mb-4">

        <Col md={3}>
            <div className="form-group licensePeriod required">
              <Form.Group controlId="licensePeriod">
                <Form.Label className="control-label">
                  Period of License (in Years)
                </Form.Label>
                <Form.Select
                  value={formData.licensePeriod}
                  className="form-control"
                  name="licensePeriod"
                  onChange={handleInputChange}
                  isInvalid={!!errors.licensePeriod}
                >
                  <option value="">--Please Select--</option>
                  <option value="1">1</option>
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.licensePeriod}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
          </Col>

          <Col md={3}>
            <div className="form-group licenseCategory required">
              <Form.Group controlId="licenseCategory">
                <Form.Label className="control-label">Sector</Form.Label>
                <Form.Select
                  id="licenseCategory"
                  value={formData.licenseCategory}
                  name="licenseCategory"
                  className="form-control form-select licenseCategory select2 "
                  onChange={handleInputChange}
                  isInvalid={!!errors.licenseCategory}
                >
                  <option value="">--Please Select--</option>
                  {Array.isArray(licenseCategory) &&
                    licenseCategory.length > 0 &&
                    licenseCategory.map((category) => (
                      <option key={category.sector} value={category.sector}>
                        {category.sector}
                      </option>
                    ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.licenseCategory}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
          </Col>

          <Col md={3}>
            <div className="form-group licenseTrade required">
              <Form.Group controlId="licenseTrade">
                <Form.Label className="control-label">Trade</Form.Label>
                <Form.Select
                  name="licenseTrade"
                  value={formData.licenseTrade}
                  className="form-control licenseTrade select2"
                  id="licenseTrade"
                  onChange={handleInputChange}
                  isInvalid={!!errors.licenseTrade}
                >
                  <option value="">--Please Select--</option>
                  {licenseTrade.map((item, index) => (
                    <option key={item.trade} value={item.trade}>
                      {item.trade}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.licenseTrade}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
          </Col>

          <Col md={3}>
            <div className="form-group licenseSubCategory required">
              <Form.Group controlId="licenseSubCategory">
                <Form.Label className="control-label">Sub Category</Form.Label>
                <Form.Select
                  name="licenseSubCategory"
                  value={formData.licenseSubCategory}
                  className="form-control licenseSubCategory select2"
                  id="licenseSubCategory"
                  onChange={handleInputChange}
                  isInvalid={!!errors.licenseSubCategory}
                >
                  <option value="">--Please Select--</option>
                  {licenseSubCategory.map((item, index) => (
                    <option key={item.subcategory} value={item.subcategory}>
                      {item.subcategory}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.licenseSubCategory}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default LicenseSpecifications;
