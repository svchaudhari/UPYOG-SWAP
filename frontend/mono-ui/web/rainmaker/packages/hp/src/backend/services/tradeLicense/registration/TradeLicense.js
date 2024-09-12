import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
} from "react-bootstrap";
import StepProgress from "./../../../../components/StepProgress";
import PageHeading from "../../../../components/PageHeading";
import RegistrationDetails from "./RegistrationDetails";
import TradeDetails from "./TradeDetails";
import LicenseSpecifications from "./LicenseSpecifications";
import TradeLocationDetails from "./TradeLocationDetails";
import TradeOwnerDetails from "./TradeOwnerDetails";
import ApplicantDetails from "./ApplicantDetails";
import { showAlert } from "./../../../../utils/Alerts";
import { TradeLicenseSubmission } from './TradeLicenseSubmission';

const TradeLicense = ({ onBack, onNext, tLData }) => {
  const [activeStep, setActiveStep] = useState(1);
  const [formData, setFormData] = useState(null); // Initialize as null
  const [loading, setLoading] = useState(true);
  const [applicationID, setApplicationID] = useState(tLData?.id || "");
  const [applicationNo, setApplicationNo] = useState(tLData?.applicationNumber || "");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newFormData = {
          id : tLData?.id || "",
          applicationNumber : tLData?.applicationNumber || "",
          registrationDetails: {
            registrationLicenseNumber: tLData?.tradeLicenseDetail?.additionalDetail.labourLicenseNumber || "",
            registrationCommencementDate:  tLData?.tradeLicenseDetail?.additionalDetail.labourRegistrationCommencementDate || "",
            registrationValidityDate:  tLData?.tradeLicenseDetail?.additionalDetail.labourRegistrationValidityDate || "",
          },
          tradeDetails: {
            businessName: tLData?.tradeName || "",
            gstNumber: tLData?.tradeLicenseDetail?.additionalDetail.gstNumber || "",
            scaleOfBusiness:tLData?.tradeLicenseDetail?.additionalDetail.scaleOfBusiness || "",
            tradeIndustryType:tLData?.tradeLicenseDetail?.tradeUnits[0].tradeType || "",
            mapApproved: tLData?.tradeLicenseDetail?.additionalDetail.mapApproved || "",
            infraStrOwnType: tLData?.tradeLicenseDetail?.additionalDetail.InfrastructureOwnershipType || "",
            propertyType: tLData?.tradeLicenseDetail?.additionalDetail.propertyType || "",
            businessDetails: tLData?.tradeLicenseDetail?.additionalDetail.businessDetails || "",
          },
          tradeSpecifications: {
            licensePeriod: tLData?.tradeLicenseDetail?.additionalDetail.periodOfLicense || "",
            licenseTrade :  tLData?.tradeLicenseDetail?.additionalDetail.licenseTrade || "",
            licenseCategory:tLData?.tradeLicenseDetail?.additionalDetail.tradeCategory || "",
            licenseSubCategory: tLData?.tradeLicenseDetail?.additionalDetail.tradeSubType || "",
          },
          tradeLocationDetails: {
            propertyId: tLData?.propertyId || "",
            propertyOwnerName: tLData?.tradeLicenseDetail?.additionalDetail.propertyOwner || "",
            propertyAddress: tLData?.tradeLicenseDetail?.address.addressLine1 || "",
            districtName: tLData?.tradeLicenseDetail?.address.additionalDetail?.district || "",
            ulbName: tLData?.tradeLicenseDetail?.address?.additionalDetail.ulbName || "",
            ulbType: tLData?.tradeLicenseDetail?.address?.additionalDetail.ulbType || "",
            wardNumber: tLData?.tradeLicenseDetail?.address?.additionalDetail.wardNumber || "",
            propertyPinCode: tLData?.tradeLicenseDetail?.address.pincode || "",
          },
          tradeOwnerDetails: {
            tradeOwnerName: tLData?.tradeLicenseDetail?.owners[0]?.name || "",
            tradeOwnerFatherName: tLData?.tradeLicenseDetail?.owners[0]?.fatherOrHusbandName || "",
            tradeOwnerGender: tLData?.tradeLicenseDetail?.owners[0]?.gender || "",
            tradeOwnerMobileNumber:tLData?.tradeLicenseDetail?.owners[0]?.mobileNumber || "",
            tradeOwnerEmailAddress: tLData?.tradeLicenseDetail?.owners[0]?.emailId || "",
          },
          applicantDetails: {
            applicantName: localStorage.getItem("user"),
            applicantMobileNumber: JSON.parse(localStorage.getItem("userInfo")).mobileNumber,
            applicantEmailAddress: JSON.parse(localStorage.getItem("userInfo")).emailId,
          },
        };

        setFormData(newFormData);
        // setFormData({id:tLData?.id || ""});
        // setFormData({applicationNumber :tLData?.applicationNumber || ""});
        setLoading(false);
      } catch (error) {
        console.error("Error fetching trade license data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, [tLData]); // Added dependency on tLData

  let requiredFields = [
    "registrationLicenseNumber", "registrationCommencementDate", "registrationValidityDate", "businessName",
    "scaleOfBusiness", "licensePeriod", "mapApproved", "infraStrOwnType", "propertyType", "businessDetails",
    "tradeIndustryType", "licenseCategory", "licenseSubCategory", "propertyOwnerName", "propertyAddress",
    "districtName", "ulbName", "ulbType", "wardNumber", "propertyPinCode", "tradeOwnerName", "tradeOwnerFatherName",
    "tradeOwnerGender", "tradeOwnerMobileNumber", "tradeOwnerEmailAddress"
  ];

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let formErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      Object.entries(requiredFields).forEach(([index, fieldName]) => {
        if (formData[key]?.[fieldName] !== undefined && !formData[key][fieldName]) {
          formErrors[fieldName] = `This field is required.`;
        }
      });
    });
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleNextClick = async () => {
    if (!validateForm()) {
      showAlert(
        "Error",
        "Please resolve highlighted errors",
        "error"
      );
      return;
    }
    const { submitTradeApplication } = TradeLicenseSubmission();
    const response = await submitTradeApplication(formData);
    if (response.ResponseInfo.status && response.ResponseInfo.status === "successful") {
      showAlert(
        "Success",
        "Data has been saved successfully!",
        "success"
      );
    } else {
      showAlert(
        "Error",
        "Something went wrong. Please try again.",
        "error"
      );
    }
    console.log(response.Licenses[0]);
    localStorage.setItem("ID", response.Licenses[0].id);
    localStorage.setItem("applicationNumber", response.Licenses[0].applicationNumber);
    localStorage.setItem("businessService", response.Licenses[0].businessService);
    localStorage.setItem("module", "TL");
    localStorage.setItem("ULB", formData.tradeLocationDetails.ulbName);
    onNext();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="content-wrapper">
      <Container fluid>
        <PageHeading headingText="New Trade Registration"></PageHeading>
        <div className="container-div">
          <StepProgress activeStep={activeStep} stepName={'TradeDetails'} />
        </div>
        <div className="container-div">
          <Form>
            <RegistrationDetails
              setFormData={(data) =>
                setFormData((prev) => ({
                  ...prev,
                  registrationDetails: {
                    ...prev.registrationDetails,
                    ...data,
                  },
                }))
              }
              formData={formData.registrationDetails}
              errors={errors}
            />
            <TradeDetails
              setFormData={(data) =>
                setFormData((prev) => ({
                  ...prev,
                  tradeDetails: {
                    ...prev.tradeDetails,
                    ...data,
                  },
                }))
              }
              formData={formData.tradeDetails}
              errors={errors}
            />
            <LicenseSpecifications
              setFormData={(data) =>
                setFormData((prev) => ({
                  ...prev,
                  tradeSpecifications: {
                    ...prev.tradeSpecifications,
                    ...data,
                  },
                }))
              }
              formData={formData.tradeSpecifications}
              errors={errors}
            />
            <TradeLocationDetails
              setFormData={(data) =>
                setFormData((prev) => ({
                  ...prev,
                  tradeLocationDetails: {
                    ...prev.tradeLocationDetails,
                    ...data,
                  },
                }))
              }
              formData={formData.tradeLocationDetails}
              errors={errors}
            />
            <TradeOwnerDetails
              setFormData={(data) =>
                setFormData((prev) => ({
                  ...prev,
                  tradeOwnerDetails: {
                    ...prev.tradeOwnerDetails,
                    ...data,
                  },
                }))
              }
              formData={formData.tradeOwnerDetails}
              errors={errors}
            />
            <ApplicantDetails
              setFormData={(data) =>
                setFormData((prev) => ({
                  ...prev,
                  applicantDetails: {
                    ...prev.applicantDetails,
                    ...data,
                  },
                }))
              }
              formData={formData.applicantDetails}
              errors={errors}
            />
          </Form>
        </div>
        <div
          style={{
            backgroundColor: "white",
            padding: "20px",
            marginTop: "50px",
            marginLeft: "-25px",
            marginRight: "-25px",
          }}
        >
          <Row className="justify-content-end">
            <Col xs="auto" style={{ paddingRight: "1rem" }}>
              <Button
                variant="light"
                style={{
                  marginRight: "15px",
                  borderColor: "#49627E",
                  width: "115px",
                }}
              >
                Cancel
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

export default TradeLicense;
