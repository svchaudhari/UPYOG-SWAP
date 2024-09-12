import React, { Component } from 'react'
import TopHeader from './TopHeader'
import LogoBar from './LogoBar'
import Menu from './Menu'

export default class Header extends Component {
  render() {
    return (
      <div>
        <header id="mainHeader">
          <TopHeader />
          <LogoBar />
          <Menu />
        </header>
      </div>
    );
  }
}
