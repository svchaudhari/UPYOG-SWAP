import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import { CommonFunctions } from "../../../../../utils/CommonFunctions";
import PageHeading from "../../../../../components/PageHeading";
import OwnerDetails from "../../../../services/pets/appPreview/OwnerDetails";
import PetDetails from "../../../../services/pets/appPreview/PetDetails";
import AddressDetails from "../../../../services/pets/appPreview/AddressDetails";
import ApplicantDetails from "../../../../services/pets/appPreview/ApplicantDetails";

const NewRegistration = ({ applicationNo }) => {

    const { getPetApplicationData } = CommonFunctions();
    const [petData, setFetchPetData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const appData = await getPetApplicationData(
                    `?tenantId=${JSON.parse(localStorage.getItem("userCurrentRole")).tenantId}&applicationNumber=${applicationNo}`
                );
                if (appData.ResponseInfo.status && appData.ResponseInfo.status === "successful") {
                    setFetchPetData(appData.PetRegistrationAccount[0]);
                } else {
                    setError("Something went wrong. Could not connect with server");
                }
            } catch (error) {
                console.error("Error fetching garbage data:", error);
                setError("Error fetching garbage data");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [applicationNo]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!petData) {
        return <div>No data found</div>;
    }else{
		return (
			<>
				<PageHeading headingText={`New Garbage Registration ${applicationNo}`} />
				<OwnerDetails petData={fetchPetData} />
					<PetDetails petData={fetchPetData} />
					<AddressDetails petData={fetchPetData} />
					<ApplicantDetails petData={fetchPetData} />
			</>
		);
	}


};

export default NewRegistration;
