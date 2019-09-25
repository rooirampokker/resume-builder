import React, { Component } from 'react';
import Utils from '../utils/Utils';
import InputRange from 'react-input-range';
import ('react-input-range/lib/css/index.css');

class WorkExperience extends Component {
    constructor(props) {
        super(props);
        this.details  = props.details;
        this.utils    = new Utils();
        this.componentName = this.utils.camelize(this.constructor.name);
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
    componentDidMount() {
      this.showSectionInRange(this.state.value);
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
          min: this.latestDate - (31536000 * 1000) * 5,
          max: this.latestDate,
        },
        latestDate: this.latestDate,
        earliestDate: this.earliestDate
      });
    }
/*
*
*/
    showSectionInRange(value) {
        let startDate = new Date(value.min).getFullYear();
        let endDate   = new Date(value.max).getFullYear();
        console.clear();
        Object.keys(this.details).forEach((item, index) => {
           let fromDate = new Date(this.details[index].From).getFullYear();
           let toDate   = new Date(this.details[index].To).getFullYear();
           if ((fromDate >= startDate && fromDate <= endDate) ||
             (startDate >= fromDate && endDate <= toDate) ||
             (toDate >= startDate && fromDate <= startDate)) { //caters for overlap when you started at a new company outside the selected range, but left for another company inside said range
               console.log(this.details[index]);
           }
        });
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
            this.setState({value: {
                min: value.min,
                max: value.max
              }});
        }
    };
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
                        step    ={31536000*1000}
                        maxValue={this.state.latestDate}
                        minValue={this.state.earliestDate}
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