import React from 'react'
import Auxiliary from '../../../hoc/Auxiliary'
import classes from './Navigation.modules.css'

const navigation = props => {
  let classList = []

  if (props.collapsed) {
    classList = [classes.navbar__expand]
  } else {
    classList = [classes.navbar__links]
  }

  return (
    <div className={classList.join(' ')}>
      <div className={classes.navbar__single}>About us</div>
      <div className={classes.navbar__single}>Where to find us</div>
      <div className={classes.navbar__single}>Latest news</div>
    </div>
  )
}

export default navigation
