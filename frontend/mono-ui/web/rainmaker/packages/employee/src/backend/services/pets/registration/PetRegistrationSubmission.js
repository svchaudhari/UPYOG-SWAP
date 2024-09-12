import { APICall } from "../../../../utils/api";
export const PetRegistrationSubmission = () => {
    const constructPetRegistrationParams = (
        formData,
        applicationType = "NEW",
        serviceName = "PTR",
        actionType = "INITIATE",
        channel = "CITIZEN"
    ) => {
        const currentYear = new Date().getFullYear();
        const nextYear = Number(currentYear.toString().slice(-2)) + 1;
        return {
            PetRegistrationApplications: [
                {

                    action: actionType,
                    applicationType: applicationType,
                    financialYear: `${currentYear}-${nextYear}`,
                    NewRegistrationType: "PERMANENT",
                    businessService: serviceName,
                    tenantId: process.env.REACT_APP_TENANTID + "." + formData.locationDetails.ulbName,
                    applicantName: formData.ownerDetails.PetOwnerName,
                    aadharNumber: null,
                    mobileNumber: formData.ownerDetails.petOwnerMobileNumber,
                    alternateNumber: null,
                    fatherName: formData.ownerDetails.petOwnerFatherName,
                    emailId: formData.ownerDetails.petOwnerEmailAddress,
                    address:
                    {
                        tenantId: process.env.REACT_APP_TENANTID + "." + formData.locationDetails.ulbName,
                        type: "PERMANENT",
                        pincode: formData.locationDetails.propertyPinCode,
                        locality: {
                            code: "",
                            area: "",
                        },
                        street: formData.locationDetails.districtName,
                        doorNo: null,
                        buildingName: null,
                        addressLine1: formData.locationDetails.propertyAddress,
                        addressLine2: null,
                        landmark: formData.locationDetails.landmark,


                    },
                    petDetails: {
                        petType: formData.petDetails.petType,
                        breedType: formData.petDetails.breedType,
                        petGender: formData.petDetails.petGender,
                        petName: formData.petDetails.petName,
                        petAge: formData.petDetails.petAge,
                        doctorName: formData.petDetails.doctorName,
                        clinicName: null,
                        lastVaccineDate: formData.petDetails.vaccinationDate,
                        vaccinationNumber: null
                    },
                    additionalDetail: {
                        petOwnerGender: formData.ownerDetails.petOwnerGender,
                        propertyId: formData.locationDetails.propertyId,
                        districtName: formData.locationDetails.districtName,
                        ulbName: formData.locationDetails.ulbName,
                        ulbType: formData.locationDetails.ulbType,
                        wardNumber: formData.locationDetails.wardNumber,
                        doctorRegistrationNumber: formData.petDetails.doctorRegistrationNumber,
                        vaccinationStatus: formData.petDetails.vaccinationStatus,
                        petPurchaseSource: formData.petDetails.petPurchaseSource,
                        petPurchaseSourceDetail: formData.petDetails.petPurchaseSourceDetail,
                        applicantName: localStorage.getItem("user"),
                        applicantEmailAddress: JSON.parse(localStorage.getItem("userInfo")).emailId,
                        applicantMobileNumber: JSON.parse(localStorage.getItem("userInfo")).mobileNumber,
                    },
                    documents: [

                    ],
                    workflow: {
                        action: "INITIATE",
                        tenantId: process.env.REACT_APP_TENANTID + "." + formData.locationDetails.ulbName,
                        comment: ""
                    },
                }

            ],
            "RequestInfo": {
				userInfo: JSON.parse(localStorage.getItem("userInfo")),
                plainAccessRequest:{}
			}
        }
      
    }

        const constructSubmissionParams = (id, AppNo, AppAction = "FORWARD_TO_VERIFIER") => {

            return {
                PetRegistrationApplications: [
                    {
                        "isOnlyWorkflowCall": true,
                        "applicationNumber": AppNo,
                        "workflow":{
                            "action": AppAction,
                            "status": null,
                            "comments": null,
                            "assignes": null,
                            "documents": null
                        },
                    }
                ],
                RequestInfo: {
                    apiId: process.env.REACT_APP_APIID,
                    authToken: localStorage.getItem("token"),
                    userInfo: JSON.parse(localStorage.getItem("userInfo")),
                },
            }
        }

        const submitPetRegistrationSubmission = async (
            formData,
            applicationType = "NEW",
            ServiceName = "PTR",
            actionType = "INITIATE",
            AppNo = ""
        ) => {
            let postData = (actionType == "FORWARD_TO_VERIFIER" ? constructSubmissionParams(formData, AppNo) : constructPetRegistrationParams(formData, applicationType, ServiceName, actionType));
            try {
                return await APICall(
                    `${process.env.REACT_APP_PET_REGISTRATION_SERVICE}/pet-services/pet-registration/` + (actionType === "INITIATE" ? "_create" : "_update"),
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
            constructPetRegistrationParams,
            constructSubmissionParams,
            submitPetRegistrationSubmission
        };

    };
export default PetRegistrationSubmission;