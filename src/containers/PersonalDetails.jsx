import React, { Component } from 'react';
import Formatting from '../utils/Formatting';
import Utils from '../utils/Utils';
import { Row } from 'react-bootstrap';

class PersonalDetails extends Component {
    constructor(props) {
        super(props);
        this.value         = props.value;
        this.details       = props.details;
        this.formatting    = new Formatting({content: props.details});
        this.utils         = new Utils();
        this.componentName = this.utils.camelize(this.constructor.name);
    }
    /*
    *
    */
    getItems() {
        return Object.keys(this.details).map((index) => {
            let label   = this.formatting.formatLabel(index, 2);
            let content = this.formatting.formatContent(this.details[index], 10);
            return (
                <Row
                    id       = {"personal-row-"+index}
                    key      = {this.componentName+"-content-" + index}>
                    {label}
                    {content}
                </Row>);
        });
    }
    /*
    *
    */
    render() {
        return (
            <div className={this.componentName+" container"}
                 id={this.componentName+" container"}>
                {this.getItems()}
            </div>
        )
    }
}

export default PersonalDetails;