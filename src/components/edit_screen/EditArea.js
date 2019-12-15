import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import ControlCard from './ControlCard';

class EditArea extends Component{

    
    render(){
        var items = this.props.state.currWireframe.items;
        console.log("items", items);
        return (
            <div className="col s6 display-place total-tool">

                
                <Scrollbars autoHide={false} autoHideTimeout={500} autoHideDuration={200}>
                <div style={{width:10010,height:1000}}>
                    {items && items.map(item => (
                        <ControlCard control={item}></ControlCard>
                    ))}
                </div>
                </Scrollbars>
            </div>
        );
    }
}

export default EditArea;