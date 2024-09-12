import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Row,
} from "react-bootstrap";
import { APICall } from "../../../utils/api";
import { CommonFunctions } from "../../../utils/CommonFunctions";
import './../../assets/dist/css/PreviewApp.css';

const ApplicationHistory = ({ applicationNo }) => {
  const [appHistory, setAppHistory] = useState([]);
  const [historyCount, setHistoryCount] = useState(1);
  const { formatDate, parseStatus,getStatusRowClass } = CommonFunctions();
  useEffect(() => {
    (async () => {
      const postData = {
        RequestInfo: {
          apiId: process.env.REACT_APP_APIID,
          authToken: localStorage.getItem("token"),
          userInfo: JSON.parse(localStorage.getItem("userInfo")),
        },
      };
      try {
        const response = await APICall(
          `${
            process.env.REACT_APP_WORKFLOW
          }/egov-workflow-v2/egov-wf/process/_search?history=true&businessIds=${applicationNo}&tenantId=${
            JSON.parse(localStorage.getItem("userCurrentRole")).tenantId
          }`,
          "POST",
          JSON.stringify(postData),
          { "Content-Type": "application/json" }
        );
        if (response.ProcessInstances) {
          setAppHistory(response.ProcessInstances);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  }, [applicationNo]); 

   

  return (
    <>
      <Card border="primary" className="mb-4 shadow-sm card-common">
        <CardHeader className="card-header-common card-header">
         Application History
        </CardHeader>
        <CardBody>
          <Row>
            <Col xs={12}>
              <div className="">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Sr. No.</th>
                      <th>Remarks/Comments</th>
                      <th>Action</th>
                      <th>User</th>
                      <th>Role</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(appHistory) && appHistory.length > 0 ? (
                      appHistory.filter((history) =>
                         history.action != "INITIATE"
                      )
                      .map((history, index) => (
                        <tr className={getStatusRowClass(history.action)}>
                          <td>{historyCount + index}</td>
                          <td>{history.comment || "--"}</td>
                          <td>{ parseStatus(history.action) || "--"}</td>
                          <td>{history.assigner.name || "--"}</td>
                          <td>{history.role || "--"}</td>
                          <td>
                            {history.auditDetails.createdTime
                              ? formatDate(history.auditDetails.createdTime)
                              : "--"}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6">No application history available.</td>
                      </tr>
                    )}
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

export default ApplicationHistory;
