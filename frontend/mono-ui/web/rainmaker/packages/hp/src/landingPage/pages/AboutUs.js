import React, { Component } from "react";
import AboutImg from "./../assets/images/AboutImg.svg";
import CitijanSevaLogo from "./../assets/images/citijansevaLgo.png";

export default class AboutUs extends Component {
  render() {
    return (
      <div className="accent-secondary-color pb-20 pt-20">
        <div className="container">
          <div
            data-vc-full-width="true"
            data-vc-full-width-init="false"
            className="row"
          >
            <div className="col-md-2">
              <img src={CitijanSevaLogo} title="CitiJan Seva" className="AboutUs-Logo"/>
              <h1>One State One Portal</h1>
              
            </div>
            <div className="col-md-10">
              <p className="about-text">
              The Citijan Seva portal, implemented on the UPYOG platform, offers several benefits to municipalities and citizens:
              </p>
              <p>
             <ul>
                <li><b>Unified Access:</b> Provides a single, integrated platform for accessing a wide range of municipal services, making it easier for citizens to interact with their local government.
                </li>
                <li><b> Streamlined Processes: </b>Simplifies administrative procedures by centralizing various services like NOCs, licenses, and permissions, reducing the time and effort required for approvals.
                
                </li><li><b>Enhanced Transparency:</b> Facilitates greater transparency and accountability by offering real-time tracking of service requests, applications, and approvals.
                
                </li><li><b>Improved Efficiency: </b>Reduces duplication of effort across different municipalities by standardizing processes and data management, leading to more efficient service delivery.
                
                </li><li><b> Citizen Empowerment:</b>  Empowers citizens by providing 24/7 access to services and information, allowing them to engage with municipal services at their convenience.
             
             </li></ul>
                
                </p>
            </div>
            
          </div>
        </div>
      </div>
    );
  }
}
