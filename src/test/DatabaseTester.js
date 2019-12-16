import React from 'react'
import { connect } from 'react-redux';
import todoJson from './TestTodoListData.json'
import { getFirestore } from 'redux-firestore';
import { Redirect } from 'react-router-dom';

class DatabaseTester extends React.Component {

    // NOTE, BY KEEPING THE DATABASE PUBLIC YOU CAN
    // DO THIS ANY TIME YOU LIKE WITHOUT HAVING
    // TO LOG IN
    handleClear = () => {
        const fireStore = getFirestore();
        fireStore.collection('wireframeLists').get().then(function(querySnapshot){
            querySnapshot.forEach(function(doc) {
                fireStore.collection('wireframeLists').doc(doc.id).delete();
            })
        });
    }

    handleReset = () => {
        const fireStore = getFirestore();
        todoJson.wireframeLists.forEach(todoListJson => {
            fireStore.collection('wireframeLists').add({
                    name: todoListJson.name,
                    owner: todoListJson.owner,
                    controlList: todoListJson.controlList,
                    timestamp: fireStore.FieldValue.serverTimestamp(),
                    screenHeight: todoListJson.screenHeight,
                    screenWidth: todoListJson.screenWidth,
                }).then(() => {
                    console.log("DATABASE RESET");
                }).catch((err) => {
                    console.log(err);
                });
        });
    }

    render() {
        if (!this.props.auth.uid) {
            return <Redirect to="/login" />;
        }
        return (
            <div>
                <button onClick={this.handleClear}>Clear Database</button>
                <button onClick={this.handleReset}>Reset Database</button>
            </div>)
    }
}

const mapStateToProps = function (state) {
    return {
        auth: state.firebase.auth,
        firebase: state.firebase
    };
}

export default connect(mapStateToProps)(DatabaseTester);