import React from 'react';
import { Icon, Button, Modal } from 'react-materialize';
import { getFirestore } from 'redux-firestore';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';



class WireframeCard extends React.Component {

    state = {
        name: '',
        owner: '',
        modalActive : false,
    }


    db = getFirestore().collection("wireframeLists");

    
    handleModalOpen = (e) => {
        e.stopPropagation();
        e.preventDefault();
        console.log('wefw')
        this.setState({modalActive:true}, ()=>{
            console.log(this.state)
        });
    }

    handleModalClose = (e) =>{
        e.stopPropagation();
        e.preventDefault();
        this.setState({modalActive:false}, ()=>{
            console.log(this.state)
        });
    }

    deleteList= (e) => {
        e.stopPropagation();
        e.preventDefault();
        this.db.doc(this.props.wireframe.id).delete();
    }

    render() {
        const { wireframe } = this.props;
        return (
            <div className="card list z-depth-0 todo-list-link">
                <div className="card-content grey-text text-darken-3">
                    <span className="card-title">{wireframe.name===""?"Unknown":wireframe.name}</span>
                    <Button floating small 
                    waves="purple"
                    node="button" 
                    className="delete-button red" 
                    icon={<Icon>clear</Icon>} 
                    onClick={this.handleModalOpen}>  
                    </Button>
                    <Modal
                    bottomSheet={false}
                    fixedFooter={false}
                    header="Delete Wireframe?"
                    id={"modal-"+wireframe.id}
                    open={this.state.modalActive}
                    
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
                            <p><strong>Are you sure to delete it?</strong></p>
                        </section>
                            <Button waves="orange" id="dialog_yes_button" className='btn' onClick={this.deleteList}>Yes</Button>
                            <Button waves="orange" id="dialog_no_button" className='btn' onClick={this.handleModalClose}>No</Button>
                        <footer className="dialog_footer">
                            Once the list is deleted, it will be unretreivable.
                        </footer>
                    </Modal>
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
  )(WireframeCard);