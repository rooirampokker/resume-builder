import React, { Component } from 'react';
import Utils from '../utils/Utils';

class Education extends Component {
    constructor(props) {
        super(props);
        this.value    = props.value;
        this.details  = props.details;
        this.utils    = new Utils();
        this.componentName = this.utils.camelize(this.constructor.name);
    }
    /*
    *
    */
    buildRow() {
        return Object.keys(this.details).map((value, key) => {
            return (
                <div className= "row"
                     id       = {this.componentName+"Row"+key}
                     key      = {this.componentName+"Content-" + key}>
                        <div className='textLabel col-3 label'>
                            {value}
                        </div>
                        <div className='textValue col value'>
                            {"Content here"}
                        </div>
                </div>
            );
        });
    }
    /*
    *
    */
    render() {
        return (
            <div className={"container"}
                 id={this.componentName+"Container"}>
                {this.buildRow()}
            </div>
        )
    }
}

export default Education;