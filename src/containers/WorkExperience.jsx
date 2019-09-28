import React, {Component} from 'react';
import Utils from '../utils/Utils';
import InputRange from 'react-input-range';
import {Row, Col} from 'react-bootstrap';

import './WorkExperience.css';
import ('react-input-range/lib/css/index.css');

class WorkExperience extends Component {
    constructor(props) {
        super(props);
        this.details = props.details;
        this.utils = new Utils();
        this.componentName = this.utils.camelize(this.constructor.name);
        this.initialRange = 5;
        this.earliestDate = 0;
        this.latestDate = 0;
        this.state = {
            latestDate: 0,
            earliestDate: 0,
            value: {
                min: 0,
                max: 0,
            }
        }
    }
    /*
    *
    */
    componentWillMount() {
        this.initDateRange();
    }
    /*
    *
    */
    initDateRange() {
        Object.keys(this.details).forEach((item, index) => {
            this.fromDate = this.utils.toTimeStamp(this.details[index].From);
            this.toDate = this.utils.toTimeStamp(this.details[index].To);
            this.earliestDate = ((this.fromDate <= this.earliestDate) || this.earliestDate === 0) ? this.fromDate : this.earliestDate;
            this.latestDate = (this.toDate >= this.latestDate || this.latestDate === 0) ? this.toDate : this.latestDate;
        });
        this.setState({
            value: {
                min: this.latestDate - (31536000 * 1000) * this.initialRange,
                max: this.latestDate,
            },
            latestDate: this.latestDate,
            earliestDate: this.earliestDate
        });
    }

    /*
    *
    */
    checkItems(value) {
        let rangeStart = new Date(value.min).getFullYear();
        let rangeEnd = new Date(value.max).getFullYear();

        return (Object.keys(this.details).map((item, index) => {
            let employmentStart = new Date(this.details[index].From).getFullYear();
            let employmentEnd = new Date(this.details[index].To).getFullYear();
            if ((employmentStart >= rangeStart && (rangeEnd >= employmentStart || employmentStart <= rangeStart)) ||
                (employmentStart <= rangeStart && rangeEnd <= employmentEnd)) { //caters for overlap when you started at a new company outside the selected range, but left for another company inside said range
                return (
                    <div className={"activeEmployer"}
                         key={"employer" + index}>
                        {this.getItemsInRange(this.details[index])}
                    </div>
                );
            } else return false;
        }));
    }

    /*
    *
    */
    getItemsInRange(employer) {
        return Object.keys(employer).map((label, val) => {
            let formattedLabel = this.formatLabel(label, 2);
            let formattedContent = this.formatContent(employer[label], 10);
            return (
                <Row
                    key={"employerCol" + val}>
                    {formattedLabel}
                    {formattedContent}
                </Row>);
        });
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
        if (!Array.isArray(content)) {
            return (
                <Col md={cols}
                     className={"value"}>
                    {content}
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
    /*
    * We need to determine the start and end dates here - get start and end dates for all listed items in supplied data, then find earliest and latest date as input
    */
    generateTimeline() {
        return (
            <Row
                id={this.componentName + "RowTimeline"}>
                <Col
                    md={12}
                    className='textLabel label'>
                    <InputRange
                        draggableTrack
                        step={31536000 * 1000}
                        maxValue={this.state.latestDate}
                        minValue={this.state.earliestDate}
                        value={this.state.value}
                        onChange={value => this.validateRange(value)}
                        //onChangeComplete={value => this.showSectionInRange(value)}
                        formatLabel={value => new Date(value).toLocaleDateString("en-US", {year: 'numeric'})}/>
                </Col>
            </Row>
        );
    }

    /*
    * Ensures that user doesn't drag the timeline out of range
    */
    validateRange(value) {
        let maxYear = new Date(value.max).getFullYear();
        let latestYear = new Date(this.latestDate).getFullYear();
        if (value.min > this.earliestDate &&
            maxYear <= latestYear) {
            this.setState({
                value: {
                    min: value.min,
                    max: value.max
                }
            })
        }
    }

    /*
    *
    */
    render() {
        return (
            <div className="container-fluid">
                <div className={"timelineContainer"}>
                    {this.generateTimeline()}
                </div>
                {this.checkItems(this.state.value)}
            </div>
        );
    }
}

export default WorkExperience;