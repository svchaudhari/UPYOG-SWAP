import React, { Component } from "react";
import { Stairs } from "./Services/Stairs";
import { Calculator } from "./Services/Calculator";
import { Devices } from "./Services/Devices";
import { Fingerprint } from "./Services/Fingerprint";
import { Mappinline } from "./Services//Mappinline";

export default class Services extends Component {
  render() {
    return (
      <div>
        <div className="accent-nutural-color pb-20">
          <div className="container">
            <div
              data-vc-full-width="true"
              data-vc-full-width-init="false"
              className="row mt-20"
            >
              <div className="col">
                <div className="col-md-4">
                  <div className="div-4 bg-light-gray">
                    <div className="service-text-wrapper">
                      <u> <b>Citizen</b></u>
                    </div>
                    <p className="service-description">
                      Explore a wide range of services designed to meet the
                      needs of our community, from property tax payments to
                      waste management and more.
                    </p>
                    <div className="service-text-wrapper-2"></div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="div-4  bg-light-blue">
                    <div className="service-text-wrapper">
                      <u><b>Business</b></u>
                    </div>
                    <p className="service-description">
                      Find essential services and resources tailored to support
                      the growth and operation of businesses within our
                      municipality.
                    </p>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="div-4  bg-light-purple">
                    <div className="service-text-wrapper">
                      <u><b>Licenses & Permissions</b></u>
                    </div>
                    <p className="service-description">
                      Obtain the necessary licenses and permissions to ensure
                      compliance with municipal regulations for your business or
                      personal projects
                    </p>
                    <div className="service-text-wrapper-2">
                      <Devices className="devices-instance device-img" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              data-vc-full-width="true"
              data-vc-full-width-init="false"
              className="row mt-20"
            >
              <div className="col">
                <div className="col-md-4">
                  <div className="div-4  bg-light-orange">
                    <div className="service-text-wrapper">
                      <u><b>Fee Calculator</b></u>
                    </div>
                    <p className="service-description">
                      Quickly estimate your fees for municipal services using
                      our online fee calculator. Enter the relevant information
                      to receive accurate fee calculations in seconds, making
                      your transactions more transparent and hassle-free
                    </p>
                    <div className="service-text-wrapper-2">
                      <Calculator className="calculator-instance device-img" />
                    </div>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="div-4  bg-light-pink">
                  <div className="service-text-wrapper">
                      <u><b>Bookings</b></u>
                    </div>
                    <p className="service-description">
                      Reserve public spaces, community halls, and other
                      municipal facilities easily through our online booking
                      system.
                    </p>
                    <div className="service-text-wrapper-2">
                      <Mappinline className="icon-instance-node device-img" />
                    </div>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="div-4 bg-light-green">
                  <div className="service-text-wrapper">
                      <u><b>Public Grievance</b></u>
                    </div>
                    <p className="service-description">
                    Report, Track, Resolve: Your Grievance, Our Priority.
                    </p>

                    <div className="service-text-wrapper-2">
                      <Fingerprint className="icon-instance-node device-img" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
