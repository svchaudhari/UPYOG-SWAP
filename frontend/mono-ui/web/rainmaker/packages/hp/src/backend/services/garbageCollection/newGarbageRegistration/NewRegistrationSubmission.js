import { APICall } from "../../../../utils/api";
export const NewRegistrationSubmission = () => {
	const constructNewRegistrationParams = (
		formData,
		applicationType = "NEW",
		serviceName = "GARBAGEREG",
		actionType = "INITIATE",
		channel = "CITIZEN"
	) => {
		const currentYear = new Date().getFullYear();
		const nextYear = Number(currentYear.toString().slice(-2)) + 1;

		return {
			garbageAccounts: [
				{
					action: actionType,
					applicationType: applicationType,
					financialYear: `${currentYear}-${nextYear}`,
					NewRegistrationType: "PERMANENT",
					tenantId:
						process.env.REACT_APP_TENANTID +
						"." +
						formData.propertyLocationDetails.ulbName,
					businessService: serviceName,


					propertyId: formData.propertyLocationDetails.propertyId,
					type: "Residential",
					name: formData.ownerDetails.ownerName,
					mobileNumber: formData.ownerDetails.ownerMobileNumber,
					gender: formData.propertyLocationDetails.propertyId,
					emailId: formData.propertyLocationDetails.propertyId,
					isOwner: formData.specifications.propertyOwnerType == 'Owner' ? true : false,
					addresses: [
						{
							zone: "zone1",
							address1: formData.propertyLocationDetails.propertyAddress,
							district: formData.propertyLocationDetails.districtName,
							ulbName: formData.propertyLocationDetails.ulbName,
							ulbType: formData.propertyLocationDetails.ulbType,
							wardName: formData.propertyLocationDetails.wardNumber,
							pincode: formData.propertyLocationDetails.propertyPinCode,
							additionalDetail: {
								district: formData.propertyLocationDetails.districtName,
							}
						}
					],
					grbgOldDetails: {
						oldGarbageId: formData.specifications.oldGarbageId,
					},
					grbgCollectionUnits: [
						{
							unitType: formData.specifications.typeOfCollection,
							category: formData.specifications.category,
							subCategory: formData.specifications.subCategory,
							subCategoryType: formData.specifications.subCategoryType
						}
					],
					additionalDetail: {
						propertyOwnerName: formData.propertyLocationDetails.propertyOwnerName, // need when isOwner = false
						ownerFatherName: formData.propertyLocationDetails.ownerFatherName, // need when isOwner = false
						applicantName: localStorage.getItem("user"),
						applicantEmail: JSON.parse(localStorage.getItem("userInfo"))
							.emailId,
						applicantPhoneNumber: JSON.parse(
							localStorage.getItem("userInfo")
						).mobileNumber,

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


	const constructSubmissionParams = (id, AppNo, AppAction = "FORWARD_TO_VERIFIER") => {

		return {
			garbageAccounts: [
				{
					"isOnlyWorkflowCall": true,
					"grbgApplicationNumber": AppNo,
					"workflowAction": AppAction,
					"workflowComment": "test",
				}
			],
			RequestInfo: {
				apiId: process.env.REACT_APP_APIID,
				authToken: localStorage.getItem("token"),
				userInfo: JSON.parse(localStorage.getItem("userInfo")),
			},
		}
	}

	const submitNewRegistrationSubmission = async (
		formData,
		applicationType = "NEW",
		ServiceName = "GarbageCollection",
		actionType = "INITIATE",
		AppNo = ""
	) => {
		let postData = (actionType == "FORWARD_TO_VERIFIER" ? constructSubmissionParams(formData, AppNo) : constructNewRegistrationParams(formData, applicationType, ServiceName, actionType));
		try {
			return await APICall(
				`${process.env.REACT_APP_GARBAGE_COLLECTION_SERVICE}/grbg-services/garbage-accounts/` + (actionType === "INITIATE" ? "_create" : "_update"),
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
			console.error("Error fetching record:", error);
		}
	}
	return {
		constructNewRegistrationParams,
		submitNewRegistrationSubmission,
		constructSubmissionParams,
	};

};
export default NewRegistrationSubmission;