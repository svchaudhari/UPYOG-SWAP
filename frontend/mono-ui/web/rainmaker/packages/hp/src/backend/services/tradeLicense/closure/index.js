import React, { useContext,useState } from 'react'
// import files
import Layout from './../../../Layouts';

import { AuthContext } from "./../../../../utils/AuthContext";
import TradeLicense from './../registration/TradeLicense';
import Footer from "./../../../Layouts/Footer";
import AppList from './../../../dashboard/AppList'
import DocumentUpload from '../../documentUpload';
import PreviewApp from './../registration/PreviewApplication';
import { useSearchParams } from 'react-router-dom';

const Registration = () => {
  const [searchParams] = useSearchParams();
  const application = searchParams.get('application') ? atob(searchParams.get('application')) : null;
  const ulb = searchParams.get('ulb') ? atob(searchParams.get('ulb')) : null;

  const { user, userType} = useContext(AuthContext);

  const [currentPage, setCurrentPage] = useState('PreviewApp');

  const handleNext = () => {
    if (currentPage === 'AppList') {
      setCurrentPage('TradeLicense');
    } else if (currentPage === 'TradeLicense') {
      setCurrentPage('DocumentUpload');
    } else if (currentPage === 'DocumentUpload') {
      setCurrentPage('PreviewApp');
    }
    else if (currentPage === 'PreviewApp') {
      setCurrentPage('PaymentPage');
    }
  };

  const handleBack = () => {
    if (currentPage === 'TradeLicense') {
      setCurrentPage('AppList');
    } else if (currentPage === 'DocumentUpload') {
      setCurrentPage('TradeLicense');
    } else if (currentPage === 'PreviewApp') {
      setCurrentPage('DocumentUpload');
    }
    else if (currentPage === 'PaymentPage') {
      setCurrentPage('PreviewApp');
    }
  };

  const handleView = () =>{
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
              {currentPage === 'AppList' && <AppList onNext={handleNext} onView={handleView}/>}
              {currentPage === 'TradeLicense' && <TradeLicense onBack={handleBack} onNext={handleNext} />}
              {currentPage === 'DocumentUpload' && <DocumentUpload onBack={handleBack} onNext={handleNext} module="NewTL"/>}
              {currentPage === 'PreviewApp' && <PreviewApp onBack={handleBack} onNext={handleNext} applicationNo={application} ulb= {ulb} applicaitonType= "CLOSURE"/>}
              {currentPage === 'PaymentPage' && <PaymentPage onBack={handleBack} />}
              <Footer />
          </div>
        </>
      ) : ''}
     
    </div>
  );  
};

export default Registration;
