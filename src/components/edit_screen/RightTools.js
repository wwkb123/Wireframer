import React, { Component } from 'react';
import {TextInput, Range} from 'react-materialize';
import ColorPicker from './ColorPicker'
import NumericInput from 'react-numeric-input';

class RightTools extends Component{
    constructor(props){
        super(props);
        this.state = {
            text: ""
        }
        
    }
    onChange = (e) => {
        const target = e.target;

        this.props.wireframe.selectedItem[target.id] = target.value;
        this.setState(this.props.wireframe.selectedItem);
        this.props.setHasChanged(true);
        this.props.setHasSaved(false);
    }

    onFontSizeChange = (valueAsNumber, valueAsString, input) => {
        this.props.wireframe.selectedItem["fontSize"] = valueAsNumber;
        this.setState(this.props.wireframe.selectedItem);
        this.props.setHasChanged(true);
        this.props.setHasSaved(false);
    }

    onBorderThicknessChange = (valueAsNumber, valueAsString, input) => {
        this.props.wireframe.selectedItem["borderThickness"] = valueAsNumber;
        this.setState(this.props.wireframe.selectedItem);
        this.props.setHasChanged(true);
        this.props.setHasSaved(false);
    }

    onBorderRadiusChange = (valueAsNumber, valueAsString, input) => {
        this.props.wireframe.selectedItem["borderRadius"] = valueAsNumber;
        this.setState(this.props.wireframe.selectedItem);
        this.props.setHasChanged(true);
        this.props.setHasSaved(false);
    }
    
    render(){
        const selected = this.props.wireframe.selectedItem;
        if(this.props.wireframe)
            console.log("Select item is ", this.props.wireframe.selectedItem);
        return (
            <div className="col s3 total-tool">
                <div className="tool row" style={{height:"100%"}}>
                    <div className="wireframe-properties">
                        <div className="wireframe-property-label" >Properties</div>
                        <TextInput placeholder="Insert here" className="wireframe-input" id="text" value={selected ? selected.text : ""} onChange={this.onChange}/>
                    </div>
                    <div className="wireframe-properties" style={{marginTop:'20%'}}>
                        <label className="wireframe-property-label" >Font Size: </label>
                        <NumericInput min={5} max={100} value={selected ? selected.fontSize : 14} step={0.5} onChange={this.onFontSizeChange}></NumericInput>px
                    </div>
                    <div className="wireframe-properties" >
                        <label className="wireframe-property-label" >Text Color: </label>
                        <ColorPicker />
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
                        <NumericInput min={0.5} max={20} value={selected ? selected.borderThickness : 1} step={0.5} onChange={this.onBorderThicknessChange}></NumericInput>px
                    </div>
                    <div className="wireframe-properties">
                        <label className="wireframe-property-label" >Border Radius </label>
                        <NumericInput min={0} max={100} value={selected ? selected.borderRadius : 0} step={0.5} onChange={this.onBorderRadiusChange}></NumericInput>px
                    </div>
                    <div className="wireframe-properties"></div>
                </div>
            </div>
        );
    }
}

export default RightTools;