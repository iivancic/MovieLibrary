import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import AdminLayout from './components/AdminPage/AdminPageLayout/AdminLayout';
import classes from '../src/styles/global.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';


export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <div className={classes.h100}>
                <Layout>
                    <Route exact path='/' component={Home} />
                    <Route path='/myServer/admin/' component={AdminLayout} />
                </Layout>
            </div>
        );
    }
}