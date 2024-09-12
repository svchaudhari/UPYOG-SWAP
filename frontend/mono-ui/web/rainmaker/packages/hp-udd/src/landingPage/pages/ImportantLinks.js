import React, { useEffect } from 'react';
import $ from 'jquery';
import 'flexslider/flexslider.css';
import 'flexslider/jquery.flexslider';
import './../assets/css/custom.css';
import DigitalIndia from './../assets/images/implinks/digital-india.png';
import UPYOG from './../assets/images/implinks/Upyog-logo.png';
import DataGov from './../assets/images/implinks/DataGov.png';
import IncredibleIndia from './../assets/images/implinks/IncredibleIndia.png';
import IndiaGov from './../assets/images/implinks/IndiaGov.png';
import myGov from './../assets/images/implinks/myGov.png';
import PMIndia from './../assets/images/implinks/PMIndia.png';
import ftr_logo5 from './../assets/images/implinks/ftr_logo5.jpg';
import akam from './../assets/images/implinks/akam.png';
import g2o from './../assets/images/implinks/g2o.png';

const ImportantLinks = () => {
  useEffect(() => {
    $(document).ready(function() {
      $('.important-links').flexslider({
        animation: 'slide',
        controlNav: true,
        directionNav: false,
        slideshowSpeed: 7000,
        animationSpeed: 600,
        initDelay: 0,
        randomize: false,
        itemWidth: 150, // Set the item width to ensure proper display
        minItems: 1,
        maxItems: 10,
      });
    });
  }, []);

  return (
    <div>
      <section>
        <div id="row-content" className="container">
          <div className='row'>
            <div className='col-lg-12'>
              <div className="important-links">
                <ul className="slides">
                  <li>
                    <a href="https://www.digitalindia.gov.in/" target='_blank' rel="noopener noreferrer">
                      <img src={DigitalIndia} alt="Digital India" />
                    </a>
                  </li>
                  <li>
                    <a href="https://upyog.niua.org/" target='_blank' rel="noopener noreferrer">
                      <img src={UPYOG} alt="UPYOG" />
                    </a>
                  </li>
                  <li>
                    <a href="https://amrut.gov.in/" target='_blank' rel="noopener noreferrer">
                      <img src={ftr_logo5} alt="AMRUT" />
                    </a>
                  </li>
                  <li>
                    <a href="https://data.gov.in/" target='_blank' rel="noopener noreferrer">
                      <img src={DataGov} alt="Data Gov" />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.incredibleindia.org/content/incredible-india-v2/en.html" target='_blank' rel="noopener noreferrer">
                      <img src={IncredibleIndia} alt="Incredible India" />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.india.gov.in/" target='_blank' rel="noopener noreferrer">
                      <img src={IndiaGov} alt="India Gov" />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.mygov.in/" target='_blank' rel="noopener noreferrer">
                      <img src={myGov} alt="My Gov" />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.pmindia.gov.in/en/" target='_blank' rel="noopener noreferrer">
                      <img src={PMIndia} alt="PM India" />
                    </a>
                  </li>
                  <li>
                    <a href="https://amritmahotsav.nic.in/" target='_blank' rel="noopener noreferrer">
                      <img src={akam} alt="Ajadi ka Amrit Mahotasav" />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.g20.in/en/index.html" target='_blank' rel="noopener noreferrer">
                      <img src={g2o} alt="G20" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ImportantLinks;
