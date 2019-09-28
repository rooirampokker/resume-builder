/*
*
* DEFAULT CLASS - TOP-LEVEL JSON ELEMENTS WITH NO MATCHING CONTAINER FILE RENDERS HERE
*
 */
import Formatting from '../utils/Formatting';
import React, { Component } from 'react';
import Utils from '../utils/Utils';
import { Row } from 'react-bootstrap';

class Content extends Component {
    constructor(props) {
        super(props);
        this.value         = props.value;
        this.details       = props.details;
        this.formatting    = new Formatting({content: this.details});
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
                    id  = {"item-row-"+index}
                    key = {this.componentName+"-content-" + index}>
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
            <div className={"container"}
                 id={this.componentName+"Container"}>
                {this.getItems()}
            </div>
        )
    }
}

export default Content;