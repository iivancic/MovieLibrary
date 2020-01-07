import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import 'bootstrap/dist/css/bootstrap.min.css';



import './custom.css'
import AdminLayout from './components/AdminPage/AdminPageLayout/AdminLayout';

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <div style={{height: "100%"}}>
                <Layout>
                    <Route exact path='/' component={Home} />
                    <Route path='/counter' component={Counter} />
                    <Route path='/fetch-data' component={FetchData} />
                    <Route path='/myServer/admin/' component={AdminLayout} />
                </Layout>
            </div>
        );
    }
}