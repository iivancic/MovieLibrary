import React from 'react';
import classes from './modal.module.css'


const modal = (props) => {
    return (
        <div>
            <div className={classes.Modal} style={{ opacity: props.modalVisibility ? '1' : '0' }}>

                <p> Are you sure you want to save changes? </p>
                <div className={classes.modalButtons}>
                    <button className={classes.button} onClick={props.clickedCancel}>Cancel</button>
                    <button className={classes.button} onClick={props.clickedContinue} >Continue</button>
                </div>
            </div>
        </div>
    )
}


export default modal;