import React, { Component } from 'react';
import Utils from '../utils/Utils';
import { Row, Col } from 'react-bootstrap';

class PersonalDetails extends Component {
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
                <Row
                    id       = {this.componentName+"Row"+key}
                    key      = {this.componentName+"Content-" + key}>
                    <Col
                        md={2}>
                        {value}
                    </Col>
                    <Col  md={10}>
                        {this.details[value]}
                    </Col>
                </Row>
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

export default PersonalDetails;