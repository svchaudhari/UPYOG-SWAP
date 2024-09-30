import React, { Component } from "react";
import { Signin } from "./ApplicationProcess/Icons/Signin/Signin";
import { WeightRegular4 } from "./ApplicationProcess/Icons/WeightRegular4";
import { Cloudarrowup } from "./ApplicationProcess/Icons/Cloudarrowup";
import { Currencyinr } from "./ApplicationProcess/Icons/Currencyinr";
import { Stacksimple } from "./ApplicationProcess/Icons/Stacksimple";
import { Downloadsimple } from "./ApplicationProcess/Icons/Downloadsimple";

export default class Services extends Component {
  render() {
    return (
      <div>
        <div className="accent-info-color pb-20">
          <div className="container">
            <div
              data-vc-full-width="true"
              data-vc-full-width-init="false"
              className="mt-20"
            >
              <h1 className="heading1">Application Process</h1>
              <div className="col-md-2">
                <div className="step step-1">
                  <div className="row">
                    <div className="heading-circle heading-circle-bg-blue"></div>
                    <div className="step-1-svg">
                      <Signin className="icon-instance-node" color="#334870" />
                    </div>
                  </div>
                  <div className="row">
                    <div className="">
                      <h2 className="process-heading">01</h2>
                    </div>
                    <p className="process-description">Registration Via SSO</p>
                  </div>
                </div>
              </div>
              <div className="col-md-2">
                <div className="step step-2">
                  <div className="row">
                    <div className="heading-circle heading-circle-bg-orange"></div>
                    <div className="step-1-svg">
                        <WeightRegular4 className="icon-instance-node" color="#C77C5C" />
                    </div>
                  </div>
                  <div className="row">
                    <div className="">
                      <h2 className="process-heading">02</h2>
                    </div>
                    <p className="process-description">Apply for Service</p>
                  </div>
                </div>
              </div>
              <div className="col-md-2">
                <div className="step step-3">
                  <div className="row">
                    <div className="heading-circle heading-circle-bg-dark-orange"></div>
                    <div className="step-1-svg">
                        <Cloudarrowup className="icon-instance-node-2" color="#CB6767" />
                    </div>
                  </div>
                  <div className="row">
                    <div className="">
                      <h2 className="process-heading">03</h2>
                    </div>
                    <p className="process-description">Upload mandatory Documents</p>
                  </div>
                </div>
              </div>
              <div className="col-md-2">
                <div className="step step-4">
                  <div className="row">
                    <div className="heading-circle heading-circle-bg-green"></div>
                    <div className="step-1-svg">
                        <Currencyinr className="icon-instance-node-2" />
                    </div>
                  </div>
                  <div className="row">
                    <div className="">
                      <h2 className="process-heading">04</h2>
                    </div>
                    <p className="process-description">Payment</p>
                  </div>
                </div>
              </div>
              <div className="col-md-2">
                <div className="step step-5">
                  <div className="row">
                    <div className="heading-circle heading-circle-bg-dark-red"></div>
                    <div className="step-1-svg">
                         <Stacksimple className="icon-instance-node-2" color="#D65757" />
                    </div>
                  </div>
                  <div className="row">
                    <div className="">
                      <h2 className="process-heading">05</h2>
                    </div>
                    <p className="process-description">Online application tracking</p>
                  </div>
                </div>
              </div>
              <div className="col-md-2">
                <div className="step step-6">
                  <div className="row">
                    <div className="heading-circle heading-circle-bg-purple"></div>
                    <div className="step-1-svg">
                     <Downloadsimple className="icon-instance-node-2" color="#A0568C" />
                    </div>
                  </div>
                  <div className="row">
                    <div className="">
                      <h2 className="process-heading">06</h2>
                    </div>
                    <p className="process-description">Download e-Signed Certificate/License</p>
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
