import React, { useEffect } from 'react';
import $ from 'jquery';
import 'flexslider/flexslider.css';
import 'flexslider/jquery.flexslider';
import './../assets/css/custom.css'
import Slider1 from './../assets/images/slider/image1.jpg';
import Slider2 from './../assets/images/slider/image2.jpg';
import Slider3 from './../assets/images/slider/image3.jpg';

const FlexSliderComponent = () => {
  useEffect(() => {
    $(document).ready(function() {
      $('.flexslider').flexslider({
        animation: 'slide',
        controlNav: true,
        directionNav: true,
        slideshowSpeed: 7000,
        animationSpeed: 600,
        initDelay: 0,
        randomize: false,
      });
    });
  }, []);

  return (
    <div>
      <section className="apply-in-home slider-max-height">
        <div className="" id="row-content">
          <div className='row'>
            <div className='col-lg-12'>
              <div className="flexslider">
                <ul className="slides">
                 
                  <li>
                    <img src={Slider2} alt="Slide 1" />
                     <div className="text-overlay">
                      <h2>हमारा शहर<span className='inner-text'>, हमारी पहचान </span></h2>
                      <h2 className='inner-text-sub'></h2>
                     </div>
                  </li>
                  <li>
                    <img src={Slider2} alt="Slide 1" />
                     <div className="text-overlay">
                      <h2>शहर की खुशहाली <span className='inner-text'>हमारी भागीदारी</span></h2>
                     </div>
                  </li> 
                  <li>
                    <img src={Slider2} alt="Slide 1" />
                     <div className="text-overlay">
                      <h2>आपकी सुविधा<span className='inner-text'>, हमारी प्राथमिकता|</span></h2>
                     </div>
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

export default FlexSliderComponent;
