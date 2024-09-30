import React, { useContext, useState } from 'react'
// import files
import Layout from './../../../Layouts';

import { AuthContext } from "./../../../../utils/AuthContext";
import Footer from "./../../../Layouts/Footer";
import AppList from './../../../dashboard/AppList'
import NewRegistration from './NewRegistration';
import DocumentUpload from '../../documentUpload';
import PreviewApp from './PreviewApplication';

const Registration = () => {
	const { user, userType } = useContext(AuthContext);
	const [currentPage, setCurrentPage] = useState('NewRegistration');
	const handleNext = () => {
		if (currentPage === 'AppList') {
			setCurrentPage('NewRegistration');
		} else if (currentPage === 'NewRegistration') {
			setCurrentPage('DocumentUpload');
		} else if (currentPage === 'DocumentUpload') {
			setCurrentPage('PreviewApp');
		}
		else if (currentPage === 'PreviewApp') {
			setCurrentPage('PaymentPage');
		}
	};

	const handleBack = () => {
		if (currentPage === 'NewRegistration') {
			setCurrentPage('AppList');
		} else if (currentPage === 'DocumentUpload') {
			setCurrentPage('NewRegistration');
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
			{user && userType === 'CITIZEN' ? (
				<>
					<div className="wrapper">
						<Layout />
						{currentPage === 'AppList' && <AppList onNext={handleNext} onView={handleView} />}
						{currentPage === 'NewRegistration' && <NewRegistration onBack={handleBack} onNext={handleNext} />}
						{currentPage === 'DocumentUpload' && <DocumentUpload onBack={handleBack} onNext={handleNext} module="GarbageCollection" />}
						{currentPage === 'PreviewApp' && <PreviewApp onBack={handleBack} onNext={handleNext} />}
						{currentPage === 'PaymentPage' && <PaymentPage onBack={handleBack} />}
						<Footer />
					</div>
				</>
			) : ''}

		</div>
	);
};

export default Registration;
