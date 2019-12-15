import reactCSS from 'reactcss'
import {SketchPicker} from 'react-color';
import React, { Component } from 'react';


class ColorPicker extends Component{

    state = {
        displayColorPicker: false,
        color: {
          r: '0',
          g: '0',
          b: '0',
          a: '1',
        },
      };
    
      handleClick = () => {
        this.setState({ displayColorPicker: !this.state.displayColorPicker })
      };
    
      handleClose = () => {
        this.setState({ displayColorPicker: false })
      };
    
      handleChange = (color) => {
        this.setState({ color: color.rgb })
        this.props.wireframe.selectedItem[this.props.type] = color.hex;
        this.setState(this.props.wireframe.selectedItem);
        this.props.setHasChanged(true);
        this.props.setHasSaved(false);
      };

    render(){
      var color = this.props.color;
      var result = null;
      if(color){
        result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
        result = result ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
          a: 1
        } : null;
      }
        const styles = reactCSS({
            'default': {
              color: {
                width: '20px',
                height: '20px',
                background: `rgba(${ result?result.r:this.state.color.r }, ${ result?result.g:this.state.color.g }, ${ result?result.b:this.state.color.b }, ${ result?result.a:this.state.color.a })`,
              },
              swatch: {
                padding: '5px',
                background: '#fff',
                boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                display: 'inline-block',
                cursor: 'pointer',
              },
              popover: {
                position: 'absolute',
                zIndex: '2',
                right: "1%",
              },
              cover: {
                position: 'fixed',
                top: '0px',
                right: '0px',
                bottom: '0px',
                left: '0px',
              },
            },
          });
        return (
            <div className="right">
                <div style={ styles.swatch } onClick={ this.handleClick }>
                    <div style={ styles.color } />
                </div>
                { this.state.displayColorPicker ? <div style={ styles.popover }>
                <div style={ styles.cover } onClick={ this.handleClose }/>
                <SketchPicker 
                color={ this.state.color } 
                onChange={ this.handleChange } 
                className="left"
                />
                </div> : null }
            </div>
        );
    }
}

export default ColorPicker;