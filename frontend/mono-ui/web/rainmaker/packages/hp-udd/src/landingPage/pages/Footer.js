import React, { Component } from 'react';
import { VisitorCount } from './VisitorCount';

export default class Footer extends Component {
  render() {
    return (
      <footer id="footer2" className="footer-home pb-20 pt-20">
        <div className="container">
          <div className="row">
            <div className="col-md-5">
              <p>&copy; 2023 {process.env.REACT_APP_DEPT_NAME} All rights reserved.</p>
            </div>
            <div className="col-md-4">
              <p className='text-center '><a href='' className='white text-center'>Privacy Policy</a></p>
            </div>
            <div className="col-md-3">
              <p className='pull-right'><VisitorCount /></p>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}
