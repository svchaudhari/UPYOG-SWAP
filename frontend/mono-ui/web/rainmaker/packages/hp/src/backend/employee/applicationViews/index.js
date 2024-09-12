import React, { useContext, lazy,Suspense } from "react";
import { useSearchParams } from 'react-router-dom';
import { AuthContext } from "../../../utils/AuthContext";
import Layout from "../../Layouts";
import Footer from "../../Layouts/Footer";
import Documents from "./Documents";
import ApplicationHistory from "./ApplicationHistory";
import ApplicationActions from "./ApplicationActions";
import PaymentDetails from "./PaymentDetails";
import { Container } from "react-bootstrap";
const NewTradeLicense = lazy(() => import("./tradeLicense/NewTL"));
const NewRegistration = lazy(() => import("./garbageCollection/NewRegistration"));
const ApplicationViews = () => {
  const [searchParams] = useSearchParams();
  const { user, userType } = useContext(AuthContext);
  const application = searchParams.get('application') ? atob(searchParams.get('application')) : null;
  const service = searchParams.get('service') ? atob(searchParams.get('service')) : null;
  const id = searchParams.get('id') ? atob(searchParams.get('id')) : null;
  if (application && service) {
      return (
        <>
          {user && userType === "EMPLOYEE" ? (
            <>
              <Layout />
              <div className="content-wrapper d-flex flex-column" style={{ minHeight: "100vh", padding: "20px" }}>
              <Container fluid className="d-flex flex-column flex-grow-1">
                <Suspense fallback={<div>Loading...</div>}>
                {service === "NewTL" && <NewTradeLicense applicationNo={application} />}
                {service === "GarbageCollection" && <NewRegistration applicationNo={application} />}
                </Suspense>
                <PaymentDetails applicationNo = {application} />
                <Documents applicationNo={id} serviceName={service} />
                <ApplicationHistory applicationNo={application} />
                <ApplicationActions applicationNo={application} serviceName={service} />
              </Container>
              </div>
              <Footer />
            </>
          ) : (
            <>
             <Layout />
              <p>Unauthorized Access</p>  
              <Footer />

            </>
          )}
        </>
      );

  }
  return (
    <>
      <Layout />
      <p>Invalid or missing parameters</p>
      <Footer />
    </>
  );
};

export default ApplicationViews;
