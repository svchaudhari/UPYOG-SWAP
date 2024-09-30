import { APICall } from "../../../../utils/api";
export const TradeLicenseSubmission = () => {
  const constructLicenseParams = (
    formData,
    applicationType = "NEW",
    serviceName = "NewTL",
    actionType = "INITIATE",
    channel = "CITIZEN"
  ) => {
    const currentYear = new Date().getFullYear();
    const nextYear = Number(currentYear.toString().slice(-2)) + 1;
    return {
      Licenses: [
        {
          id: formData.id,
          applicationNumber: formData.applicationNumber,
          action: actionType,
          applicationType: applicationType,
          financialYear: `${currentYear}-${nextYear}`,
          licenseType: "PERMANENT",
          tenantId:
            process.env.REACT_APP_TENANTID +
            "." +
            formData.tradeLocationDetails.ulbName,
          businessService: serviceName,
          propertyId: formData.tradeLocationDetails.propertyId,
          tradeName: formData.tradeDetails.businessName,
          tradeLicenseDetail: {
            channel: channel,
            address: {
              pincode: formData.tradeLocationDetails.propertyPinCode,
              addressLine1: formData.tradeLocationDetails.propertyAddress,
              additionalDetail: {
                district: formData.tradeLocationDetails.districtName,
                ulbName: formData.tradeLocationDetails.ulbName,
                ulbType: formData.tradeLocationDetails.ulbType,
                wardName: formData.tradeLocationDetails.wardNumber,
                zone:"zone1",
              },
            },
            applicationDocuments: null,
            owners: [
              {
                mobileNumber: formData.tradeOwnerDetails.tradeOwnerMobileNumber,
                name: formData.tradeOwnerDetails.tradeOwnerName,
                fatherOrHusbandName:
                  formData.tradeOwnerDetails.tradeOwnerFatherName,
                gender: formData.tradeOwnerDetails.tradeOwnerGender,
                emailId: formData.tradeOwnerDetails.tradeOwnerEmailAddress,
              },
            ],
            tradeUnits: [
              {
                tradeType: formData.tradeDetails.tradeIndustryType,
              },
            ],
            additionalDetail: {
              tradeSubType: formData.tradeSpecifications.licenseSubCategory,
              tradeCategory: formData.tradeSpecifications.licenseCategory,
              licenseTrade: formData.tradeSpecifications.licenseTrade,
              scaleOfBusiness: formData.tradeDetails.scaleOfBusiness,
              periodOfLicense: Number(formData.tradeSpecifications.licensePeriod),
              InfrastructureOwnershipType: formData.tradeDetails.infraStrOwnType,
              propertyOwner: formData.tradeLocationDetails.propertyOwnerName,
              businessDetails: formData.tradeDetails.businessDetails,
              labourLicenseNumber:formData.registrationDetails.registrationLicenseNumber,
              labourRegistrationCommencementDate:formData.registrationDetails.registrationCommencementDate,
              labourRegistrationValidityDate:formData.registrationDetails.registrationValidityDate,
              gstNumber: formData.tradeDetails.gstNumber,
              mapApproved: formData.tradeDetails.mapApproved,
              propertyType: formData.tradeDetails.propertyType,
              applicantName: localStorage.getItem("user"),
              applicantMobileNumber: JSON.parse(
                localStorage.getItem("userInfo")
              ).mobileNumber,
              applicantEmail: JSON.parse(localStorage.getItem("userInfo"))
                .emailId,
            },
          },
          workflowCode: serviceName,
        },
      ],
      RequestInfo: {
        apiId: process.env.REACT_APP_APIID,
        authToken: localStorage.getItem("token"),
        userInfo: JSON.parse(localStorage.getItem("userInfo")),
      },
    };
  };

  const constructSubmissionParams = (id, AppNo, AppAction="FORWARD_TO_VERIFIER", applicationType) =>{
    return{
      Licenses: [
        {
          "id": id,
          "applicationNumber": AppNo,
          "action": AppAction ,
          "applicationType": applicationType
        }
      ],
      RequestInfo: {
        apiId: process.env.REACT_APP_APIID,
        authToken: localStorage.getItem("token"),
        userInfo: JSON.parse(localStorage.getItem("userInfo")),
      },
    }
  }
// appId, applicaitonType,"NewTL","FORWARD_TO_VERIFIER", appNo
  const submitTradeApplication=async (
    formData,
    applicationType = "NEW",
    ServiceName = "NewTL",
    actionType = "INITIATE",
    AppNo= ""
  ) => {
    let postData = (actionType=="FORWARD_TO_VERIFIER" || actionType=="FORWARD_TO_APPROVER" ? constructSubmissionParams(formData,AppNo, actionType, applicationType ) : constructLicenseParams(formData,applicationType,ServiceName,actionType)) ;
    try {
      return await APICall(
        `${process.env.REACT_APP_TRADE_LICENSE_SERVICE}/tl-services/v1/NewTL/` + ( actionType === "INITIATE" && !formData.id ? "_create": "_update"),
        "POST",
        JSON.stringify(postData),
        { "Content-Type": "application/json" }
      );
    } catch (error) {
      showAlert(
        "Server Validations failed",
        `${error.message}`,
        'error'
      );
      console.error("Error fetching districts:", error);
    }
  }
  return {
    constructLicenseParams,
    submitTradeApplication,
    constructSubmissionParams,
  };
};
