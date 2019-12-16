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

    onWidthChange = (valueAsNumber, valueAsString, input) => {
        this.props.setWidth(valueAsNumber);
        this.setState(this.props.wireframe);
        this.props.setHasChanged(true);
        this.props.setHasSaved(false);
    }

    onHeightChange = (valueAsNumber, valueAsString, input) => {
        this.props.setHeight(valueAsNumber);
        this.setState(this.props.wireframe);
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
        const width = this.props.wireframe.screenWidth;
        const height = this.props.wireframe.screenHeight;
        var className = "col s3 total-tool invisible";
        if(this.props.wireframe)
            if(selected)
                className = "col s3 total-tool"
            console.log("Select item is ", this.props.wireframe.selectedItem);
            
        return (
            <div>
                <div className="col s3" style={{border:"2px solid black"}}>
                    <div className="" style={{}}>
                        <label className="wireframe-property-label" >Screen Width: </label>
                        <NumericInput min={1} max={5000} value={width ? width : 500} step={1} onChange={this.onWidthChange}></NumericInput>px
                    </div>
                    <div className="" style={{}}>
                        <label className="wireframe-property-label" >Screen Height: </label>
                        <NumericInput min={1} max={5000} value={height ? height : 500} step={1} onChange={this.onHeightChange}></NumericInput>px
                    </div>
            </div>
            <div className={className}>
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
                        <ColorPicker setHasChanged={this.props.setHasChanged} setHasSaved={this.props.setHasSaved} type={"textColor"} wireframe={this.props.wireframe} color={selected?selected.textColor:"#000000"}/>
                    </div>
                    <div className="wireframe-properties" >
                        <label className="wireframe-property-label" >Background:</label>
                        <ColorPicker setHasChanged={this.props.setHasChanged} setHasSaved={this.props.setHasSaved}  type={"backgroundColor"} wireframe={this.props.wireframe} color={selected?selected.backgroundColor:"#000000"}/>
                    </div>
                    <div className="wireframe-properties">
                        <label className="wireframe-property-label" >Border Color:</label>
                        <ColorPicker setHasChanged={this.props.setHasChanged} setHasSaved={this.props.setHasSaved}  type={"borderColor"} wireframe={this.props.wireframe} color={selected?selected.borderColor:"#000000"}/>
                    </div>
                    <div className="wireframe-properties">
                        <label className="wireframe-property-label" >Border Thickness </label>
                        <NumericInput min={0} max={20} value={selected ? selected.borderThickness : 1} step={0.5} onChange={this.onBorderThicknessChange}></NumericInput>px
                    </div>
                    <div className="wireframe-properties">
                        <label className="wireframe-property-label" >Border Radius </label>
                        <NumericInput min={0} max={100} value={selected ? selected.borderRadius : 0} step={0.5} onChange={this.onBorderRadiusChange}></NumericInput>px
                    </div>
                    <div className="wireframe-properties"></div>
                </div>
            </div>
            </div>
        );
    }
}

export default RightTools;