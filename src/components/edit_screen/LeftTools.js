import React, { Component } from 'react';
import { Icon, Button, Modal, TextInput } from 'react-materialize';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';



class LeftTools extends Component{

    state = {
        name: null,
        owner: null,
        timestamp: null,
        modalActive : false,
    }

    handleModalOpen = (e) => {
        e.stopPropagation();
        e.preventDefault();
        this.setState({modalActive:true});
    }

    handleModalClose = () =>{
        this.setState({modalActive:false});
    }

    handleChange = (e) => {
        this.props.setHasChanged(true);
        this.props.setHasSaved(false);
        e.persist();
        const target = e.target;
        this.setState(state => ({
            ...state,
            [target.id]: target.value,
        }));
    }

    handleSaveWireframe = () => {
        this.props.handleSaveWireframe(this.state);
        var items = this.props.wireframe.controlList;
        for (let i = 0; i < items.length; i++) {
            items[i].selected = false;
        }
        this.props.updateList(items);
        this.props.setHasChanged(false);
        this.props.setHasSaved(true);
    }

    handleCheckSaved = () => {
        if(!this.props.wireframe.hasSaved && this.props.wireframe.hasChanged){
            this.setState({modalActive:true});
        }
        else if(!this.props.wireframe.hasChanged){
            this.handleCloseWireframe();
        }
    }

    handleSaveAndCloseWireframe = () => {
        this.handleSaveWireframe();
        this.props.history.push('/');
        this.handleModalClose();
    }

    handleCloseWireframe = () => {
        this.props.history.push('/');
        this.handleModalClose();
    }
    
    handleControlClick = (type) => {
        console.log(type);
        this.props.setHasChanged(true);
        this.props.setHasSaved(false);
        this.props.handleControlClick(type);
    }

    handleInitState = () =>{
        if(this.state.name===null && this.props.wireframe.name)
        // eslint-disable-next-line
            this.state.name=this.props.wireframe.name?this.props.wireframe.name:"";
        if(this.state.owner===null && this.props.auth.uid)
        // eslint-disable-next-line
            this.state.owner=this.props.auth.uid?this.props.auth.uid:"";
    }

    render(){
        const { wireframe } = this.props;
        this.handleInitState();
        // console.log("left", this.props.wireframe.controlList);
        return (
            <div className="col s3 total-tool" >
                <div className= "tool row" style={{height:"6.5%"}}>
                
                <Button small 
                    waves="purple"
                    node="button" 
                    className="col s3 wireframe-top-button" 
                    onClick={this.handleSaveWireframe}>Save
                </Button>
                <Button small 
                    waves="teal"
                    node="button" 
                    className="col s3 wireframe-top-button"
                    onClick={this.handleCheckSaved}>Close
                </Button>


                <Modal
                bottomSheet={false}
                fixedFooter={false}
                header="Save Wireframe?"
                id={"modal-"+wireframe.id}
                open={this.state.modalActive}
                style={{maxHeight:'none'}}
                options={{
                    dismissible: false,
                    endingTop: '10%',
                    inDuration: 200,
                    onCloseEnd: null,
                    onCloseStart: null,
                    onOpenEnd: null,
                    onOpenStart: null,
                    opacity: 0.5,
                    outDuration: 200,
                    preventScrolling: false,
                    startingTop: '5%'
                }}
                >
                    <section className="dialog_content">
                        <p><strong>You haven't saved your wireframe. Want to save your changes?</strong></p>
                    </section>
                        <Button waves="orange" id="dialog_yes_button" className='btn' onClick={this.handleSaveAndCloseWireframe} style={{margin: '10px'}}>Save and Quit</Button>
                        <Button waves="yellow" id="dialog_no_button" className='btn' onClick={this.handleCloseWireframe} style={{margin: '10px'}}>Don't Save and Quit</Button>
                        <Button waves="yellow" id="dialog_no_button" className='btn' onClick={this.handleModalClose} style={{margin: '10px'}}>Cancel</Button>
                    <footer className="dialog_footer">
                        Once you close the wireframe without saving it, the work will be unretrievable.
                    </footer>
                </Modal>
                </div>

                <div className="tool row" style={{height:"93.5%"}}>
                    <div className="wireframe-name-input">
                        <div className="wireframe-property-label">Wireframe Name</div>
                        <TextInput placeholder="Insert here" className="wireframe-input" id='name' value={this.state.name?this.state.name:""}
                        onChange={this.handleChange}/>
                    </div>
                    <div className="wireframe-card" style={{marginTop:'20%', display: 'block', cursor: 'pointer'}} onClick={this.handleControlClick.bind(this, "container")}>
                        <div className="wireframe-container"></div>
                        <label className="wireframe-property-label">Container</label>
                    </div>
                    <div className="wireframe-card" style={{display: 'block', cursor: 'pointer'}} onClick={this.handleControlClick.bind(this, "label")}>
                        <p style={{cursor:"pointer"}}>Prompt for Input:</p>
                        <p className="wireframe-property-label">Label</p>
                    </div>
                    <div className="wireframe-card" style={{display: 'block', cursor: 'pointer'}} onClick={this.handleControlClick.bind(this, "textButton")}>
                        <div className="wireframe-button" style={{backgroundColor:'#808080'}}>Submit</div>
                        <label className="wireframe-property-label">Button</label>
                    </div>
                    <div className="wireframe-card" style={{display: 'block', cursor: 'pointer'}} onClick={this.handleControlClick.bind(this, "textField")}>
                        <div className="wireframe-textfield" style={{color:'#d3d3d3'}}>Input</div>
                        <label className="wireframe-property-label">Textfield</label>
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
    firestoreConnect([
        { collection: 'wireframeLists' },
      ]),
)(LeftTools);