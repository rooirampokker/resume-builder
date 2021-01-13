import React, {Component} from 'react';
import Utils from './Utils';
import {Col} from 'react-bootstrap';
import './Formatting.css';

class Formatting extends Component {
    constructor(props) {
        super(props);
        this.utils         = new Utils();
    }
    /*
    *
     */
    formatLabel(label, cols) {
        return (
            <Col
                md={cols}
                className={"label"}>
                {label}
            </Col>);
    }
    /*
    *
     */
    formatContent(content, cols) {
        let htmlContent = {__html: content};
        if (!Array.isArray(content)) {
            return (
                <Col md={cols}
                     className={"content"}
                     dangerouslySetInnerHTML = {htmlContent}>
                </Col>);
        } else {
            return (
                <Col md={cols}>
                    <ul>
                        {this.formatList(content)}
                    </ul>
                </Col>
            )
        }
    }
    /*
    *
     */
    formatList(listContent) {
        return Object.keys(listContent).map((index) => {
            if (typeof listContent[index] == 'string') {
                return (<li className={"listItems"}
                            key={"list" + index}>
                    {listContent[index]}
                </li>);
            } else {
                return Object.keys(listContent[index]).map((label, key) => {
                    let thisLabel = this.formatLabel(label, 2);
                    let thisValue = this.formatContent(listContent[index][label], 5);
                    return (<span key={"object-"+key}>
                               {thisLabel}
                        {thisValue}
                            </span>)
                })
            }
        });
    }
}

export default Formatting;