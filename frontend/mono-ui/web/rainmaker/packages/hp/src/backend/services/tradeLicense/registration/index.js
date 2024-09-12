import React, { useContext,useEffect,useState } from 'react'
// import files
import Layout from './../../../Layouts';

import { AuthContext } from "./../../../../utils/AuthContext";
import TradeLicense from './TradeLicense';
import Footer from "./../../../Layouts/Footer";
import AppList from './../../../dashboard/AppList'
import DocumentUpload from '../../documentUpload';
import PreviewApp from './PreviewApplication';
import { CommonFunctions } from '../../../../utils/CommonFunctions';

import { useSearchParams } from 'react-router-dom';

const Registration = () => {

  const [searchParams] = useSearchParams();
  const { getTLApplicationData }= CommonFunctions();
  const appNo = searchParams.get('application') ? atob(searchParams.get('application')) : null;
  const ulb = searchParams.get('ulb') ? atob(searchParams.get('ulb')) : null;
  const [fetchTrdData, setFetchTrdData] = useState([]);

  const { user, userType} = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState('TradeLicense');

  useEffect(() => {
    if(appNo && ulb){
      const fetchData = async () => {
        console.log("calling API");
        try {
          let uri =`?tenantId=${process.env.REACT_APP_TENANTID}.${ulb}&applicationNumber=${appNo}`;
          const appData = await getTLApplicationData(uri);
          if(appData.ResponseInfo.status && appData.ResponseInfo.status==="successful"){
              setFetchTrdData(appData.Licenses[0]);
          }else{
            showAlert(
              "Error",
              "Something went wrong. Could not connect with server",
              "error"
            );
          }
        } catch (error) {
          console.error("Error fetching trade license data:", error);
        }
      };
      fetchData();
    }
  }, [ulb, appNo]);



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
              {currentPage === 'TradeLicense' && <TradeLicense onBack={handleBack} onNext={handleNext} tLData={fetchTrdData} />}
              {currentPage === 'DocumentUpload' && <DocumentUpload onBack={handleBack} onNext={handleNext} module="NewTL"/>}
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
