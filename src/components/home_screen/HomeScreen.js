import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';

import Logo from './Logo'
import WireframeLists from './WireframeLists';
class HomeScreen extends Component {
    handleNewList = () => {
        this.props.history.push('/work/new');
    }

    render() {
        if (!this.props.auth.uid) {
            return <Redirect to="/login" />;
        }
        
        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m4">
                    <WireframeLists/>
                    </div>

                    <div className="col s8">
                        <Logo />
                        
                        <div className="home_new_list_container row center">
                                <button className="home_new_list_button " onClick={this.handleNewList}>
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