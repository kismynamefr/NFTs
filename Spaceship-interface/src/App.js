import React, { Fragment } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { Switch, Route, Routes } from "react-router-dom";
import "./App.css";
import Market from './components/Market/Market'
import Crates from './components/Crates/Crates';
import Users from './components/Users/Users';
import Home from './components/Home/Home';
import Detailbox from './components/Crates/components/Detailbox';
import Loading from './components/Market/components/Loading';
import DetailMarket from './components/Market/DetailMarket';
import Nav from './components/Nav';
import SideMenu from './components/Market/components/SideMenu';

const App = () => {
    require('events').EventEmitter.prototype._maxListeners = 100;
    require('events').defaultMaxListeners = 100;
    process.on('warning', function (err) {
        if ('MaxListenersExceededWarning' === err.name) {
            // write to log function
            process.exit(1); // its up to you what then in my case script was hang
        }
    });

    return (
        <Router>
            <Fragment>
                <Nav />
                <div className="mainBody">
                    <SideMenu />
                    <Routes>
                        <Route exact path="/" element={<Home />} />
                        <Route exact path="/Crates" element={<Crates />} />
                        <Route exact path="/Markets" element={<Market />} />
                        <Route exact path="/Markets/:id" element={<DetailMarket />} />
                        <Route exact path="/Crates" element={<Crates />} />
                        <Route exact path="/Crates/:id" element={<Detailbox />} />
                        <Route exact path="/Users" element={<Users />} />
                    </Routes>
                </div>
            </Fragment>
        </Router>
    )
}

export default App;