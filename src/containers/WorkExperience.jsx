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
        this.componentName = this.utils.camelize(this.constructor.name);
        this.state = {
            value: { min: 2, max: 10 },
        };
    }
    render() {
        return (
            <>
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
                <div className= "row"
                     id       = {this.componentName+"RowTimeline"}>
                    <div className='textLabel col-8 label'>
                        {
                            //JSON.stringify(this.details[0].From)
                            JSON.stringify(this.details)

                        }

                    </div>
                </div>
            </>
        );
    }
}

export default WorkExperience;