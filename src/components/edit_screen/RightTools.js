import React, { Component } from 'react';
import {TextInput, Range} from 'react-materialize';
import ColorPicker from './ColorPicker'

class RightTools extends Component{

    render(){
        
        return (
            <div className="col s3 total-toolmap">
                <div className="tool-map row" style={{height:"100%"}}>
                    <div className="work-properties">
                        <div className="work-property-label" >Property</div>
                        <TextInput placeholder="Insert here" className="work-input"/>
                    </div>
                    <div className="work-properties" style={{marginTop:'20%'}}>
                        <label className="work-property-label" >Font Size: </label>
                        <Range max="100" min="0" name="points"/>
                    </div>
                    <div className="work-properties" >
                        <label className="work-property-label" >Background:</label>
                        <ColorPicker />
                    </div>
                    <div className="work-properties">
                        <label className="work-property-label" >Border Color:</label>
                        <ColorPicker />
                    </div>
                    <div className="work-properties">
                        <label className="work-property-label" >Border Thickness </label>
                        <Range max="100" min="0" name="points"/>
                    </div>
                    <div className="work-properties">
                        <label className="work-property-label" >Border Radius </label>
                        <Range max="100" min="0" name="points"/>
                    </div>
                    <div className="work-properties"></div>
                </div>
            </div>
        );
    }
}

export default RightTools;