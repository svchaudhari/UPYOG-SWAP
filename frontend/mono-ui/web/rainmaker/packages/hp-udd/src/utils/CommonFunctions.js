import { showAlert } from "./Alerts";
import { APICall } from "./api";

export const CommonFunctions = () => {
  // Sets the current user role based on roles provided
  const setUserCurrentRole = (roles, selectedRole = null) => {
    roles = JSON.parse(roles);
    let userCurrentRole = {};

    if (selectedRole === null) {
      // Filter out roles that are null or for employees
      const validRoles = roles.filter(
        (role) => role.name !== null && role.code !== "EMPLOYEE"
      );
      if (validRoles.length > 0) {
        userCurrentRole = validRoles[0]; // Assuming we want to set the first valid role
      }
    } else {
      // Find the role that matches the selected role name
      userCurrentRole = roles.find((role) => role.name === selectedRole) || {};
    }

    localStorage.setItem("userCurrentRole", JSON.stringify(userCurrentRole));
    updateUserRole();
  };

  // Updates the current user role based on the selected role index
  const updateUserCurrentRole = (selectedRole, role) => {
    console.log(role);
    let roles = JSON.parse(localStorage.getItem("userMappedRoles"));
    localStorage.setItem(
      "userCurrentRole",
      JSON.stringify(roles[selectedRole])
    );
    updateUserRole();
    const sroles = roles[selectedRole].code;
    if (sroles.startsWith('GB_')) {
      window.location.href = "/backend/garbage-dashboard"; // Redirect to the backend page
    } else if (sroles.startsWith('PTR_')) {
      window.location.href = "/backend/pet-dashboard"; // Redirect to the backend page
    } else {
      window.location.href = "/backend"; // Redirect to the backend page
    }


  };

  // Updates the user role in the localStorage
  const updateUserRole = () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const userCurrentRole = JSON.parse(localStorage.getItem("userCurrentRole"));

    userInfo.roles = [userCurrentRole]; // Store the current role in userInfo
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
  };

  const constructMDMSSearchString = (tanentID, moduleName, masterDetails) => {
    return {
      RequestInfo: {
        authToken: `${process.env.REACT_APP_MDMS_REQUEST_TOKEN}`,
      },
      MdmsCriteria: {
        tenantId: `${tanentID}`,
        moduleDetails: [
          {
            moduleName: `${moduleName}`,
            masterDetails: [
              {
                name: `${masterDetails}`,
              },
            ],
          },
        ],
      },
    };
  }
  // get all districts from MDMS 
  const getAllDistricts = async () => {
    const postData = constructMDMSSearchString("hp.District", "District", "District")
    try {
      return await APICall(
        `${process.env.REACT_APP_MDMS_REQUEST_URL}`,
        "POST",
        JSON.stringify(postData),
        { "Content-Type": "application/json" }
      );
    } catch (error) {
      console.error("Error fetching districts:", error);
    }
  };
  // get all ULBs with respect to district from MDMS
  const getAllULBsFromDistrict = async (districtName) => {
    const postData = constructMDMSSearchString("hp.Districts", districtName, "ULBS")
    try {
      return await APICall(
        `${process.env.REACT_APP_MDMS_REQUEST_URL}`,
        "POST",
        JSON.stringify(postData),
        { "Content-Type": "application/json" }
      );
    } catch (error) {
      console.error("Error fetching districts:", error);
    }
  }
  // get all wards with respect to ULBs from MDMS

  const getAllWardsFromULBS = async (ulbName) => {
    const postData = constructMDMSSearchString(`hp.${ulbName}`, "wards", "wards")
    try {
      return await APICall(
        `${process.env.REACT_APP_MDMS_REQUEST_URL}`,
        "POST",
        JSON.stringify(postData),
        { "Content-Type": "application/json" }
      );
    } catch (error) {
      console.error("Error fetching districts:", error);
    }
  }

  //get trade categories from MDMS

  const getTradeSubCategory = async (selectedCategory) => {
    const postData = constructMDMSSearchString(`hp`, "TradeLicense", selectedCategory)
    try {
      return await APICall(
        `${process.env.REACT_APP_MDMS_REQUEST_URL}`,
        "POST",
        JSON.stringify(postData),
        { "Content-Type": "application/json" }
      );
    } catch (error) {
      console.error("Error fetching districts:", error);
    }
  }

  //get trade categories from MDMS

  const getTradeCategory = async (module) => {
    const postData = constructMDMSSearchString(`hp`, module, 'Categories')
    try {
      return await APICall(
        `${process.env.REACT_APP_MDMS_REQUEST_URL}`,
        "POST",
        JSON.stringify(postData),
        { "Content-Type": "application/json" }
      );
    } catch (error) {
      console.error("Error fetching districts:", error);
    }
  }


  const getCitizenAppStats = async (criteria) => {
    return getCitizenTLStats(criteria);
  }

  // Trade Licens Application Stats
  const getCitizenTLStats = async (criteria = null) => {
    const postData = {
      "RequestInfo": {
        apiId: process.env.REACT_APP_APIID,
        authToken: localStorage.getItem("token"),
        userInfo: JSON.parse(localStorage.getItem("userInfo")),
      }
    }
    try {
      return await APICall(
        `${process.env.REACT_APP_TRADE_LICENSE_SERVICE}/tl-services/v1/NewTL/_search${(criteria ? criteria : "")}`,
        "POST",
        JSON.stringify(postData),
        { "Content-Type": "application/json" }
      );
    } catch (error) {
      console.error("Error fetching districts:", error);
    }

  }

  const getTLApplicationData = async (criteria) => {
    const postData = {
      "RequestInfo": {
        apiId: process.env.REACT_APP_APIID,
        authToken: localStorage.getItem("token"),
        userInfo: JSON.parse(localStorage.getItem("userInfo")),
      }
    }
    try {
      return await APICall(
        `${process.env.REACT_APP_TRADE_LICENSE_SERVICE}/tl-services/v1/NewTL/_search` + criteria,
        "POST",
        JSON.stringify(postData),
        { "Content-Type": "application/json" }
      );
    } catch (error) {
      console.error("Error fetching districts:", error);
    }
  }

  const updateNewTLStatus = async (appNo, comments, status) => {
    const postData = {
      "RequestInfo": {
        apiId: process.env.REACT_APP_APIID,
        authToken: localStorage.getItem("token"),
        userInfo: JSON.parse(localStorage.getItem("userInfo")),
      },
      "Licenses": [
        {
          "comment": comments,
          "applicationNumber": appNo,
          "action": status,
        }
      ],
    }
    try {
      return await APICall(
        `${process.env.REACT_APP_TRADE_LICENSE_SERVICE}/tl-services/v1/NewTL/_update`,
        "POST",
        JSON.stringify(postData),
        { "Content-Type": "application/json" }
      );
    } catch (error) {
      console.error("Error fetching districts:", error);
    }

  }

  const getServiceDocuments = async (serviceName, appNo = '') => {
    const postData = {
      "serviceName": serviceName,
      "objectId": appNo,
    }
    try {
      return await APICall(
        `${process.env.REACT_APP_DMS_URL}/dms/fetchServiceDocMapping`,
        "POST",
        JSON.stringify(postData),
        { "Content-Type": "application/json" }
      );
    } catch (error) {
      console.error("Error fetching districts:", error);
    }
  }
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const parseStatus = (status) => {
    let appStatus = '';
    switch (status) {
      case "INITIATE":
        appStatus = "Draft";
        break;
      case "FORWARD_TO_VERIFIER":
      case "FORWARD_TO_APPROVER":
        appStatus = "Submitted to Department";
        break;
      case "VERIFY":
        appStatus = "Verified";
        break;
      case "APPROVE":
        appStatus = "Approved";
        break;
      case "RETURN_TO_INITIATOR_FOR_PAYMENT":
        appStatus = "Returned to Citizen for Payment";
        break;
      default:
        appStatus = status;
        break;
    }
    return appStatus;
  }
  const getStatusRowClass = (status) => {
    let className = '';
    switch (status) {
      case 'APPROVE':
        className = 'table-success';
        break;
      case 'FORWARD_TO_VERIFIER':
        className = "table-primary";
        break;
      case 'VERIFY':
      case 'FORWARD_TO_VERIFIER':
      case 'FORWARD_TO_APPROVER':
        className = 'table-info';
        break;
      case 'RETURN_TO_INITIATOR':
      case 'RETURN_TO_INITIATOR_FOR_PAYMENT':
        className = 'table-warning';
        break;

      default:
        className = 'table-primary';
        break;
    }
    return className;
  }

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }
  const getNewTLPaymentDetails = async (applicationNo, accountId = null) => {
    const applicationNumbers = [applicationNo];
    const postData = {
      "RequestInfo": {
        apiId: process.env.REACT_APP_APIID,
        authToken: localStorage.getItem("token"),
        userInfo: JSON.parse(localStorage.getItem("userInfo")),
      },
      "applicationNumbers": applicationNumbers
    }
    try {
      return await APICall(
        `${process.env.REACT_APP_TRADE_LICENSE_SERVICE}/tl-services/v1/fetch/CALCULATEFEE`,
        "POST",
        JSON.stringify(postData),
        { "Content-Type": "application/json" }
      );
    } catch (error) {
      console.error("Error fetching districts:", error);
    }
  }
  const getPaymentDetails = async (service, application, accountId = null) => {
    console.log(service);
    let paymentDetails = '';
    switch (service) {
      case "NewTL":
        paymentDetails = await getNewTLPaymentDetails(application, accountId)
        break;
      case "GarbageCollection":
        paymentDetails = await getNewGBPaymentDetails(application, accountId)
        break;

      default:
        break;
    }
    return paymentDetails;
  }

  const initiateTransaction = async (module, appID, billId, billAmount, taxAmount = 0, gateway = 'RAZORPAY') => {
    const postData = {
      "RequestInfo": {
        apiId: process.env.REACT_APP_APIID,
        authToken: localStorage.getItem("token"),
        userInfo: JSON.parse(localStorage.getItem("userInfo")),
      },
      "Transaction": {
        "tenantId": "hp",
        "txnAmount": billAmount,
        "module": module,
        "billId": billId,
        "moduleId": "prop12-assess1",
        "productInfo": module,
        "gateway": gateway,
        "callbackUrl": `${process.env.REACT_APP_TRANSACTION_URL}/v1/_update`,
        "taxAndPayments": [
          {
            "taxAmount": taxAmount,
            "amountPaid": billAmount,
            "billId": billId
          }
        ],
        "consumerCode": appID,
        "user": JSON.parse(localStorage.getItem("userInfo")),
      }
    }
    try {
      return await APICall(
        `${process.env.REACT_APP_TRANSACTION_URL}/v1/_create`,
        "POST",
        JSON.stringify(postData),
        { "Content-Type": "application/json" }
      );
    } catch (error) {
      console.error("Error fetching districts:", error);
    }

  }

  const updateTransaction = async (url, queryParam) => {
    url = url + queryParam;
    const postData = {
      "RequestInfo": {
        apiId: process.env.REACT_APP_APIID,
        authToken: localStorage.getItem("token"),
        userInfo: JSON.parse(localStorage.getItem("userInfo")),
      },
    }
    try {
      return await APICall(
        url,
        "POST",
        JSON.stringify(postData),
        { "Content-Type": "application/json" }
      );
    } catch (error) {
      console.error("Error fetching districts:", error);
    }

  }

  const getTransactionDetails = async (queryParams) => {
    const postData = {
      "RequestInfo": {
        apiId: process.env.REACT_APP_APIID,
        authToken: localStorage.getItem("token"),
        userInfo: JSON.parse(localStorage.getItem("userInfo")),
      },
    }
    try {
      return await APICall(
        `${process.env.REACT_APP_TRANSACTION_URL}/v1/_search?${queryParams}`,
        "POST",
        JSON.stringify(postData),
        { "Content-Type": "application/json" }
      );
    } catch (error) {
      console.log(error);
      //  showAlert('Error', 'Token validation failed', 'error');
    }
  }

  const getCategory = async (module) => {
    const postData = constructMDMSSearchString(`hp`, module, 'Categories')
    try {
      return await APICall(
        `${process.env.REACT_APP_MDMS_REQUEST_URL}`,
        "POST",
        JSON.stringify(postData),
        { "Content-Type": "application/json" }
      );
    } catch (error) {
      console.error("Error fetching districts:", error);
    }
  }

  // Garbage Licens Application Stats

  const getCitizenGarbageAppStats = async (criteria) => {
    return getCitizenGarbageStats(criteria);
  }

  // Garbage Licens Application Stats
  const getCitizenGarbageStats = async (criteria = null) => {
    const postData = {
      "RequestInfo": {
        apiId: process.env.REACT_APP_APIID,
        authToken: localStorage.getItem("token"),
        userInfo: JSON.parse(localStorage.getItem("userInfo")),
      },
      searchCriteriaGarbageAccount: {
      },
    }
    if (JSON.parse(localStorage.getItem("userCurrentRole")).code !== "CITIZEN") {
      postData.searchCriteriaGarbageAccount.tenantId = JSON.parse(localStorage.getItem("userCurrentRole")).tenantId;
    }
    try {
      return await APICall(
        `${process.env.REACT_APP_GARBAGE_COLLECTION_SERVICE}/grbg-services/garbage-accounts/_search${(criteria ? criteria : "")}`,
        "POST",
        JSON.stringify(postData),
        { "Content-Type": "application/json" }
      );
    } catch (error) {
      console.error("Error fetching garbage data:", error);
    }

  }
  // Garbage Licens Application Data

  const getGarbageApplicationData = async (criteria) => {
    const queryParams = new URLSearchParams(criteria)
    const applicationNumber = queryParams.get('applicationNumber') ? queryParams.get('applicationNumber') : localStorage.getItem("applicationNumber");
    const postData = {
      "RequestInfo": {
        apiId: process.env.REACT_APP_APIID,
        authToken: localStorage.getItem("token"),
        userInfo: JSON.parse(localStorage.getItem("userInfo")),
      },
      searchCriteriaGarbageAccount: {
        applicationNumber: [applicationNumber],
      }
    }
    try {
      return await APICall(
        `${process.env.REACT_APP_GARBAGE_COLLECTION_SERVICE}/grbg-services/garbage-accounts/_search` + criteria,
        "POST",
        JSON.stringify(postData),
        { "Content-Type": "application/json" }
      );
    } catch (error) {
      console.error("Error fetching garbage data:", error);
    }
  }
  // Garbage Status Update
  const updateNewGarbageStatus = async (appNo, comments, status) => {
    const postData = {
      "RequestInfo": {
        apiId: process.env.REACT_APP_APIID,
        authToken: localStorage.getItem("token"),
        userInfo: JSON.parse(localStorage.getItem("userInfo")),
      },
      "garbageAccounts": [
        {

          "isOnlyWorkflowCall": true,
          "grbgApplicationNumber": appNo,
          "workflowAction": status,
          "workflowComment": comments,
        }
      ],
    }
    try {
      return await APICall(
        `${process.env.REACT_APP_GARBAGE_COLLECTION_SERVICE}/grbg-services/garbage-accounts/_update`,
        "POST",
        JSON.stringify(postData),
        { "Content-Type": "application/json" }
      );
    } catch (error) {
      console.error("Error fetching districts:", error);
    }

  }

  // Garbage Payment details
  const getNewGBPaymentDetails = async (applicationNo, accountId = null) => {
    console.log("sdasd");
    const paymentDetails = {
      "applicationDetails": [
        {
          "applicationNumber": applicationNo,
          "totalPayableAmount": 100.0,
          "feeCalculationFormula": "Household (Area less than 2000 Sq. Feet) ]",
          "billDetails": {
            "billId": "013a32f6-0244-4fab-9349-c8e6ab40749c"
          },
          "userDetails": {
            "MobileNo": "9459874826",
            "UserName": "Divya",
            "Email": "divya2407sharma@gmail.com",
            "Address": "address1, wardName, ShimLA, districtName, 403001"
          }
        }
      ]
    }

    return paymentDetails;

    // const applicationNumbers = [applicationNo];
    // const postData = {
    // 	"RequestInfo": {
    // 		apiId: process.env.REACT_APP_APIID,
    // 		authToken: localStorage.getItem("token"),
    // 		userInfo: JSON.parse(localStorage.getItem("userInfo")),
    // 	},
    // 	"applicationNumbers": applicationNumbers
    // }
    // try {
    // 	return await APICall(
    // 		`${process.env.REACT_APP_GARBAGE_COLLECTION_SERVICE}/grbg-services/garbage-accounts/fetch/CALCULATEFEE`,
    // 		"POST",
    // 		JSON.stringify(postData),
    // 		{ "Content-Type": "application/json" }
    // 	);
    // } catch (error) {
    // 	console.error("Error fetching payment detail:", error);
    // }

  }

  // MDSM fetch master data
  const getMdmseSearch = async (module, service) => {
    const postData = constructMDMSSearchString(`hp`, module, service)
    try {
      return await APICall(
        `${process.env.REACT_APP_MDMS_REQUEST_URL}`,
        "POST",
        JSON.stringify(postData),
        { "Content-Type": "application/json" }
      );
    } catch (error) {
      console.error("Error fetching records:", error);
    }
  }

  // Pet Registration Application Detail
  const getPetApplicationData = async (criteria) => {
    const queryParams = new URLSearchParams(criteria)
    const applicationNumber = queryParams.get('applicationNumber') ? queryParams.get('applicationNumber') : localStorage.getItem("applicationNumber");
    const postData = {
      "RequestInfo": {
        apiId: process.env.REACT_APP_APIID,
        authToken: localStorage.getItem("token"),
        userInfo: JSON.parse(localStorage.getItem("userInfo")),
      },
      searchCriteriaGarbageAccount: {
        applicationNumber: [applicationNumber],
      }
    }
    try {
      return await APICall(
        `${process.env.REACT_APP_PET_REGISTRATION_SERVICE}/pet-services/pet-registration/_search` + criteria,
        "POST",
        JSON.stringify(postData),
        { "Content-Type": "application/json" }
      );
    } catch (error) {
      console.error("Error fetching garbage data:", error);
    }
  }


  // Pet Licens Application Stats

  const getCitizenPetAppStats = async (criteria) => {
    return getCitizenPetStats(criteria);
  }

  // Pet Licens Application Stats
  const getCitizenPetStats = async (criteria = null) => {
    const postData = {
      "RequestInfo": {
        apiId: process.env.REACT_APP_APIID,
        authToken: localStorage.getItem("token"),
        userInfo: JSON.parse(localStorage.getItem("userInfo")),
      },
    }
    if (JSON.parse(localStorage.getItem("userCurrentRole")).code !== "CITIZEN") {
      postData.searchCriteriaGarbageAccount.tenantId = JSON.parse(localStorage.getItem("userCurrentRole")).tenantId;
    }
    try {
      return await APICall(
        `${process.env.REACT_APP_PET_REGISTRATION_SERVICE}/pet-services/pet-registration/_search${(criteria ? criteria : "")}`,
        "POST",
        JSON.stringify(postData),
        { "Content-Type": "application/json" }
      );
    } catch (error) {
      console.error("Error fetching garbage data:", error);
    }

  }

  return {
    setUserCurrentRole,
    updateUserRole,
    updateUserCurrentRole,
    getAllDistricts,
    getAllULBsFromDistrict,
    getAllWardsFromULBS,
    getTradeSubCategory,
    constructMDMSSearchString,
    getCitizenAppStats,
    getTLApplicationData,
    updateNewTLStatus,
    getServiceDocuments,
    formatDate,
    parseStatus,
    getStatusRowClass,
    loadScript,
    getPaymentDetails,
    getTradeCategory,
    initiateTransaction,
    updateTransaction,
    getTransactionDetails,
    getCategory,
    getCitizenGarbageAppStats,
    getGarbageApplicationData,
    updateNewGarbageStatus,
    getNewGBPaymentDetails,
    getMdmseSearch,
    getPetApplicationData,
    getCitizenPetAppStats
  };
};
