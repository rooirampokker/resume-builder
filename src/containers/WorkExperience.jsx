import React, { Component } from 'react';
import Utils from '../utils/Utils';
import InputRange from 'react-input-range';
import { Row, Col } from 'react-bootstrap';
import './WorkExperience.css';
import ('react-input-range/lib/css/index.css');


class WorkExperience extends Component {
    constructor(props) {
        super(props);
        this.details  = props.details;
        this.utils    = new Utils();
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
          }}
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
    checkEmployers(value) {
       let rangeStart = new Date(value.min).getFullYear();
       let rangeEnd   = new Date(value.max).getFullYear();

       return (Object.keys(this.details).map((item, index) => {
           let employmentStart = new Date(this.details[index].From).getFullYear();
           let employmentEnd   = new Date(this.details[index].To).getFullYear();
           if ((employmentStart >= rangeStart && (employmentStart <= rangeEnd || employmentStart <= rangeStart)) ||
               (rangeStart >= employmentStart && rangeEnd <= employmentEnd)
             ) { //caters for overlap when you started at a new company outside the selected range, but left for another company inside said range
               return (
                   <div className={"activeEmployer"}
                        key={"employer"+index}>
                       {this.getActiveEmployer(this.details[index])}
                   </div>
               );
           } else return false;
        }));
    }
    /*
    *
    */
    getActiveEmployer(employer) {
        return Object.keys(employer).map((label, val) => {
            let formattedLabel = this.formatLabel(label);
            let formattedContent = this.formatContent(employer[label]);
                return (
                    <Row
                        key = {"employerCol"+val}>
                        {formattedLabel}
                        {formattedContent}
                    </Row>);
        });
    }
    /*
    *
     */
    formatList(listContent) {
        JSON.stringify(listContent)
    }
    /*
    *
     */
    formatLabel(label) {
        return(
            <Col
                md={2}
                className={"label"}>
                {label}
            </Col>);
    }
    /*
    *
     */
    formatContent(content) {
        if (!Array.isArray(content)) {
            return (
                <Col md={10}
                     className={"value"}>
                    {content}
                </Col>);
        } else {
            let list = this.formatList(content);
            return (
               JSON.stringify(content)
            )
}

    }
/*
* Ensures that user doesn't drag the timeline out of range
*/
    validateRange(value) {
        //necessary for now to only compare years - the slider
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
* We need to determine the start and end dates here - get start and end dates for all listed items in supplied data, then find earliest and latest date as input
*/
    generateTimeline() {
        return (
            <Row
                id = {this.componentName+"RowTimeline"}>
                <Col
                    md={8}
                    className='textLabel label'>
                    <InputRange
                        draggableTrack
                        step    ={31536000*1000}
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
*
*/
    render() {
        return (
            <div className="container-fluid">
                {this.generateTimeline()}
                {this.checkEmployers(this.state.value)}
            </div>
        );
    }
}

export default WorkExperience;