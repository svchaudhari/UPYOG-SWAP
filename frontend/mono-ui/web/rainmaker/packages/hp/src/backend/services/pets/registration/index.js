import React, { useContext, useState } from 'react'
// import files
import Layout from './../../../Layouts';

import { AuthContext } from "./../../../../utils/AuthContext";
import Footer from "./../../../Layouts/Footer";
import PetRegistration from './PetRegistration';
import PreviewApp from './PreviewApplication';
import DocumentUpload from '../../documentUpload';


const Registration = () => {
	const { user, userType } = useContext(AuthContext);
	const [currentPage, setCurrentPage] = useState('PetRegistration');

	const handleNext = () => {
		if (currentPage === 'AppList') {
			setCurrentPage('PetRegistration');
		} else if (currentPage === 'PetRegistration') {
			setCurrentPage('DocumentUpload');
		} else if (currentPage === 'DocumentUpload') {
			setCurrentPage('PreviewApp');
		}
		else if (currentPage === 'PreviewApp') {
			setCurrentPage('PaymentPage');
		}
	};

	const handleBack = () => {
		if (currentPage === 'PetRegistration') {
			setCurrentPage('AppList');
		} else if (currentPage === 'DocumentUpload') {
			setCurrentPage('PetRegistration');
		} else if (currentPage === 'PreviewApp') {
			setCurrentPage('DocumentUpload');
		}
		else if (currentPage === 'PaymentPage') {
			setCurrentPage('PreviewApp');
		}
	};

	const handleView = () => {
		if (currentPage === 'AppList') {
			setCurrentPage('PreviewApp');
		}
	}

	return (
		<div>
			<>
				<div className="wrapper">
					<Layout />
					{currentPage === 'AppList' && <AppList onNext={handleNext} onView={handleView} />}
					{currentPage === 'PetRegistration' && <PetRegistration onBack={handleBack} onNext={handleNext} />}
					{currentPage === 'DocumentUpload' && <DocumentUpload onBack={handleBack} onNext={handleNext} module="PTR" />}
					{currentPage === 'PreviewApp' && <PreviewApp onBack={handleBack} onNext={handleNext} />}
					{currentPage === 'PaymentPage' && <PaymentPage onBack={handleBack} />}
					<Footer />
				</div>
			</>

		</div>
	);
};

export default Registration;
