import React, { Component } from 'react';

class genericInput extends Component {
    constructor(props){
        super(props);
        this.id        = props.id;
        this.class     = props.class;
        this.inputType = props.inputType;
        this.action    = props.action;
        this.state     = {
             value: '1'
                         }
    }



    render() {
        return (
            <React.Fragment>
                <input type     = {this.inputType}
                       id       = {this.id}
                       class    = {this.class}
                       onChange = {this.action}
                />
            </React.Fragment>
        );
    }
}

export default genericInput;