import React, { useContext } from "react";


import CitizenPetDashboard from "./citizen/pets";
import EmployeePetDashboard from "./employee/pets";
import { AuthContext } from "../../utils/AuthContext";
import Layout from "../Layouts";
import Footer from "../Layouts/Footer";
const PetDashboard = () => {
	const { user, userType } = useContext(AuthContext);
	return (
		<div>
			<Layout />
			{user && userType === "EMPLOYEE" ? (
				<>
					<EmployeePetDashboard />

				</>
			) : (
				<>
					<CitizenPetDashboard />
				</>
			)}
			<Footer />
		</div>
	);
};
export default PetDashboard;
