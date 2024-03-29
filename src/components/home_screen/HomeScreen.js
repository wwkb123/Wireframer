import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';

import Logo from './Logo'
import WireframeLinks from './WireframeLinks';
class HomeScreen extends Component {
    handleNewWireframe = () => {
        this.props.history.push('/wireframe/new');
    }

    render() {
        if (!this.props.auth.uid) {
            return <Redirect to="/login" />;
        }
        
        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m4">
                    <WireframeLinks/>
                    </div>

                    <div className="col s8">
                        <Logo />
                        
                        <div className="home_new_list_container row center">
                                <button className="home_new_list_button " onClick={this.handleNewWireframe}>
                                    Create a New Wireframe
                                </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
    };
};



export default compose(
    connect(mapStateToProps),
    firestoreConnect(),
)(HomeScreen);