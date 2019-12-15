import React, { Component } from 'react';
import ResizableRect from 'react-resizable-rotatable-draggable'

class ControlCard extends Component{
    
    state = {
        width: 100,
        height: 100,
        top: 100,
        left: 100,
        selected : this.props.selected
    }

    handleResize = (style, isShiftKey, type) => {
        // type is a string and it shows which resize-handler you clicked
        // e.g. if you clicked top-right handler, then type is 'tr'
        let { top, left, width, height } = style
        top = Math.round(top)
        left = Math.round(left)
        width = Math.round(width)
        height = Math.round(height)
        this.setState({
          top,
          left,
          width,
          height
        })
      }
    
      handleDrag = (deltaX, deltaY, selected) => {
        if(selected){
            this.setState({
                left: this.state.left + deltaX,
                top: this.state.top + deltaY
            })
        }
        
      }
    
      render() {
        const {width, top, left, height} = this.state
        var index = this.props.control.id.toString();
        // console.log(index)
        return (
          <div style={{position:'relative', zIndex:{index}}} onClick={this.props.handleSelect.bind(this, this.props.control)}>
            <ResizableRect
              left={left}
              top={top}
              width={width}
              height={height}

              // aspectRatio={false}
              // minWidth={10}
              // minHeight={10}
              zoomable={this.props.control.selected?'n, w, s, e, nw, ne, se, sw':''}

              // onResizeStart={this.handleResizeStart}
              onResize={this.handleResize}
              // onResizeEnd={this.handleUp}
              // onDragStart={this.handleDragStart}
              onDrag={this.handleDrag.bind(this, this.props.control.selected)}
              // onDragEnd={this.handleDragEnd}
            />
          </div>
        )
      }

}

export default ControlCard;