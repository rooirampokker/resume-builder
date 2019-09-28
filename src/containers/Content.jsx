import Formatting from '../utils/Formatting';
import React, { Component } from 'react';
import Utils from '../utils/Utils';
import { Row } from 'react-bootstrap';

class Content extends Component {
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
    buildRow() {
        return Object.keys(this.details).map((item, index) => {
            let label   = this.formatting.formatLabel(item, 2);
            let content = this.formatting.formatContent(this.details[item], 10);
            return (
                <Row
                    id       = {this.componentName+"Row"+index}
                    key      = {this.componentName+"Content-" + item}>
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
                {this.buildRow()}
            </div>
        )
    }
}

export default Content;