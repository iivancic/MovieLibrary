import React, { Component } from 'react'
import classes from './Menu.module.css'

const menu = props => {
  let classList1 = [classes.bar]
  let classList2 = [classes.bar]
  let classList3 = [classes.bar]

  if (props.menuClicked === true) {
    classList1 = [classes.bar, classes.bar1]
    classList2 = [classes.bar, classes.bar2]
    classList3 = [classes.bar, classes.bar3]
  }

  return (
    <div className={classes.navbar__button} onClick={props.clicked}>
      <div className={classList1.join(' ')} />
      <div className={classList2.join(' ')} />
      <div className={classList3.join(' ')} />
    </div>
  )
}

export default menu
