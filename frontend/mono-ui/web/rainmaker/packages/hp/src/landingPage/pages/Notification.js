import React, { Component } from "react";
import { Notifications } from "./Notifications";
export default class Notification extends Component {
  render() {
    return (
      <div className="accent-secondary-color pb-20">
        <div className="container">
          <div
            data-vc-full-width="true"
            data-vc-full-width-init="false"
            className="row mt-20"
          >
            <div className="col-md-6">
              <h1>News & Notifications </h1>
              <div className="">
                <a className="view-all" href="">
                  View All
                </a>
              </div>
              <Notifications />
            </div>
            <div className="col-md-6">
              <div className="video-container">
                <iframe
                  src="https://www.youtube.com/embed/_yxD9Wjqkfw?si=w6VEK4mAW1p2eBnQ" // Replace with your video URL
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
