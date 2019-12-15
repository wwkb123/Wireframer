import React, { Component } from 'react';


class Control extends Component{

    constructor(attrs){
        super(attrs);
        this.id = attrs.id;
        this.type = attrs.type;
        this.centerX = attrs.centerX;
        this.centerY = attrs.centerY;
        this.width = attrs.width;
        this.height = attrs.height;
        this.properties = attrs.properties;
        this.id = attrs.id
        this.selected = false
        this.top = 50;
        this.left = 50;
        this.borderColor = 'black';
        this.text = attrs.text;
    }

}

export default Control;