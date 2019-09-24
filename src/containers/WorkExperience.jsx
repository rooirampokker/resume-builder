import React, { Component } from 'react';
import Utils from '../utils/Utils';
import InputRange from 'react-input-range';
import Moment from 'react-moment';
import ('react-input-range/lib/css/index.css');

class WorkExperience extends Component {
    constructor(props) {
        super(props);
        this.details  = props.details;
        this.utils    = new Utils();
        this.componentName = this.utils.camelize(this.constructor.name);
        this.earliestDate = 999999999999;
        this.latestDate = 0;
        this.currentRange = 0;
        this.initDateRange();
    }
/*
*
*/
    initDateRange() {
        Object.keys(this.details).forEach((item, index) => {
            this.fromDate = this.utils.toTimeStamp(this.details[index].From);
            this.toDate   = this.utils.toTimeStamp(this.details[index].To);
            this.earliestDate =
                this.currentDateStart = (this.fromDate <= this.earliestDate) ? this.fromDate : this.earliestDate;
            this.latestDate =
                this.currentDateEnd = (this.fromDate >= this.latestDate) ? this.toDate : this.latestDate;
        });
        this.state = {value: {
            min: this.latestDate-(31536000*1000)*5,
            max: this.latestDate,
            currentRange: 0
            }}
    }

    showSectionInRange(value) {
        let startDate = new Date(value.min);
        let endDate   = new Date(value.max);
        console.clear();
        Object.keys(this.details).forEach((item, index) => {
           let fromDate = new Date(this.details[index].From);
           let toDate   = new Date(this.details[index].To);
           if ((fromDate > startDate && fromDate < endDate) ||
               (toDate > startDate && toDate < endDate)) {
               console.log(this.details[index]);
           }
        });
    }
    validateRange(value) {
        if (value.min >= this.earliestDate &&
            value.max <= this.latestDate) {
            this.setState({value: value});
        }
    };
/*
*
 */
/*
* We need to determine the start and end dates here - get start and end dates for all listed items in supplied data, then find earliest and latest date as input
*/
    generateTimeline() {
        return (
            <div className= "row"
                 id       = {this.componentName+"RowTimeline"}>
                <div className='textLabel col-8 label'>
                    <InputRange
                        draggableTrack
                        step={31536000*1000}
                        maxValue={this.latestDate}
                        minValue={this.earliestDate}
                        value={this.state.value}
                        onChange={value => this.validateRange(value)}
                        onChangeComplete={value => this.showSectionInRange(value)}
                        formatLabel={value => new Date(value).toLocaleDateString("en-US", {year: 'numeric'})}/>
                </div>
            </div>
        );
    }

/*
*
*/
    render() {
        return (
            <div className="container-fluid">
                {this.generateTimeline()}
                    <div className= "row"
                         id       = {this.componentName+"RowTimeline"}>
                        <div className='textLabel col-8 label'>
                            {
                                //previous employment to be listed here if slider value allows
                            }
                        </div>
                    </div>
            </div>
        );
    }
}

export default WorkExperience;