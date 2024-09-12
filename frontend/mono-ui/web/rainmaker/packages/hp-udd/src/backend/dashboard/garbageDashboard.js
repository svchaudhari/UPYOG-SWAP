import React, { useContext } from "react";


import CitizenGarbageDashboard from "./citizen/garbageCollection";
import EmployeeGarbageDashboard from "./employee/garbageCollection";
import { AuthContext } from "../../utils/AuthContext";
import Layout from "../Layouts";
import Footer from "../Layouts/Footer";
const GarbageDashboard = () => {
	const { user, userType } = useContext(AuthContext);
	return (
		<div>
			<Layout />
			{user && userType === "EMPLOYEE" ? (
				<>
					<EmployeeGarbageDashboard />

				</>
			) : (
				<>
					<CitizenGarbageDashboard />
				</>
			)}
			<Footer />
		</div>
	);
};
export default GarbageDashboard;
