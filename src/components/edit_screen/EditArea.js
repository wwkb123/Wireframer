import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

class EditArea extends Component{

    
    render(){
        
        return (
            <div className="col s6 display-place total-tool">
                    
                <Scrollbars autoHide={false} autoHideTimeout={500} autoHideDuration={200}>
                <div style={{width:10010,height:1000}}></div>
                </Scrollbars>
            </div>
        );
    }
}

export default EditArea;