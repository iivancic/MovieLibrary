import React, { Component } from 'react';
import classes from '../../AdminPageStyles/Sidebar.module.css';
import {  FaTable } from "react-icons/fa";
import { FiBookOpen } from "react-icons/fi";
import { Navbar, NavItem } from 'reactstrap';
import { Link } from 'react-router-dom';

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
            <div onMouseEnter={this.SideBarToggle} onMouseLeave={this.SideBarToggle} className={style} style={{ height: "100%", overflow: "hidden"}}>
                <Navbar style={{ padding: "0" }}>
                {/*<FaBars className={classes.FaBars, classes.Icon} onClick={this.SideBarToggle} /> */}
                    <NavItem  tag={Link} to="/myServer/admin/" className={classes.SidebarInnerContainer} ><FiBookOpen className={classes.Icon} style={{ color: "white", alignSelf: "center"}} /><span style={{ margin: "0.7rem", color: "white" }} hidden={!this.state.collapsed}>Overview</span></NavItem>

                    <NavItem tag={Link} to="/myServer/admin/GenreTable" className={classes.SidebarInnerContainer} ><FaTable className={classes.Icon} style={{ color: "white", alignSelf: "center" }} /><span style={{ margin: "0.7rem", color: "white" }} hidden={!this.state.collapsed}>Genre Table</span></NavItem>

                    <NavItem tag={Link} to="/myServer/admin/MovieTable" className={classes.SidebarInnerContainer} ><FaTable className={classes.Icon} style={{ color: "white", alignSelf: "center" }} /><span style={{ margin: "0.7rem", color: "white" }} hidden={!this.state.collapsed}>Movie Table</span></NavItem>

                    <NavItem tag={Link} to="/myServer/admin/FileInfo" className={classes.SidebarInnerContainer} ><FaTable className={classes.Icon} style={{ color: "white", alignSelf: "center" }} /><span style={{ margin: "0.7rem", color: "white" }} hidden={!this.state.collapsed}>File Info Table</span></NavItem>

                    <NavItem tag={Link} to="/myServer/admin/FileDataTable" className={classes.SidebarInnerContainer} ><FaTable className={classes.Icon} style={{ color: "white", alignSelf: "center" }} /><span style={{ margin: "0.7rem", color: "white" }} hidden={!this.state.collapsed}>File Data Table</span></NavItem>
                </Navbar>
            </div >
        )
    }
}

export default Sidebar;