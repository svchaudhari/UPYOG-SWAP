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
import { CommonFunctions } from "./../../../../utils/CommonFunctions";
import { showAlert } from "./../../../../utils/Alerts";
import "./../../../assets/plugins/select2/css/select2.min.css";
import "./../../../assets/plugins/select2-bootstrap4-theme/select2-bootstrap4.min.css";
import "./../../../assets/plugins/select2/js/select2.full.min.js";

const TradeLocationDetails = ({ setFormData, formData, errors }) => {
  const { getAllDistricts, getAllULBsFromDistrict, getAllWardsFromULBS } =
    CommonFunctions();

  const [districts, setDistricts] = useState([]);
  const [ulbs, setUlbs] = useState([]);
  const [wards, setWards] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ [name]: value });
  };

  useEffect(() => {
    (async () => {
      const distt = await getAllDistricts();
      if (distt?.MdmsRes?.District) {
        setDistricts(distt.MdmsRes.District.District);
      }
    })();

    // Initialize Select2
    const $districtSelect = $("#tradeLicenseDistrict");
    const $ulbSelect = $("#tradeLicenseUlb");
    const $wardSelect = $("#tradeLicenseWards");

    $districtSelect.select2();
    // Add event listener for district selection
    $districtSelect.on("change", function () {
      $("#tradeLicenseUlb").val("");
      if ($ulbSelect.data("select2")) {
        $ulbSelect.select2("destroy");
      }
      setUlbs([]);
      const selectedDistrict = $(this).val();

      // add formDate from Select2 value
      setFormData({ ["districtName"]: selectedDistrict });

      if (selectedDistrict) {
        getAllULBsFromDistrict(selectedDistrict).then((ulbs) => {
          if (ulbs && ulbs.MdmsRes[selectedDistrict]) {
            setUlbs(ulbs.MdmsRes[selectedDistrict].ULBS);
            $ulbSelect.select2();
          } else {
            //set alerts
            $("#tradeLicenseUlb").val("");
            if ($ulbSelect.data("select2")) {
              $ulbSelect.select2("destroy");
            }
            showAlert(
              "Warning",
              "No ULB found with respect to " +
                selectedDistrict +
                " .Please refresh your page",
              "warning"
            );
          }
        });
      }
    });

    // Add Event Listener for ULB selection

    $ulbSelect.on("change", function () {
      setWards([]);
      $("#tradeLicenseWards").val([]);
      const selectedUlb = $(this).val();

      // add formDate from Select2 value
      setFormData({ ["ulbName"]: selectedUlb });

      if (selectedUlb) {
        const ulbType = $(this).find(":selected").data("type-ulb");
        $("#ulbType").val(ulbType);
        setFormData({ ["ulbType"]: ulbType });
        getAllWardsFromULBS(selectedUlb).then((wards) => {
          // console.log(wards);
          if (wards && wards.MdmsRes.wards) {
            setWards(wards.MdmsRes.wards.wards);
            $wardSelect.select2();
          } else {
            //set alerts
            showAlert(
              "Warning",
              "No Ward found with respect to " +
                selectedUlb +
                " .Please refresh your page",
              "warning"
            );
          }
        });
      }
    });

    $wardSelect.on("change", function () {
      setFormData({ ["wardNumber"]: $(this).val()});
    })

    // Clean up on unmount
    return () => {
      if ($districtSelect.data("select2")) {
        $districtSelect.select2("destroy");
      }
      if ($ulbSelect.data("select2")) {
        $ulbSelect.select2("destroy");
      }
      if ($wardSelect.data("select2")) {
        $wardSelect.select2("destroy");
      }
    };
  }, []);

  return (
    <Card>
      <CardHeader>
        <Col md={12}>
          <CardTitle>Trade Location Details</CardTitle>
        </Col>
      </CardHeader>
      <CardBody>
        <Row className="mb-4">
          <Col md={3}>
            <div className="form-group propertyId">
              <Form.Group controlId="propertyId">
                <Form.Label className="control-label">Property ID</Form.Label>
                <Form.Control
                  type="text"
                  name="propertyId"
                  placeholder="Enter Property ID"
                  value={formData.propertyId}
                  onChange={handleInputChange}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.propertyId}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
          </Col>
          <Col md={3}>
            <div className="form-group propertyOwnerName required">
              <Form.Group controlId="propertyOwnerName">
                <Form.Label className="control-label">Property Owner Name</Form.Label>
                <Form.Control
                  type="text"
                  name="propertyOwnerName"
                  placeholder="Property Owner Name"
                  value={formData.propertyOwnerName}
                  onChange={handleInputChange}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.propertyOwnerName}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
          </Col>
          <Col md={3}>
            <div className="form-group propertyAddress required">
              <Form.Group controlId="propertyAddress">
                <Form.Label className="control-label">Address</Form.Label>
                <Form.Control
                  type="text"
                  name="propertyAddress"
                  placeholder="Enter Address"
                  value={formData.propertyAddress}
                  onChange={handleInputChange}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.propertyAddress}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
          </Col>

          <Col md={3}>
            <div className="form-group districtName required">
              <Form.Group controlId="districtName">
                <Form.Label className="control-label">District</Form.Label>
                <Form.Select
                  id="tradeLicenseDistrict"
                  value={formData.districtName}
                  name="districtName"
                  className="form-control select2"
                  onChange={handleInputChange}
                  isInvalid={!!errors.districtName}
                >
                  <option>--Please Select--</option>
                  {districts.map((district, index) => (
                    <option key={index} value={district.name}>
                      {district.name}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.districtName}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
          </Col>
         
        </Row>
        <Row className="mb-4">
        <Col md={3}>
            <div className="form-group ulbName required">
              <Form.Group controlId="ulbName">
                <Form.Label className="control-label">ULB Name</Form.Label>
                <Form.Select
                  value={formData.ulbName}
                  name="ulbName"
                  id="tradeLicenseUlb"
                  className="form-control select2"
                  onChange={handleInputChange}
                  isInvalid={!!errors.ulbName}
                >
                  <option>--Please Select--</option>
                  {ulbs.map((ulb, index) => (
                    <option
                      data-type-ulb={ulb.type}
                      key={ulb.type}
                      value={ulb.name}
                    >
                      {ulb.name + " (" + ulb.type + ")"}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.ulbName}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
          </Col>
          <Col md={3}>
            <div className="form-group ulbType required">
              <Form.Group controlId="ulbType">
                <Form.Label className="control-label">ULB Type</Form.Label>
                <Form.Control
                  type="text"
                  name="ulbType"
                  id="ulbType"
                  placeholder="ULB Type"
                  value={formData.ulbType}
                  onChange={handleInputChange}
                  readOnly="readonly"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.ulbType}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
          </Col>
          <Col md={3}>
            <div className="form-group wardNumber required">
              <Form.Group controlId="wardNumber">
                <Form.Label className="control-label">Ward Name</Form.Label>
                <Form.Select
                  value={formData.wardNumber}
                  name="wardNumber"
                  id="tradeLicenseWards"
                  className="form-control select2"
                  onChange={handleInputChange}
                  isInvalid={!!errors.wardNumber}
                >
                  <option>--Please Select--</option>
                  {wards.map((ward, index) => (
                    <option key={index} value={ward.code}>
                      {ward.name}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.wardNumber}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
          </Col>
          <Col md={3}>
            <div className="form-group propertyPinCode required">
              <Form.Group controlId="propertyPinCode">
                <Form.Label className="control-label">Pin Code</Form.Label>
                <Form.Control
                  type="text"
                  name="propertyPinCode"
                  placeholder="Enter Pin Code"
                  value={formData.propertyPinCode}
                  onChange={handleInputChange}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.propertyPinCode}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};
export default TradeLocationDetails;
