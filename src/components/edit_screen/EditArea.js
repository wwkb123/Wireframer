import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { Icon, Button } from 'react-materialize';
import ControlCard from './ControlCard';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Control from './Control';

class EditArea extends Component{

    constructor(props){
        super(props);
    }

    state = {
        items : this.props.wireframe.controlList,
        selectedItem : null,
    }

    onKeyPressed = (event) => {
        event.preventDefault();
        if ((event.ctrlKey || event.metaKey) && event.key === 'd') {
            this.duplicateItem();
        }else if (event.key == "Delete" || event.keyCode == 8){
            this.deleteItem();
        }
        
    }

    deleteItem = () => {
        var item = this.state.selectedItem;
        console.log("Delete ", item);
        if(item){
            var items = this.props.wireframe.controlList;
            for(let i = 0; i < items.length; i++){
                if(items[i] == item){
                    console.log("Found ", item);
                    items.splice(i, 1);
                    break;
                }
            }
            this.setState({items});
            this.props.updateList(items);
            this.props.setHasChanged(true);
            this.props.setHasSaved(false);
        } 
    }

    duplicateItem = () =>{
        var item = this.state.selectedItem;
        console.log("Select ", item); 
        if(item){
            var items = this.props.wireframe.controlList;

            var attrs = {
                "id" : items.length,
                "type" : item.type,
                "width" : item.width,
                "height" : item.height,
                "selected" : false,
                "top" : item.top + 100,
                "left" : item.left + 100,
                "text" : item.text,
                "fontSize" : item.fontSize,
                "textColor" : item.textColor,
                "backgroundColor" : item.backgroundColor,
                "borderColor" : item.borderColor,
                "borderThickness" : item.borderThickness,
                "borderRadius" : item.borderRadius
            }
            const ctr = new Control(attrs);
            items.push(ctr);

            this.setState({items});
            this.props.updateList(items);
            this.props.setHasChanged(true);
            this.props.setHasSaved(false);
        }
    }

    handleSelect = (item, e) => {
        e.stopPropagation();
        var items = this.props.wireframe.controlList;
        for (let i = 0; i < items.length; i++) {
            if(item == items[i]){
                items[i].selected = true;
                this.setState({selectedItem: items[i]});
            }else{
                items[i].selected = false;
            }
        }
        for (let i = 0; i < items.length; i++) {
            items[i].key = i;
        }
        this.setState({items});
        this.props.updateList(this.state.items);
        this.props.updateSelectedItem(this.state.selectedItem);
        this.props.setHasChanged(true);
        this.props.setHasSaved(false);
    }

    handleUnselect = () => {
        var items = this.props.wireframe.controlList;
        for (let i = 0; i < items.length; i++) {
            items[i].selected = false;
        }
        this.setState({selectedItem: null});
        this.setState({items});
        this.props.updateList(this.state.items);
        // this.props.updateSelectedItem(this.state.selectedItem);
        this.props.setHasChanged(true);
        this.props.setHasSaved(false);
    }

    render(){
        var items = this.props.wireframe.controlList;
        console.log("items", items);
        return (
            // <div className="col s6 display-place total-tool">
            //     <Scrollbars autoHide={false} autoHideTimeout={500} autoHideDuration={200}>
            //     <div style={{width:10010,height:1000}} onClick={this.handleUnselect}>
            //         {items && items.map(item => (
            //             <ControlCard key={item.id} control={item} handleSelect={this.handleSelect}></ControlCard>
            //         ))}
            //     </div>
            //     </Scrollbars>
            // </div>
            <div className="col s6 display-place total-tool"  onKeyDown={this.onKeyPressed}
            tabIndex="0">
            <TransformWrapper
            defaultScale={1}
            defaultPositionX={200}
            defaultPositionY={100}
            wheel={false}
            pinch={true}
          >
            {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
              <React.Fragment>
                <Button small 
                    waves="red"
                    node="button" 
                    className="col s3 wireframe-top-button" 
                    icon={<Icon>zoom_in</Icon>} 
                    onClick={zoomIn}>  
                </Button>
                <Button small 
                    waves="green"
                    node="button" 
                    className="col s3 wireframe-top-button" 
                    icon={<Icon>zoom_out</Icon>}
                    onClick={zoomOut}>  
                </Button>
                <Scrollbars autoHide={false} autoHideTimeout={500} autoHideDuration={200}>
                <TransformComponent>
                <div style={{ height: "100%", width: "100%" }}>
                <div style={{width:1000,height:1000}} onClick={this.handleUnselect}>
                    {items && items.map(item => (
                        <ControlCard key={item.id} control={item} handleSelect={this.handleSelect}></ControlCard>
                    ))}
                </div>
                </div>
                </TransformComponent>
                </Scrollbars>
              </React.Fragment>
            )}
          </TransformWrapper>
          </div>
        );
    }
}

export default EditArea;