import React, { Component } from 'react';
import classes from '../../AdminPageStyles/Sidebar.module.css';
import { FaBars, FaTable } from "react-icons/fa";
import { FiBookOpen } from "react-icons/fi";


class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false
        };
    }

    SideBarToggle = () => {
        let currentState = this.state.collapsed;
        this.setState({ collapsed: !currentState });
    }
    render() {
        let style;
        if (this.state.collapsed)
            style = classes.SidebarExtended;
        else style = classes.SidebarCollapsed;

        return (
            <div onMouseEnter={this.SideBarToggle} onMouseLeave={this.SideBarToggle} className={style} style={{ height: "100%" }}>
                {/*<FaBars className={classes.FaBars, classes.Icon} onClick={this.SideBarToggle} /> */}
                <div className={classes.SidebarInnerContainer} ><FiBookOpen className={classes.Icon} /><span style={{margin: "0.7rem"}} hidden={!this.state.collapsed}>Overview</span></div>
                <div className={classes.SidebarInnerContainer}> <FaTable className={classes.Icon} /><span style={{ margin: "0.7rem" }} hidden={!this.state.collapsed}>Genre Table </span></div>
                <div className={classes.SidebarInnerContainer}> <FaTable className={classes.Icon} /><span style={{ margin: "0.7rem" }} hidden={!this.state.collapsed}>Movie Table </span></div>
                <div className={classes.SidebarInnerContainer}> <FaTable className={classes.Icon} /><span style={{ margin: "0.7rem" }} hidden={!this.state.collapsed}>Image Table </span></div>
                <div className={classes.SidebarInnerContainer}> <FaTable className={classes.Icon} /><span style={{ margin: "0.7rem" }} hidden={!this.state.collapsed}>File Table </span></div>

            </div >
        )
    }
}

export default Sidebar;