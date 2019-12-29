import React, { Component } from 'react';
import GenreTable from '../AdminPageComponents/GenreTable/GenreTable';
import Sidebar from '../AdminPageComponents/GenreTable/Sidebar';
import { Row, Col } from 'react-bootstrap';
import classes from '../AdminPageStyles/AdminLayout.module.css' 


class AdminLayout extends Component {
    render() {
        return (
            <div className={classes.container} style={{ height: "100%", width: "100%", margin: "0px", padding: "0px" }} >
                    <Row className="show-grid" style={{ height: "100%", width: "100%"  }}>
                        <Col sm={2} >
                            <Sidebar />
                        </Col>
                        <Col sm={10}>
                            <GenreTable className="col-sm" />
                        </Col>
                    </Row>
                </div>
        )
    }
}

export default AdminLayout;