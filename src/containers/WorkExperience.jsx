import React, { Component } from 'react';
import Utils from '../utils/Utils';
import InputRange from 'react-input-range';
import ('react-input-range/lib/css/index.css');

class WorkExperience extends Component {
    constructor(props) {
        super(props);
        this.value    = props.value;
        this.details  = props.details;
        this.utils    = new Utils();
        this.earliestDate = new Date().getTime();
        this.componentName = this.utils.camelize(this.constructor.name);
        this.state = {
            value: { min: 2, max: 10 },
        };
    }
/*
* We need to determine the start and end dates here - get start and end dates for all listed items in supplied data, then find earliest and latest date as input
*/
    generateTimeline() {
        console.log(this.details[0]);
        Object.keys(this.details).forEach((item, index) => {
            let fromDate = this.details[index].From;
            let toDate   = this.details[index].To;
            console.log("From: "+fromDate+" -- Timestamp: "+this.utils.toTimeStamp(fromDate));
            console.log("To: "+fromDate+" -- Timestamp: "+this.utils.toTimeStamp(toDate));
            console.log('----');

        });

        return (
            <div className= "row"
                 id       = {this.componentName+"RowTimeline"}>
                <div className='textLabel col-8 label'>
                    <InputRange
                        draggableTrack
                        maxValue={20}
                        minValue={0}
                        onChange={value => this.setState({ value: value })}
                        onChangeComplete={value => console.log(value)}
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