import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Redirect } from 'react-router-dom';
import { getFirestore } from 'redux-firestore';



import ToolMapLeft from './ToolMapLeft';
import ToolMapRight from './ToolMapRight';
import DisplayPlace from './DisplayPlace';

class EditScreen extends Component{

  state={
    "id": null,
    "owner": null,
    "name": null,
    "screenHeight": null,
    "screenWeidth": null,
    "centerX":null,
    "centerY":null,
    "H_scrollbar_length": null,
    "V_scrollbar_length":null,
    "items":[]
  }


  handleSaveWork= (state) => {
    let fireStore = getFirestore();
    // eslint-disable-next-line
    state.timestamp=fireStore.FieldValue.serverTimestamp();
    if(this.props.match.params.id==='new')
      fireStore.collection('workLists').add({
        name:state.name,
        owner:state.owner,
        timestamp:state.timestamp
      })
    else
      fireStore.collection('workLists').doc(this.props.match.params.id).update({
        name:state.name,
        owner:state.owner,
        timestamp:state.timestamp
      })
  }

  render(){

    if (!this.props.auth.uid) {
        return <Redirect to="/login" />;
    }

    let work = this.props.work;
    if(this.props.work==null){
        work = this.state; // new work
    }

    return (
        <div className='row'>
          <ToolMapLeft work={work} handleSaveWork={this.handleSaveWork}/>
          <DisplayPlace/>
          <ToolMapRight/>
        </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
    const { id } = ownProps.match.params;
    const { workLists } = state.firestore.data;
    const work = workLists ? workLists[id] : null;
    if(work)
      work.id=id
  
    return {
      work,
      auth: state.firebase.auth,
    };
  };
  
  export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      { collection: 'workLists' },
    ]),
  )(EditScreen);