import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { inject, observer } from 'mobx-react';
import './Layout.scss';

@inject('session') @observer
class Layout extends React.Component {

    componentWillMount () {
        this.props.session.signIn();
    }

    render() {
        return (
            <div id="Layout">
                <Navbar />
                <div className="main-container">
                    {this.props.children}
                </div>
                <Footer />
            </div>
        )
    }

}


export default Layout;
