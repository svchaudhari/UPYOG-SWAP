import React, { useContext,useEffect,useState } from 'react'
// import files
import Layout from './../../../Layouts';
import { AuthContext } from "./../../../../utils/AuthContext";
import Footer from "./../../../Layouts/Footer";
import PreviewApp from './PreviewApplication';
import { CommonFunctions } from '../../../../utils/CommonFunctions';
import { useSearchParams } from 'react-router-dom';
import SiteRegistration from './SiteRegistration';

const Registration = () => {
  const { user, userType} = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState('SiteRegistration');

  const handleNext = () => {    
    if (currentPage === 'SiteRegistration') {
        setCurrentPage('PreviewApp');
    } else if (currentPage === 'PreviewApp') {
      //setCurrentPage('ListSites');
    }
  };

  const handleBack = () => {
    
    if (currentPage === 'SiteRegistration') {
      setCurrentPage('DocumentUpload');
    } else if (currentPage === 'DocumentUpload') {
      setCurrentPage('AppList');
    } else if (currentPage === 'PreviewApp'){
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
              {currentPage === 'SiteRegistration' && <SiteRegistration  onBack={handleBack} onNext={handleNext}  />}
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