import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import ControlCard from './ControlCard';

class EditArea extends Component{
    state = {
        items : this.props.state.currWireframe.items,
        selectedItem : null
    }

    handleSelect = (item, e) => {
        e.stopPropagation();
        var items = this.state.items;
        for (let i = 0; i < items.length; i++) {
            if(item == items[i]){
                items[i].selected = true;
                this.setState({selectedItem: items[i]});
            }else{
                items[i].selected = false;
            }
        }
        this.setState({items})
    }

    handleUnselect = () => {
        var items = this.state.items;
        for (let i = 0; i < items.length; i++) {
            items[i].selected = false;
        }
        this.setState({selectedItem: null});
        this.setState({items})
    }

    render(){
        var items = this.state.items;
        console.log("items", items);
        return (
            <div className="col s6 display-place total-tool">
                <Scrollbars autoHide={false} autoHideTimeout={500} autoHideDuration={200}>
                <div style={{width:10010,height:1000}} onClick={this.handleUnselect}>
                    {items && items.map(item => (
                        <ControlCard key={item.id} control={item} handleSelect={this.handleSelect}></ControlCard>
                    ))}
                </div>
                </Scrollbars>
            </div>
        );
    }
}

export default EditArea;