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
        e.persist();
        const target = e.target;
        this.setState(state => ({
            ...state,
            [target.id]: target.value,
        }));
    }

    handleSaveWork = () => {
        this.props.handleSaveWork(this.state);
        this.handleModalClose();
    }
    

    handleInitState = () =>{
        if(this.state.name===null && this.props.work.name)
        // eslint-disable-next-line
            this.state.name=this.props.work.name?this.props.work.name:"";
        if(this.state.owner===null && this.props.auth.uid)
        // eslint-disable-next-line
            this.state.owner=this.props.auth.uid?this.props.auth.uid:"";
    }

    render(){
        const { work } = this.props;
        this.handleInitState();
        return (
            <div className="col s3 total-toolmap" >
                <div className= "tool-map row" style={{height:"6.5%"}}>
                <Button small 
                    waves="red"
                    node="button" 
                    className="col s3 work-top-button" 
                    icon={<Icon>zoom_in</Icon>} >  
                </Button>
                <Button small 
                    waves="green"
                    node="button" 
                    className="col s3 work-top-button" 
                    icon={<Icon>zoom_out</Icon>}>  
                </Button>
                <Button small 
                    waves="purple"
                    node="button" 
                    className="col s3 work-top-button" 
                    icon={<Icon>save</Icon>} 
                    onClick={this.handleModalOpen}>  
                </Button>
                <Button small 
                    waves="teal"
                    node="button" 
                    className="col s3 work-top-button" 
                    icon={<Icon>cancel</Icon>}>  
                </Button>
                <Modal
                bottomSheet={false}
                fixedFooter={false}
                header="Save Work?"
                id={"modal-"+work.id}
                open={this.state.modalActive}
                style={{maxHeight:'none'}}
                options={{
                    dismissible: false,
                    endingTop: '10%',
                    inDuration: 250,
                    onCloseEnd: null,
                    onCloseStart: null,
                    onOpenEnd: null,
                    onOpenStart: null,
                    opacity: 0.5,
                    outDuration: 250,
                    preventScrolling: false,
                    startingTop: '4%'
                }}
                >
                    <section className="dialog_content">
                        <p><strong>Are you sure you want to save this work?</strong></p>
                    </section>
                        <Button waves="orange" id="dialog_yes_button" className='btn' onClick={this.handleSaveWork}>Yes</Button>
                        <Button waves="yellow" id="dialog_no_button" className='btn' onClick={this.handleModalClose}>No</Button>
                    <footer className="dialog_footer">
                        The list will not be retreivable.
                    </footer>
                </Modal>
                </div>

                <div className="tool-map row" style={{height:"93.5%"}}>
                    <div className="work-name-input">
                        <div className="work-property-label">Work Name</div>
                        <TextInput placeholder="Insert here" className="work-input" id='name' value={this.state.name?this.state.name:""}
                        onChange={this.handleChange}/>
                    </div>
                    <div className="work-card" style={{marginTop:'20%'}}>
                        <div className="work-container"></div>
                        <label className="work-property-label">container</label>
                    </div>
                    <div className="work-card">
                        <p style={{cursor:"pointer"}}>prompt for input:</p>
                        <p className="work-property-label">label</p>
                    </div>
                    <div className="work-card">
                        <div className="work-button">submit</div>
                        <label className="work-property-label">button</label>
                    </div>
                    <div className="work-card">
                        <div className="work-textfield">input</div>
                        <label className="work-property-label">textfield</label>
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
        { collection: 'workLists' },
      ]),
)(LeftTools);