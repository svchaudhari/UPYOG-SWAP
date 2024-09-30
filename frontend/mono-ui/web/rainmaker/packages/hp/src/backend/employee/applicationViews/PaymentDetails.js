import { useState, useEffect } from "react";
import { CommonFunctions } from "../../../utils/CommonFunctions";
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from "react-bootstrap";

import './../../assets/dist/css/PreviewApp.css';
const PaymentDetails = ({ applicationNo }) => {
  const { getTransactionDetails,formatDate } = CommonFunctions();
  const [transactionDetails, setTransactionDetails] = useState([]);
  useEffect(() => {
    const fetchTransactionDetails = async () => {
      try {
        let transactionDetails = await getTransactionDetails(`consumerCode=${applicationNo}`);
        console.log(transactionDetails);
        if (transactionDetails.Transaction[0]) {
          setTransactionDetails(transactionDetails.Transaction);
        }
      } catch (error) {
        // showAlert("Error", "No Payment Details found", "error");
      }
    };
    fetchTransactionDetails();
  }, [applicationNo]);

  return (
    <>
      <Card border="primary" className="mb-4 shadow-sm card-common">
        <CardHeader className="card-header-common card-header">
          Payment Details
        </CardHeader>
        <CardBody>
          <Row>
            <Col xs={12}>
              <div className="">
                <table className="table">
                  <thead>
                  {/* txnId, txnAmount, gateway, txnStatus, gatewayTxnId, lastModifiedTime, additionalDetails.ORDER_ID */}
                    <tr>
                      <th>Sr. No.</th>
                      <th>Order ID</th>
                      <th>Transaction ID</th>
                      <th>Gateway Txn ID</th>
                      <th>Gateway</th>
                      <th>Status</th>
                      <th>Txn Date</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactionDetails.map((txnDetails, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{txnDetails.additionalDetails.ORDER_ID}</td>
                        <td>{txnDetails.txnId}</td>
                        <td>{txnDetails.gatewayTxnId}</td>
                        <td>{txnDetails.gateway}</td>
                        <td>{txnDetails.txnStatus}</td>
                        <td>{formatDate(txnDetails.auditDetails.lastModifiedTime)}</td>
                        <td>{txnDetails.txnAmount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </>
  );
};
export default PaymentDetails;
