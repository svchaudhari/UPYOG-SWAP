import React, { Component } from 'react';
import accessibilityIcon from './../assets/images/accessibility_icon.svg';

import HimachalPradeshLogo from './../assets/images/hplogo.png'
import CitijanSeva from './../assets/images/citijanseva.png'
import CitijanSevaLogo from './../assets/images/citijansevaLgo.png'
import UDDLogo from './../assets/images/logoUDDHP.png'


export default class LogoBar extends Component {
  render() {
    return (
      <div>
        <div className="header-wrapper">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-md-8 col-sm-8 col-xs-7">
                <div className="logo">
                  <a href="/" title="Go to home" className="site_logo" rel="home">
                    <img id="logo" className="emblem image image-responsive" src={ HimachalPradeshLogo } alt="Himachal Pradesh"
                    />
                    <div className="logo_text">
                    <img id="logo" className="emblem citijan-logo image image-responsive" src={ CitijanSeva } alt="Himachal Pradesh"
                    />
                      <h1 className="h1-logo">
                        Department of Urban Development
                      </h1>
                      {/* <h4>Government of Himachal Pradesh</h4> */}
                    </div>
                  </a>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-4 col-xs-5">
                   
                    <img
                      id="logo"
                      className="emblem img img-responsive dept-logo pull-right"
                      src={ CitijanSevaLogo }
                      alt="Himachal Pradesh"
                    />
                     <img
                      id="logo"
                      className="emblem img img-responsive dept-logo pull-right"
                      src={ UDDLogo }
                      alt="Himachal Pradesh"
                    />
                <a className="menuToggle" href="javascript:void(0);">
                  <span className="icon-menu" aria-hidden="true"> </span>
                  <span className="menu-text">Menu Toggle </span>
                </a>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    );
  }
}
