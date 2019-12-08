import React, { Component } from 'react'
import classes from './header.module.css'
import Menu from './Menu/Menu'
import Navigation from './Navigation/Navigation'
import AppName from './AppName/AppName'

class Header extends Component {
    state = {
      navShow : false,
      menuClicked : false
    }

    toggleHeader= (state) =>{
      let navItem = this.state.navShow
      let menu = this.state.menuClicked
      this.setState({navShow : !navItem})
      this.setState({menuClicked: !menu})
      }

  render () {
    
    
    return (
      
      <div className={classes.Header}>
      {/*
        <Menu clicked={this.toggleHeader} menuClicked={this.state.menuClicked}/>
        <Navigation collapsed={this.state.navShow}></Navigation>
        {/*<AppName/>*/}
      </div>
    )
  }
}

export default Header
