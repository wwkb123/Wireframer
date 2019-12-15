import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Redirect } from 'react-router-dom';
import { getFirestore } from 'redux-firestore';



import LeftTools from './LeftTools';
import RightTools from './RightTools';
import EditArea from './EditArea';

class EditScreen extends Component{

  state={
    "currWireframe":{
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
   
  }


  handleSaveWireframe = (state) => {
    let fireStore = getFirestore();
    // eslint-disable-next-line
    state.timestamp = fireStore.FieldValue.serverTimestamp();
    if(this.props.match.params.id==='new')
      fireStore.collection('wireframeLists').add({
        name:state.name,
        owner:state.owner,
        timestamp:state.timestamp
      })
    else
      fireStore.collection('wireframeLists').doc(this.props.match.params.id).update({
        name:state.name,
        owner:state.owner,
        timestamp:state.timestamp
      })
  }

  handleControlClick = (type) => {
      switch(type){
        case "container":
          this.state.currWireframe.items.push("container");
            break;
        case "label":
          this.state.currWireframe.items.push("label");
            break;
        case "textButton":
          this.state.currWireframe.items.push("textButton");
            break;
        case "textField":
          this.state.currWireframe.items.push("textField");
            break;
        default:
    }
    this.setState(this.state.currWireframe.items);
    // console.log("items in EditScreen", this.state.currWireframe.items);
  }

  render(){

    if (!this.props.auth.uid) {
        return <Redirect to="/login" />;
    }

    let wireframe = this.props.wireframe;
    if(this.props.wireframe == null){
        wireframe = this.state.currWireframe;
    }

    return (
        <div className='row'>
          <LeftTools history={this.props.history} wireframe={wireframe} handleSaveWireframe={this.handleSaveWireframe} handleControlClick={this.handleControlClick}/>
          <EditArea state={this.state} />
          <RightTools/>
        </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
    const { id } = ownProps.match.params;
    const { wireframeLists } = state.firestore.data;
    const wireframe = wireframeLists ? wireframeLists[id] : null;
    if(wireframe)
      wireframe.id = id
  
    return {
      wireframe: wireframe,
      auth: state.firebase.auth,
    };
  };
  
  export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      { collection: 'wireframeLists' },
    ]),
  )(EditScreen);