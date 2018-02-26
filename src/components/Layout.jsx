import React from 'react';
import Navbar from './Navbar';

const Layout = props =>
    <div id="Layout">
        <Navbar />
        <div className="main-container">
            {props.children}
        </div>
    </div>;

export default Layout;