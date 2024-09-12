import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import { CommonFunctions } from "../../../../../utils/CommonFunctions";
import PageHeading from "../../../../../components/PageHeading";
import GarbageSpecifications from "../../../../services/garbageCollection/newGarbageRegistration/appPreview/GarbageSpecifications";
import OwnerDetails from "../../../../services/garbageCollection/newGarbageRegistration/appPreview/OwnerDetails";
import PropertyLocationDetails from "../../../../services/garbageCollection/newGarbageRegistration/appPreview/PropertyLocationDetails";
import ApplicantDetails from "../../../../services/garbageCollection/newGarbageRegistration/appPreview/ApplicantDetails";

const NewRegistration = ({ applicationNo }) => {

    const { getGarbageApplicationData } = CommonFunctions();
    const [garbageData, setFetchGarbageData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const appData = await getGarbageApplicationData(
                    `?tenantId=${JSON.parse(localStorage.getItem("userCurrentRole")).tenantId}&applicationNumber=${applicationNo}`
                );
                if (appData.ResponseInfo.status && appData.ResponseInfo.status === "successful") {
                    setFetchGarbageData(appData.garbageAccounts[0]);
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

    if (!garbageData) {
        return <div>No data found</div>;
    }else{
		return (
			<>
				<PageHeading headingText={`New Garbage Registration ${applicationNo}`} />
				<GarbageSpecifications garbageData={garbageData} />
				<OwnerDetails garbageData={garbageData} />
				<PropertyLocationDetails garbageData={garbageData} />
				<ApplicantDetails garbageData={garbageData} />
			</>
		);
	}


};

export default NewRegistration;
