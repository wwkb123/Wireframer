import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Redirect } from 'react-router-dom';
import { getFirestore } from 'redux-firestore';


import Control from './Control';
import LeftTools from './LeftTools';
import RightTools from './RightTools';
import EditArea from './EditArea';

class EditScreen extends Component{
  constructor(props){
    super(props);
    this.handleSaveWireframe = this.handleSaveWireframe.bind(this);
    this.state = {
        id: null,
        owner: this.props.wireframe?this.props.wireframe.owner:"",
        name: this.props.wireframe?this.props.wireframe.name:"",
        screenHeight: null,
        screenWeidth: null,
        centerX:null,
        centerY:null,
        H_scrollbar_length: null,
        V_scrollbar_length:null,
        controlList:this.props.wireframe?this.props.wireframe.controlList:[],
        hasSaved: false,
        hasChanged: false,
        selectedItem: null
    }

  }

  updateList = (list) => {
    this.setState({controlList:list});
  }

  updateSelectedItem = (item) =>{
    this.setState({selectedItem:item});
  }

  setHasChanged = (value) => {
    this.setState({hasChanged:value});
  }

  setHasSaved = (value) => {
    this.setState({hasSaved:value});
  }

  handleSaveWireframe = (state) => {
    let fireStore = getFirestore();
    // eslint-disable-next-line
    var controlList = []
    for(let i = 0; i < this.state.controlList.length; i++){
      let item = this.state.controlList[i];
      var itemToPush = {
        "id" : item.id,
        "type" : item.type,
        "width" : item.width,
        "height" : item.height,
        "selected" : false,
        "top" : item.top,
        "left" : item.left,
        "text" : item.text,
        "fontSize" : item.fontSize,
        "textColor" : item.textColor,
        "backgroundColor" : item.backgroundColor,
        "borderColor" : item.borderColor,
        "borderThickness" : item.borderThickness,
        "borderRadius" : item.borderRadius
      }
      controlList.push(itemToPush);
    }
    console.log("To be upload: ", controlList);
    state.timestamp = fireStore.FieldValue.serverTimestamp();
    if(this.props.match.params.id==='new')
      fireStore.collection('wireframeLists').add({
        name:state.name,
        owner:state.owner,
        timestamp:state.timestamp,
        controlList: controlList
      })
    else
      fireStore.collection('wireframeLists').doc(this.props.match.params.id).update({
        name:state.name,
        owner:state.owner,
        timestamp:state.timestamp,
        controlList: controlList
      })
  }

  handleControlClick = (type) => {
    const attrs = {
      "type" : "",
      "top" : 0.0,
      "left" : 0.0,
      "width" : 100.0,
      "height" : 50.0,
      "id" : this.state.controlList.length
    }
      switch(type){
        case "container":
          attrs.type = "container"
          attrs.width = 400
          attrs.height = 400
            break;
        case "label":
          attrs.type = "label"
          attrs.text = "Prompt for Input"
          attrs.width = 160
          attrs.height = 25
            break;
        case "textButton":
          attrs.type = "textButton"
          attrs.text = "Submit"
          attrs.width = 70
          attrs.height = 25
          attrs.backgroundColor = "gray"
            break;
        case "textField":
          attrs.type = "textField"
          attrs.text = "Input"
          attrs.width = 200
          attrs.height = 25
          attrs.textColor = "lightgray"
            break;
        default:
    }

    const ctr = new Control(attrs);
    var list = this.state.controlList
    list.push(ctr);
    this.setState({controlList:list});
    // console.log("items in EditScreen", this.state.controlList);
  }

  render(){

    if (!this.props.auth.uid) {
        return <Redirect to="/login" />;
    }

    // console.log("Edit s", this.state)
    return (
        <div className='row'>
          <LeftTools history={this.props.history} wireframe={this.state} handleSaveWireframe={this.handleSaveWireframe} handleControlClick={this.handleControlClick}
          setHasChanged={this.setHasChanged.bind(this)} setHasSaved={this.setHasSaved.bind(this)} updateList={this.updateList.bind(this)}/>
          <EditArea wireframe={this.state} updateList={this.updateList.bind(this)} setHasChanged={this.setHasChanged.bind(this)} setHasSaved={this.setHasSaved.bind(this)}
          updateSelectedItem={this.updateSelectedItem.bind(this)} />
          <RightTools wireframe={this.state} setHasChanged={this.setHasChanged.bind(this)} setHasSaved={this.setHasSaved.bind(this)} updateList={this.updateList.bind(this)}/>
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