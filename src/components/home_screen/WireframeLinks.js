import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getFirestore } from 'redux-firestore';
import { firestoreConnect } from 'react-redux-firebase';

import WireframeCard from './WireframeCard';

class WireframeLinks extends Component{

    updateTimeStamp = (id) =>{
        let fireStore = getFirestore();
        fireStore.collection("wireframeLists").doc(id).update({
            timestamp : fireStore.FieldValue.serverTimestamp()
        })
    }

    render(){
        console.log(this.props.auth.uid)
        const wireframeLists = this.props.wireframeLists;
        return (
            <div className="todo-lists" style={{marginTop:'50px'}}>
                <div> Recent Work</div>
                
                {wireframeLists && wireframeLists.map(todoList => (
                    <Link to={'/work/' + todoList.id} key={todoList.id} onClick={this.updateTimeStamp.bind(this,todoList.id)}>
                        <WireframeCard work={todoList} open={this.handleModalOpen}/>
                    </Link>
                ))}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        wireframeLists: state.firestore.ordered.wireframeLists,
        auth: state.firebase.auth,
    };
};

const connection = (state) => {
    console.log(state);
    return [
        { 
            collection: 'wireframeLists', 
            orderBy:['timestamp', 'desc'], 
            where: [['owner', '==', state.auth.uid]], 
        },
      ];
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect(connection ),
)(WireframeLists);