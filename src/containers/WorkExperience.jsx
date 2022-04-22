import React, {Component} from 'react';
import Utils from '../utils/Utils';
import Formatting from '../utils/Formatting';
import {Row, Col} from 'react-bootstrap';
import './WorkExperience.css';

class WorkExperience extends Component {
    constructor(props) {
        super(props);
        this.details       = props.details;
        this.utils         = new Utils();
        this.formatting    = new Formatting({content: this.details});
        this.componentName = this.utils.camelize(this.constructor.name);
        this.initialRange  = 5;
        this.earliestDate  = 0;
        this.latestDate    = 0;
        this.state         = {
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
        //this.initDateRange();
    }
    /*
    *
    */ 
    // initDateRange() {
    //     Object.keys(this.details).forEach((index) => {
    //         this.fromDate     = this.utils.toTimeStamp(this.details[index].From);
    //         this.toDate       = this.utils.toTimeStamp(this.details[index].To);
    //         this.earliestDate = ((this.fromDate <= this.earliestDate) || this.earliestDate === 0) ? this.fromDate : this.earliestDate;
    //         this.latestDate   = (this.toDate >= this.latestDate || this.latestDate === 0) ? this.toDate : this.latestDate;
    //     });
    //     this.setState({
    //         value: {
    //             min: this.latestDate - (31536000 * 1000) * this.initialRange,
    //             max: this.latestDate,
    //         },
    //         latestDate: this.latestDate,
    //         earliestDate: this.earliestDate
    //     });
    // }

    /*
    *
    */
    filterItems() {
        let value      = this.state.value;
        let rangeStart = new Date(value.min).getFullYear();
        let rangeEnd   = new Date(value.max).getFullYear();

        return (Object.keys(this.details).map((index) => {
            let employmentStart = new Date(this.details[index].From).getFullYear();
            let employmentEnd   = new Date(this.details[index].To).getFullYear();
            if ((employmentStart >= rangeStart && (rangeEnd >= employmentStart || employmentStart <= rangeStart)) ||
                (employmentStart <= rangeStart && rangeEnd <= employmentEnd)) { //caters for overlap when you started at a new company outside the selected range, but left for another company inside said range
                return (
                    <div className = {"employer-container"}
                         key       = {"employer-container"+index}>
                        {this.getItems(this.details[index])}
                    </div>
                );
            } else return false;
        }));
    }
    /*
    *
    */
    getItems(employer) {
        return Object.keys(employer).map((index) => {
            if (index === "Projects") {
                return this.setEmploymentProjects(employer, index);
            } else {
                return this.setGenericItems(employer, index);
            }

        });
    }
    /*
    *
    */
    setGenericItems(employer, index) {
        let formattedLabel   = this.formatting.formatLabel(index, 2);
        let formattedContent = this.formatting.formatContent(employer[index], 10);
        return (
            <Row
                id  = {"employer-row-"+index}
                key = {this.componentName+"-content-"+index}>
                {formattedLabel}
                {formattedContent}
            </Row>);
    }
    /*
    *
    */
    setEmploymentProjects(employer, index) {
        let projects    = employer[index];
        let projectAttribute = '';
        return Object.keys(projects).map((project) => {
            projectAttribute = this.setProjectAttribute(projects, project);
            return (
                <div
                    className = "project"
                    key       = {this.componentName+"-project-"+project}>
                    {projectAttribute}
                </div>
            );
        });

    }
/*
* //SETS SINGLE LABEL/VALUE ITEM FOR A SPECIFIC PROJECT
*/
    setProjectAttribute(projects, project) {
        let label       = '';
        let description = '';
        return Object.keys(projects[project]).map((index) => {
            label       = this.formatting.formatLabel(index, 2);
            description = this.formatting.formatContent(projects[project][index], 10);
            return (
                <Row
                    id  = {"employer-project-row-"+project+'-'+index.toLowerCase()}
                    key = {this.componentName+"-content-"+project+index}>
                    {label}
                    {description}
                </Row>
            )
        });
    }
    /*
    * Ensures that user doesn't drag the timeline out of range
    */
    validateRange(value) {
        let maxYear    = new Date(value.max).getFullYear();
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
                id={this.componentName + "RowTimeline"}>
                <Col
                    md={12}
                    className='textLabel label'>
                    <InputRange
                        draggableTrack
                        step       ={31536000 * 1000}
                        maxValue   ={this.state.latestDate}
                        minValue   ={this.state.earliestDate}
                        value      ={this.state.value}
                        onChange   ={value => this.validateRange(value)}
                        //onChangeComplete={value => this.showSectionInRange(value)}
                        formatLabel={value => new Date(value).toLocaleDateString("en-US", {year: 'numeric'})}/>
                </Col>
            </Row>
        );
    }

    render() {
        return (
            <div className={this.componentName+" container"}
                 id={this.componentName+"-container"}>
                <div className={"timeline-container"}>
                    {this.generateTimeline()}
                </div>
                {this.filterItems()}
            </div>
        );
    }
}

export default WorkExperience;