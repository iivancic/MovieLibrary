import React, { Component } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true
        };
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    render() {
        return (
            <header>
                <Navbar
                    style={{ margin: "0px", marginBottom: "0px" }} className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow" light>
                    <div style={{ display: "flex", margin: "0px", width: "100%", }} >
                        <NavbarBrand style={{ margin: "0px" }}  tag={Link} to="/">Movie Library</NavbarBrand>
                        <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />

                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
                            <ul className="navbar-nav flex-grow">
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/counter">Counter</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/fetch-data">Fetch data</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} to="/myServer/admin/">Admin page</NavLink>
                                </NavItem>
                            </ul>
                        </Collapse>
                    </div>
                </Navbar>
            </header>
        );
    }
}