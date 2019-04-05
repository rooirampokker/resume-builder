import React, { Component } from 'react';
import Gauge from '../components/charts/Gauge';

class SkillsMatrix extends Component {
    constructor (props) {
        super(props);
        this.details     = props.details;
        this.id          = props.id;
        this.trackBG     = {};
        this.trackData   = [];
        this.sectionAvg  = 0;
        this.sectionWght = 0;
        this.totalItems  = 0;
        this.totalScore  = 0;
        this.trackWidth  = '10px';
        this.colorArray  = ["#FF178E",
                            "#9813EB",
                            "#232CFF",
                            "#079DEB",
                            "#FF178E",
                            "#9813EB",
                            "#232CFF",
                            "#079DEB",
                            "#FF178E",
                            "#9813EB",
                            "#232CFF",
                            "#079DEB"];
    }
/*
* //gets sections - 'Front End', 'Back End', Dev Ops', etc
*/
    setSection() {
        return Object.keys(this.details).map((sectionName, key) => {
            let subDetailsObj  = this.details[sectionName];
            this.setSubSection(subDetailsObj, sectionName);
            return (
                <div className="col-md-4"
                     key = {"gauge-"+sectionName+key}
                >
                    <Gauge
                        name       = {sectionName}
                        data       = {{trackData: this.trackData}}
                        trackWidth = {this.trackWidth}
                    />
                </div>

            );
        });
    }
/*
* Get constituents that make up each section (eg. Dev Ops {Jenkins, CircleCI, etc})
 */
    setSubSection(subDetailsObj, sectionName) {
        this.trackData    = [];//to be reset with each iteration...
        this.totalItems   = Object.keys(subDetailsObj).length
        let thisPerc      =  100;
        let percDecrement = this.calculateTrackWidth(subDetailsObj);
        Object.keys(subDetailsObj).forEach((subValue, subKey) => {
            thisPerc        -= percDecrement;
            this.totalScore += subDetailsObj[subValue];
            this.trackData.push(this.buildHighchartsTrack(subValue, subDetailsObj[subValue], subKey, thisPerc));
        });
    }
/*
* Determines track width - large sections need narrower tracks to ensure everything fits
* The percentage difference must also decrease in smaller increments to ensure we don't decrease band offset into the minusses
*/
    calculateTrackWidth(trackDetails) {
        let percDecrement = 10;
        if (Object.keys(trackDetails).length > 9) {
            percDecrement = 5;
            this.trackWidth = '6px';
        } else {
            this.trackWidth = '14px';
        }
        return percDecrement;
    }
/*
* Highcharts JSON component
 */
    buildHighchartsTrack(trackTitle, trackVal, counter, thisPerc) {
        return {
            name: trackTitle,
            borderColor: this.colorArray[counter],
            data: [{
                y: trackVal*20,
                color: this.colorArray[counter],
                radius: thisPerc+'%',
                innerRadius: thisPerc+'%',
            }]
        };
    }
/*
*
*/
    render() {
        return (
            <div
                className="tab-content"
                id={"nav-"+this.id}>
                <div className="row">
                    {this.setSection()}
                </div>
            </div>
        )}
}

export default SkillsMatrix;