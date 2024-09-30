import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Container, Row, Col, Card, Button, CardHeader, CardTitle, CardBody } from "react-bootstrap";
import { AuthContext } from "../../../utils/AuthContext";
import { CommonFunctions } from "../../../utils/CommonFunctions";
import Layout from "../../Layouts";
import Footer from "../../Layouts/Footer";
import { showAlert } from "../../../utils/Alerts";
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import PaymentTable from "./PaymentTable";
//import { RotatingLines } from 'react-loader-spinner';

import hdfclogo from "./../../assets/dist/img/credit/mastercard.png";
import pnblogo from "./../../assets/dist/img/credit/visa.png";
import icicilogo from "./../../assets/dist/img/credit/cirrus.png";
import axislogo from "./../../assets/dist/img/credit/paypal.png";
import PageHeading from "../../../components/PageHeading";
import StepProgress from "../../../components/StepProgress";
import { useNavigate } from 'react-router-dom';
import { TradeLicenseSubmission } from "../tradeLicense/registration/TradeLicenseSubmission";

const Payments = ({  onNext, module }) => {
  const [searchParams] = useSearchParams();
  const { user, userType } = useContext(AuthContext);
  const { getPaymentDetails, loadScript, initiateTransaction, updateTransaction  } = CommonFunctions();
  const [paymentDetails, setPaymentDetails] = useState([]);
  const [activeStep, setActiveStep] = useState(4);
  const [billId, setBillId] = useState("");
  const [billAmount, setBillAmount] = useState(0);
  const navigate = useNavigate();
  const { submitTradeApplication } = TradeLicenseSubmission();
  
  const application = searchParams.get("application") ? atob(searchParams.get("application")) : null;
  const service = searchParams.get("service") ? atob(searchParams.get("service")) : null;
  const ID = searchParams.get("id")? atob(searchParams.get("id")): null;

  const handleNextClick = async() => {
    const res = await loadScript(
        process.env.REACT_APP_RAZOR_PAY_SCRIPT_URL
    );
    if (!res) {
        showAlert("Error", "Failed to load payment gateway, seems you are?", "error");
        return;
    }
    // CALL backend API to generate Demand which will return order details
    // module, appID, billId, billAmount, taxAmount, gateway='RAZORPAY'
    const result = await initiateTransaction('NewTL', application, billId, billAmount); 
    if (!result) {
        showAlert("Error", "Failed to load payment Details, seems you are?", "error");
        return;
    }

    
    let OrderID=result.Transaction.orderId;
    let amount = result.Transaction.txnAmount;
    let userName= result.Transaction.user.name;
    let userEmail= result.Transaction.user.emailId;
    let userMobile= result.Transaction.user.mobileNumber;
    let callbackUrl= result.Transaction.callbackUrl;
    const options = {
        key: process.env.REACT_APP_RAZOR_PAY_SECRET_KEY, // Enter the Key ID generated from the Dashboard
        amount: amount,
        currency: process.env.REACT_APP_RAZOR_PAY_CURRENCY,
        name: userName,
        description: `Payment for ${module} for Application ${result.Transaction.consumerCode}` ,
        image: process.env.REACT_APP_RAZOR_PAY_LOGO,
        order_id: OrderID,
        handler: async function (response) {
          const queryParameters = `&razorpay_payment_id=${response.razorpay_payment_id}&razorpay_order_id=${response.razorpay_order_id}&razorpay_signature=${response.razorpay_signature}` ;
          const transUpdateResponse =  await updateTransaction(callbackUrl, queryParameters) ;
          if(!transUpdateResponse){
            showAlert("Error", "Could not update transaction?", "error");
            return;
          }
          if(transUpdateResponse.Transaction[0].txnStatus &&  transUpdateResponse.Transaction[0].txnStatus=== 'FAILURE'){
            showAlert("Error", "Transaction Failed. Please try again ", "error");
            return;
          }
          else if(transUpdateResponse.Transaction[0].txnStatus &&  transUpdateResponse.Transaction[0].txnStatus=== 'SUCCESS'){
            const response = await submitTradeApplication(ID,"NEW", service ,"FORWARD_TO_APPROVER",application);
            if(response && response.ResponseInfo && response.ResponseInfo.status==="successful"){
              showAlert(
                "Success",
                "Application has been submitted successfully with application number " + application,
                "success"
              );
              localStorage.removeItem("ID");
              localStorage.removeItem("applicationNumber");
              localStorage.removeItem("businessService");
              localStorage.removeItem("module");
              localStorage.removeItem("ULB");
              navigate('/backend');
            }else{
              showAlert(
                "Error",
                "Something went wrong. Please try again.",
                "error"
              );
            }
          }
          else{
            showAlert("Error", "Transaction is in pending state. Please try after 30 mins ", "error");
            return;
          }
            
          console.log(transUpdateResponse);
        },
        prefill: {
            name: userName,
            email: userEmail,
            contact: userMobile,
        },
        notes: {
            address: `Payment for ${module} for Application ${result.Transaction.consumerCode} with Bill ID ${result.Transaction.billId}`,
        },
        theme: {
            color: "#61dafb",
        },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };
  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        let paymentDetails = await getPaymentDetails(service,application);
        if(paymentDetails.applicationDetails[0]){
            setPaymentDetails(paymentDetails.applicationDetails);
            setBillId(paymentDetails.applicationDetails[0].billDetails.billId);
            setBillAmount(paymentDetails.applicationDetails[0].totalPayableAmount);
         }
      } catch (error) {
        showAlert("Error", "No Payment Details found", "error");
      }
    };

    fetchPaymentDetails();
  }, [service, application, ID]);

  return (
    <>
      {user && userType === "CITIZEN" ? (
        <>
          <div className="wrapper">
            <Layout />
            <div className="content-wrapper">
              <Container fluid>
                <PageHeading headingText=" Pay Now"></PageHeading>
                <div className="container-div">
                  <StepProgress activeStep={activeStep}></StepProgress>
                </div>
                <div className="container-fluid">
                  <Card>
                    <CardHeader>
                      <CardTitle> Payee Details</CardTitle>
                    </CardHeader>
                    <CardBody>
                      <Row className="d-flex align-items-center">
                        <Col md={5} className="d-flex flex-column ml-5 mt-4">
                          <h5>From:</h5>
                          <strong>{ paymentDetails[0]?.userDetails?.UserName || '--'}</strong>
                          <div className="d-flex align-items-start">
                            <FaMapMarkerAlt className="mr-2 mt-1" />
                            <span>
                            {paymentDetails[0]?.userDetails?.Address || '--'}
                            </span>
                          </div>
                          <div className="d-flex align-items-center my-1">
                            <FaEnvelope className="mr-2" />
                            <span> {paymentDetails[0]?.userDetails?.Email || '--'}</span>
                          </div>
                          <div className="d-flex align-items-center my-1">
                            <FaPhoneAlt className="mr-2" />
                            <span>{paymentDetails[0]?.userDetails?.Email || '--'}</span>
                          </div>
                        </Col>
                        <Col
                          md="auto"
                          className="d-flex justify-content-center  mt-4"
                        >
                          <div
                            style={{
                              height: "200px",
                              width: "1px",
                              backgroundColor: "#ccc",
                            }}
                          />
                        </Col>
                        <Col md={5} className="d-flex flex-column ml-5 mt-4">
                          <h5>To:</h5>
                          <strong>{process.env.REACT_APP_DEPT_NAME}</strong>
                          <div className="d-flex align-items-start">
                            <FaMapMarkerAlt className="mr-2 mt-1" />
                            <span>
                              Pallika Bhawa, Directorate of Urban Development Department, Shimla, Himachal Pradesh
                            </span>
                          </div>
                          <div className="d-flex align-items-center my-1">
                            <FaEnvelope className="mr-2" />
                            <span>ud-hp[at]nic[dot]in</span>
                          </div>
                          <div className="d-flex align-items-center my-1">
                            <FaPhoneAlt className="mr-2" />
                            <span>19999</span>
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle> Payment Details</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <PaymentTable paymentDetails={paymentDetails} />
                    </CardBody>
                  </Card>
                  <Card>
                    <CardBody>
                        <img className="img card-options" src={hdfclogo} variant="top" /> 
                        <img className="img card-options" src={pnblogo} variant="top" /> 
                        <img className="img card-options" src={icicilogo} variant="top" /> 
                        <img className="img card-options" src={axislogo} variant="top" /> 
                    </CardBody>
                  </Card>
                  <Row className="justify-content-end pb-15">
                    <Col xs="auto" style={{ paddingRight: "1rem" }}>
                      <Button
                        style={{
                          backgroundColor: "#49627E",
                          borderColor: "#49627E",
                          width: "115px",
                        }}
                        onClick={handleNextClick}
                      >
                        Pay Now
                      </Button>
                    </Col>
                  </Row>
                </div>
              </Container>
            </div>
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
};

export default Payments;
