import React, { Component } from 'react';
import GenreTable from '../AdminPageComponents/Tables/GenreTable/GenreTable';
import MovieTable from '../AdminPageComponents/Tables/MovieTable/MovieTable';
import FileInfoTable from '../AdminPageComponents/Tables/FileInfoTable/FileInfoTable';
import FileDataTable from '../AdminPageComponents/Tables/FileDataTable/FileDataTable';
import Sidebar from '../AdminPageComponents/Sidebar/Sidebar';
import MovieEditPage from '../AdminPageComponents/MovieEditPage';
import { Row, Col } from 'react-bootstrap';
import { Route } from 'react-router';


class AdminLayout extends Component {
    render() {
        return (
            <div style={{ height: "100%", backgroundColor: "#E5E5EA", width: "100%", position: "fixed",overflow: "scroll"}}>
                <Row className="show-grid" style={{ overflow: "scroll", width: "100%", height:"100%" }}>
                    <Col sm={2} >
                        <Sidebar />
                    </Col>

                    <Col sm={10}>
                        <Route path='/myServer/admin/GenreTable' component={GenreTable} />
                        <Route path='/myServer/admin/MovieTable' component={MovieTable} />
                        <Route path='/myServer/admin/FileInfo' component={FileInfoTable} />
                        <Route path='/myServer/admin/FileDataTable' component={FileDataTable} />
                        <Route path='/myServer/admin/MovieTableEdit/' component={MovieEditPage} />
                    </Col>
                </Row>
            </div>
        )
    }
}

export default AdminLayout;