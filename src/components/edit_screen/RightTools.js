import React, { Component } from 'react';
import {TextInput, Range} from 'react-materialize';
import ColorPicker from './ColorPicker'

class RightTools extends Component{

    render(){
        
        return (
            <div className="col s3 total-tool">
                <div className="tool row" style={{height:"100%"}}>
                    <div className="wireframe-properties">
                        <div className="wireframe-property-label" >Property</div>
                        <TextInput placeholder="Insert here" className="wireframe-input"/>
                    </div>
                    <div className="wireframe-properties" style={{marginTop:'20%'}}>
                        <label className="wireframe-property-label" >Font Size: </label>
                        <Range max="100" min="0" name="points"/>
                    </div>
                    <div className="wireframe-properties" >
                        <label className="wireframe-property-label" >Background:</label>
                        <ColorPicker />
                    </div>
                    <div className="wireframe-properties">
                        <label className="wireframe-property-label" >Border Color:</label>
                        <ColorPicker />
                    </div>
                    <div className="wireframe-properties">
                        <label className="wireframe-property-label" >Border Thickness </label>
                        <Range max="100" min="0" name="points"/>
                    </div>
                    <div className="wireframe-properties">
                        <label className="wireframe-property-label" >Border Radius </label>
                        <Range max="100" min="0" name="points"/>
                    </div>
                    <div className="wireframe-properties"></div>
                </div>
            </div>
        );
    }
}

export default RightTools;