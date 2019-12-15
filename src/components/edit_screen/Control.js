import React, { Component } from 'react';


class Control extends Component{

    constructor(attrs){
        super(attrs);
        this.id = attrs.id;
        this.type = attrs.type;
        this.width = attrs.width;
        this.height = attrs.height;
        this.selected = false;
        this.top = 50;
        this.left = 50;
        this.text = attrs.text?attrs.text:"";
        this.fontSize = 14;
        this.textColor = attrs.textColor?attrs.textColor:"#000000";
        this.backgroundColor = attrs.backgroundColor?attrs.backgroundColor:"#FFFFFF";
        this.borderColor = '#000000';
        this.borderThickness = 1;
        this.borderRadius = 0;
    }

}

export default Control;