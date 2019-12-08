import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import axios from '../../../axios-orders';
import GenreTable from '../Genre/GenreTable';

class AdminLayout extends Component {
    render() {
        return (
            <div>
                <GenreTable />
            </div>
        )
    }
}

export default AdminLayout;