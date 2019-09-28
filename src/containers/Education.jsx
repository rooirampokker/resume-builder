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
    checkItems() {
        return (Object.keys(this.details).map((item, index) => {
                return (
                    <div className ={"qualification-container"}
                         key       ={"qualification-container" + index}>
                        {this.getItems(this.details[index])}
                    </div>
                );
        }));
    }
    /*
    *
    */
        getItems(employer) {
            return Object.keys(employer).map((index) => {
                let formattedLabel = this.formatting.formatLabel(index, 2);
                let formattedContent = this.formatting.formatContent(employer[index], 10);
                return (
                    <Row
                        id  = {"establishment-row-"+index}
                        key = {this.componentName+"-content-" + index}>
                        {formattedLabel}
                        {formattedContent}
                    </Row>);
            });
        }
    render() {
        return (
            <div className={this.componentName+" container"}
                 id={this.componentName+" container"}>
                {this.checkItems()}
            </div>
        )
    }
}

export default Education;