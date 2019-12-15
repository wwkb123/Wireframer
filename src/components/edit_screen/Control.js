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
    }

}

export default Control;