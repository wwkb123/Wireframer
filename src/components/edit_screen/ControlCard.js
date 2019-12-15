import React, { Component } from 'react';
import ResizableRect from 'react-resizable-rotatable-draggable'

class ControlCard extends Component{

    handleResize = (style, isShiftKey, type) => {
        let { top, left, width, height } = style

        this.props.control.top = Math.round(top)
        this.props.control.left = Math.round(left)
        this.props.control.width = Math.round(width)
        this.props.control.height = Math.round(height)
        this.setState(this.props.control)
      }
    
      handleDrag = (deltaX, deltaY) => {
        if (this.props.control.selected) {
            this.props.control.left += deltaX;
            this.props.control.top += deltaY;
            this.setState(this.props.control);
        }
        
      }
    
      render() {
        
        var index = this.props.control.id.toString();
        // console.log(index)
        const { width, height, top, left, fontSize, backgroundColor, textColor } = this.props.control;
        const dummy = { width, height, top, left, 
          position:'absolute', fontSize: fontSize+"px", backgroundColor, color: textColor }
        return (
          <div style={{position:'relative', zIndex:{index}}} onClick={this.props.handleSelect.bind(this, this.props.control)} onMouseDown={this.props.handleSelect.bind(this, this.props.control)}>
            <div style={dummy}>{ this.props.control?this.props.control.text:""}</div>
            <ResizableRect
              left={this.props.control.left}
              top={this.props.control.top}
              width={this.props.control.width}
              height={this.props.control.height}

              // aspectRatio={false}
              // minWidth={10}
              // minHeight={10}
              zoomable={this.props.control.selected?'nw, ne, se, sw':''}

              // onResizeStart={this.handleResizeStart}
              onResize={this.handleResize}
              // onResizeEnd={this.handleUp}
              // onDragStart={this.handleDragStart}
              onDrag={this.handleDrag}
              // onDragEnd={this.handleDragEnd}
            />
            <div style={{
                left: this.props.control.left,
                top: this.props.control.top,
                borderColor: this.props.control.borderColor,
                // borderWidth: this.props.control.borderThic,
                // borderStyle: "solid",
                // value: this.props.control.property,
                // backgroundColor: this.props.control.backgroundColor,
                // fontSize: this.props.control.fontSize,
                width: "100%",
                height: "100%",
            }}></div>
          </div>
        )
      }

}

export default ControlCard;