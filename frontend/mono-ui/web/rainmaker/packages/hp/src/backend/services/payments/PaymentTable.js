import {React, useState, useEffect} from "react";
import "./PaymentTable.css";

const PaymentTable = ( { paymentDetails} ) => {
  const [count, setCount] = useState(1);
  const [totalPaymentAmount, setTotalPaymentAmount] =useState(0);
  useEffect(() => {
    if (Array.isArray(paymentDetails) && paymentDetails.length > 0) {
      const totalAmount = paymentDetails.reduce(
        (total, payment) => total + (payment?.totalPayableAmount || 0),
        0
      );
      setTotalPaymentAmount(totalAmount);
    }
  }, [paymentDetails]);

  return (
    <div className="">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Sr. No.</th>
            <th>Application No.</th>
            <th>Amount (in INR)</th>
            <th>Fee Calculations</th>
            <th>Penalty Amount (in INR)</th>
            <th>Tax</th>
            <th>Total Amount (in INR)</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(paymentDetails) && paymentDetails.length > 0 ? (
            paymentDetails
              .map((payment, index) => (
                <tr>
                  <td>{count + index}</td>
                  <td>{payment?.applicationNumber || "--"}</td>
                  <td>{payment?.totalPayableAmount || "--"}</td>
                  <td dangerouslySetInnerHTML={{ __html: payment?.feeCalculationFormula || "--" }} />
                  <td>{payment?.penalty || "0"}</td>
                  <td>{payment?.tax || "0"}</td>
                  <td>{payment?.totalPayableAmount || "0"}</td>
                </tr>
              ))
          ) : (
            <tr>
              <td colSpan="6">No payment details found.</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="total-amount">
        Total Payable Amount (in INR): {totalPaymentAmount.toLocaleString()}
      </div>
    </div>
  );
};

export default PaymentTable;