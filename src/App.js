import React, { Component } from 'react';
import { firebaseConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Navbar from './components/navbar/Navbar.js';
import RegisterScreen from './components/register_screen/RegisterScreen.js';
import LoginScreen from './components/login_screen/LoginScreen.js';
import HomeScreen from './components/home_screen/HomeScreen.js';
import DatabaseTester from './test/DatabaseTester.js';
import EditScreen from './components/edit_screen/EditScreen.js';


class App extends Component {
  render() {
    const { auth } = this.props;

    // if auth is loaded then we render App.
    // But if not then we doesn't render the one.
    if (auth.isLoaded) {
      return (
        <BrowserRouter>
          <div className="App">
            <Navbar />
            <Switch>
              <Route exact path="/" component={HomeScreen} />
              <Route path="/databaseTester" component={DatabaseTester} />
              <Route path="/register" component={RegisterScreen} />
              <Route path="/login" component={LoginScreen} />
              <Route path="/wireframe/:id" component={EditScreen} />
              <Route path="/:any" component={HomeScreen} />
            </Switch>
            
          </div>
        </BrowserRouter>
      );
    }

    return null;
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    todoLists: state.firestore.ordered.todoLists,
  }
};

export default compose(
  firebaseConnect(),
  connect(mapStateToProps),
)(App);
