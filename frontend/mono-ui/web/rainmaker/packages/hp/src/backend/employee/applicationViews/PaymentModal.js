import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { APICall } from "../../../utils/api";
import { CommonFunctions } from "../../../utils/CommonFunctions";
import { showAlert } from "../../../utils/Alerts";
import { useNavigate } from 'react-router-dom';
import  PaymentTable from './../../services/payments/PaymentTable.js';
const PaymentModal = ({ applicationNo, serviceName}) => {
  const [show, setShow] = useState(false);
  const [paymentDetails, setPaymentDetails]= useState([]);
  const handleClose = () => setShow(false);
  const { updateNewTLStatus, getPaymentDetails,updateNewGarbageStatus }=CommonFunctions();
  const navigate = useNavigate();
  const returnToInitiator = async (e) =>{
    let response='';
    switch (serviceName) {
        case "NewTL":
          response = await updateNewTLStatus(applicationNo, "Payment details have been updated", 'RETURN_TO_INITIATOR_FOR_PAYMENT');
          break;
        case "GarbageCollection":
          response = await updateNewGarbageStatus(applicationNo, "Payment details have been updated", 'RETURN_TO_INITIATOR_FOR_PAYMENT');
          break;
        default:
          break;
      }
      if (response && response.ResponseInfo && response.ResponseInfo.status === "successful") {
        showAlert(
          "Success",
          "Application has been updated successfully",
          "success"
        );
        navigate('/backend');
      } else {
        showAlert(
          "Error",
          "Could not update. Please try again",
          "error"
        );
      }
  }
  useEffect(() => {
    const fetchPaymentDetails = async () => {
      const accountId='';
      try {
        let paymentDetails = await getPaymentDetails(serviceName,applicationNo,accountId);
        console.log(paymentDetails);
        if(paymentDetails.applicationDetails[0]){
            setPaymentDetails(paymentDetails.applicationDetails);
            setShow(true);
         }
         else{
          showAlert("Error", "No Payment Details found1", "error");
         }
      } catch (error) {
        showAlert("Error", "No Payment Details found2", "error");
      }
    };
    fetchPaymentDetails();
  }, [serviceName, applicationNo]);




  return (
    <>
      <Modal
        show={show}
        size="lg"
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Application Fee: { applicationNo }</Modal.Title>
        </Modal.Header>
        <Modal.Body>
           <PaymentTable paymentDetails={paymentDetails} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={returnToInitiator}>Request for Payment</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default PaymentModal;
