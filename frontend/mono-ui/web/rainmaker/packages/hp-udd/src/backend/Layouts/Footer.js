import React, { Component } from 'react'
export default class Footer extends Component {
    render() {
        return (
            <div>
                <footer className="main-footer">
                   <strong>Copyright © {new Date().getFullYear()} <a href="#"> { process.env.REACT_APP_NAME } </a>.</strong>

                    All rights reserved.
                    <div className="float-right d-none d-sm-inline-block">
                        <b>Version</b> { process.env.REACT_APP_VERSION }
                    </div>
                </footer>
            </div>
        )
    }
}
