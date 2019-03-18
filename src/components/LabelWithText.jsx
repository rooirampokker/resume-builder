import React, { Component } from 'react';

class labelWithText extends Component {
    constructor(props){
        super(props);
        this.id        = props.id;
        this.class     = props.class;
        this.labelText = props.inputType;
        this.valueText = props.action;
    }



    render() {
        return (
            <React.Fragment>

            </React.Fragment>
        );
    }
}

export default labelWithText;