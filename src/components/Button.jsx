import React, { Component } from 'react';
class Button extends Component {
    constructor(props) {
       super(props);
       this.title = props.title ? props.title : 'Click Me';
       this.action = props.action;
       this.state = {

       }
    }

    render () {
        return (
            <React.Fragment>
                <button
                    value='submit'
                    type='submit'
                    id='submit'
                    onClick={this.action}
                    class='btn btn-primary'>
                    {this.title}
                </button>
                <br/>
            </React.Fragment>
        );
    }
}
export default Button;