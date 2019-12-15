import React, { Component } from 'react';


class Control extends Component{

    constructor(attrs){
        super(attrs);
        this.id = attrs.id;
        this.type = attrs.type;
        this.width = attrs.width;
        this.height = attrs.height;
        this.selected = false;
        this.top = attrs.top?attrs.top:50;
        this.left = attrs.left?attrs.left:50;
        this.text = attrs.text?attrs.text:"";
        this.fontSize = attrs.fontSize?attrs.fontSize:14;
        this.textColor = attrs.textColor?attrs.textColor:"#000000";
        this.backgroundColor = attrs.backgroundColor?attrs.backgroundColor:"#FFFFFF";
        this.borderColor = attrs.borderColor?attrs.borderColor:'#000000';
        this.borderThickness = attrs.borderThickness?attrs.borderThickness:1;
        this.borderRadius = attrs.borderRadius?attrs.borderRadius:0;
    }

}

export default Control;