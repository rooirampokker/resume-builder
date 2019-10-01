import React, { Component } from 'react';
import Utils from '../utils/Utils';
import {Row} from 'react-bootstrap';
import Formatting from "../utils/Formatting";

class Education extends Component {
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
    filterItems() {
        return (Object.keys(this.details).map((item, index) => {
                return (
                    <div className = {"qualification-container"}
                         key       = {"qualification-container" + index}>
                        {this.getItems(this.details[index])}
                    </div>
                );
        }));
    }
    /*
    *
    */
        getItems(institution) {
            return Object.keys(institution).map((index) => {
                let label   = this.formatting.formatLabel(index, 2);
                let content = this.formatting.formatContent(institution[index], 10);
                return (
                    <Row
                        id  = {"establishment-row-" + index}
                        key = {this.componentName+"-content-" + index}>
                        {label}
                        {content}
                    </Row>);
            });
        }
    render() {
        return (
            <div className = {this.componentName+" container"}
                 id        = {this.componentName+"-container"}>
                {this.filterItems()}
            </div>
        )
    }
}

export default Education;