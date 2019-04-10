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
        this.earliestDate = 999999999999;
        this.latestDate = 0;
        this.initDateRange();
    }
/*
*
*/
    initDateRange() {
        Object.keys(this.details).forEach((item, index) => {
            this.fromDate = this.utils.toTimeStamp(this.details[index].From);
            this.toDate   = this.utils.toTimeStamp(this.details[index].To);
            this.earliestDate = (this.fromDate <= this.earliestDate) ? this.fromDate : this.earliestDate;
            this.latestDate = (this.fromDate >= this.latestDate) ? this.toDate : this.latestDate;
        });
        this.state = {value: {
            min: this.latestDate-(31536000*1000)*5,
            max: this.latestDate,
            }}
    }
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
                        onChange={value => this.setState({ value: value })}
                        onChangeComplete={value => console.log(value)}
                        formatLabel={value => new Date(value).toLocaleDateString("en-US", {year: 'numeric'})}
                        value={this.state.value} />
                </div>
            </div>
        );
    }

/*
*
*/
    render() {
        return (
            <>
                {this.generateTimeline()}
                <div className= "row"
                     id       = {this.componentName+"RowTimeline"}>
                    <div className='textLabel col-8 label'>
                        {
                            //previous employment to be listed here if slider value allows
                        }
                    </div>
                </div>
            </>
        );
    }
}

export default WorkExperience;