import React, { Component } from 'react';
import GenreTable from '../AdminPageComponents/GenreTable/GenreTable';
import MovieTable from '../AdminPageComponents/MovieTable/MovieTable'
import Sidebar from '../AdminPageComponents/GenreTable/Sidebar';
import { Row, Col } from 'react-bootstrap';
import { Route } from 'react-router';


class AdminLayout extends Component {
    render() {
        return (
            <div style={{ height: "100%", backgroundColor: "#E5E5EA", width: "100%", position: "fixed",overflow: "scroll"}}>
                <Row className="show-grid" style={{ width: "100%", height:"100%" }}>
                    <Col sm={2} >
                        <Sidebar />
                    </Col>

                    <Col sm={10}>
                        <Route path='/myServer/admin/GenreTable' component={GenreTable} />
                        <Route path='/myServer/admin/MovieTable' component={MovieTable} />
                    </Col>
                </Row>
            </div>
        )
    }
}

export default AdminLayout;