import React, { Component } from 'react'
import Slider from './Slider'
import AboutUs from './AboutUs'
import Services from './Services'
import ApplicationProcess from './ApplicationProcess'
// import ApplicationDetails from './ApplicationDetails'
import ImportantLinks from './ImportantLinks'
import Footer from './Footer'
import Notification from './Notification'

export default class MainContainer extends Component {
  render() {
    return (
      <div className='style-1'>
        <main role="main" className="flex-shrink-0">
          <div className="container">
            <div id="SkipContent" />
            </div>
            <Slider />
            <AboutUs />
            <Services />
            <ApplicationProcess />
            <Notification />
            <ImportantLinks />
            <Footer />
        </main>
      
      </div>
    );
  }
}
