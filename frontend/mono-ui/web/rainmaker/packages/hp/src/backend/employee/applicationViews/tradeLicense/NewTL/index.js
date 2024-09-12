import React, { useContext, useState, useEffect } from "react";
import { CommonFunctions } from "../../../../../utils/CommonFunctions";
import RegistrationDetails from "../../../../services/tradeLicense/registration/appPreview/RegistrationDetails";
import TradeDetails from "../../../../services/tradeLicense/registration/appPreview/TradeDetails";
import LicenseSpecifications from "../../../../services/tradeLicense/registration/appPreview/LicenseSpecifications";
import TradeLocationDetails from "../../../../services/tradeLicense/registration/appPreview/TradeLocationDetails";
import TradeOwnerDetails from "../../../../services/tradeLicense/registration/appPreview/TradeOwnerDetails";
import ApplicantDetails from "../../../../services/tradeLicense/registration/appPreview/ApplicantDetails";

import PageHeading from "../../../../../components/PageHeading";
const NewTL = ({ applicationNo }) => {
	const { getTLApplicationData } = CommonFunctions();
	const [fetchTrdData, setFetchTrdData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const appData = await getTLApplicationData(
					`?tenantId=${JSON.parse(localStorage.getItem("userCurrentRole")).tenantId}&applicationNumber=${applicationNo}`
				);
				if (
					appData.ResponseInfo.status &&
					appData.ResponseInfo.status === "successful"
				) {
					setFetchTrdData(appData.Licenses[0]);
				} else {
					setError("Something went wrong. Could not connect with server");
				}
			} catch (error) {
				console.error("Error fetching trade license data:", error);
				setError("Error fetching trade license data");
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [applicationNo]);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>{error}</div>;
	}

	return (
		<>
			<PageHeading headingText={` New Trade Registration ` + applicationNo} ></PageHeading>
			<RegistrationDetails fetchTrdData={fetchTrdData} />
			<TradeDetails fetchTrdData={fetchTrdData} />
			<LicenseSpecifications fetchTrdData={fetchTrdData} />
			<TradeLocationDetails fetchTrdData={fetchTrdData} />
			<TradeOwnerDetails fetchTrdData={fetchTrdData} />
			<ApplicantDetails fetchTrdData={fetchTrdData} />
		</>
	);
};

export default NewTL;
