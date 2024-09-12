import React, { Component } from "react";
import SocialMedia from './../assets/images/social_media.svg';
import facebookIcon from './../assets/images/facebook_icon.svg';
import siteMap from './../assets/images/sitemap.svg';
import accessibilityIcon from './../assets/images/accessibility_icon.svg';

export default class TopHeader extends Component {
  render() {
    return (
      <div>
        <div id="topBar">
          <div className="container">
            <div className="row">
              <div className="col-xs-12">
                <div className="push-right" aria-label="Primary">
                  <div id="accessibility">
                    <ul id="accessibilityMenu" className="clearfix">
                      <li>
                        <a
                          href="#SkipContent"
                          className="skipContent"
                          aria-label="Skip to main content"
                          title="Skip to main content"
                        >
                          <span className="m-hide">Skip to main content </span>
                          <span className="icon-skip-to-main m-show"> </span>
                        </a>
                      </li>
                      <li className="social-media">
                        <a
                          href="javascript:void(0);"
                          className="social-group-icon"
                          title="Social Media Links"
                          aria-label="Social Media Links"
                          role="button"
                          data-toggle="dropdown"
                        >
                          <img
                            className="show-con"
                            src={SocialMedia}
                            title="Social Icon"
                            alt="Social Icon"
                          />
                          <span className="hide">Social Media Links </span>
                        </a>
                        <ul className="socialIcons">
                          <li>
                            <a
                              href="https://www.facebook.com/CMOFFICEHP"
                              target="_blank"
                              aria-label="Facebook | External site that opens in a new window"
                            >
                              <img
                                src={facebookIcon}
                                title="Facebook | External site that opens in a new window"
                                alt="Facebook, External Link that opens in a new window"
                              />
                            </a>
                          </li>
                          {/* Add other social media icons similarly */}
                        </ul>
                      </li>
                      <li className="top-sitemap">
                        <a
                          href="./../pages/sitemap"
                          aria-label="Sitemap"
                          title="Sitemap"
                        >
                          <img
                            className="show-con"
                            src={siteMap}
                            title="Sitemap Icon"
                            alt="Sitemap Icon"
                          />
                          <span className="hide">Sitemap</span>
                        </a>
                      </li>
                      <li>
                        <a
                          href="javascript:void(0);"
                          title="Accessibility Links"
                          aria-label="Accessibility Links"
                          className="accessible-icon"
                          role="button"
                          data-toggle="dropdown"
                        >
                          <span className="tcon">Accessibility Links </span>
                          <img
                            className="show-con"
                            src={accessibilityIcon}
                            title="Accessibility Icon"
                            alt="Accessibility Icon"
                          />
                        </a>
                        <ul
                          className="accessiblelinks textSizing"
                          aria-label="Font size and Contrast controls"
                        >
                          <li className="fontSizeEvent">
                            <a
                              data-selected-text="selected"
                              data-event-type="increase"
                              href="javascript:void(0);"
                              data-label="Font Size Increase"
                              title="Font Size Increase"
                              aria-label="Font Size Increase"
                            >
                              <span aria-hidden="true">A+ </span>
                              <span className="tcon">Font Size Increase </span>
                            </a>
                          </li>
                          <li className="fontSizeEvent">
                            <a
                              data-selected-text="selected"
                              data-event-type="normal"
                              href="javascript:void(0);"
                              data-label="Normal Font"
                              title="Normal Font"
                              aria-label="Normal Font"
                            >
                              <span aria-hidden="true">A </span>
                              <span className="tcon">Normal Font </span>
                            </a>
                          </li>
                          <li className="fontSizeEvent">
                            <a
                              data-selected-text="selected"
                              data-event-type="decrease"
                              href="javascript:void(0);"
                              data-label="Font Size Decrease"
                              title="Font Size Decrease"
                              aria-label="Font Size Decrease"
                            >
                              <span aria-hidden="true">A- </span>
                              <span className="tcon">Font Size Decrease </span>
                            </a>
                          </li>
                          <li className="highContrast dark tog-con">
                            <a
                              href="javascript:void(0);"
                              title="High Contrast"
                              aria-label="High Contrast"
                            >
                              <span aria-hidden="true">A </span>
                              <small className="tcon">High Contrast </small>
                            </a>
                          </li>
                          <li className="highContrast light">
                            <a
                              className="link-selected"
                              href="javascript:void(0);"
                              title="Normal Contrast - Selected"
                              aria-label="Normal Contrast - Selected"
                            >
                              <span aria-hidden="true">A </span>
                              <small className="tcon">Normal Contrast </small>
                            </a>
                          </li>
                        </ul>
                      </li>
                      <li className="languageCont" aria-label="Change Language">
                        <a
                          href="javascript:void(0);"
                          className="language link-selected"
                          aria-label="English - Selected"
                          title="English - Selected"
                          role="button"
                          data-toggle="dropdown"
                        >
                          English
                        </a>
                        <ul className="socialIcons">
                          <li className="lang-item lang-item-55 lang-item-hi mFocus">
                            <a
                              lang="hi"
                              hrefLang="hi-IN"
                              href
                              aria-label="हिन्दी"
                              title="हिन्दी"
                            >
                              हिन्दी
                            </a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="push-left">
                  <div className="govBranding">
                    <ul>
                      <li>
                        <a lang="en" href="#">
                          Helpline Number: +91-177-2626518
                        </a>
                      </li>
                    </ul>
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
