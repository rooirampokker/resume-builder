import React, { Component } from 'react';
import Gauge from '../components/charts/Gauge';
import Utils from '../utils/Utils';

class SkillsMatrix extends Component {
    constructor (props) {
        super(props);
        this.details     = props.details;
        this.id          = props.id;
        this.trackData   = [];
        this.trackBG     = [];
        this.trackBGOpacity = 0.2;
        this.wideTrackWidth = "14px";
        this.narrowTrackWidth = "7px";
        this.sectionAvg  = 0;
        this.sectionWght = 0;
        this.totalItems  = 0;
        this.totalScore  = 0;
        this.innerRadiusMod = 0;
        this.percDecrement = 10; //each band should be 5% smaller than previous
        this.utils         = new Utils();
        this.trackWidth  = '10px';
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
                        dataBG     = {this.trackBG}
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
        this.trackBG      = [];
        this.totalItems   = Object.keys(subDetailsObj).length
        let thisPerc      =  100;
        this.calculateTrackWidth(subDetailsObj);
        Object.keys(subDetailsObj).forEach((subValue, subKey) => {
            thisPerc        -= this.percDecrement;
            this.totalScore += subDetailsObj[subValue];
            this.trackData.push(this.buildHighchartsTrack(subValue, subDetailsObj[subValue], subKey, thisPerc));
            this.trackBG.push(this.buildHighchartsTrackBG(thisPerc, subKey));
        });
    }
/*
* Determines track width - large sections need narrower tracks to ensure everything fits
* The percentage difference must also decrease in smaller increments to ensure we don't decrease band offset into the minusses
*/
    calculateTrackWidth(trackDetails) {
        if (Object.keys(trackDetails).length > 9) {
            this.percDecrement = 5;
            this.innerRadiusMod = 0;
            this.trackWidth = this.narrowTrackWidth;
        } else {
            this.percDecrement = 10;
            this.innerRadiusMod = 0;
            this.trackWidth = this.wideTrackWidth;
        }
    }
/*
* Highcharts JSON components
 */
    buildHighchartsTrack(trackTitle, trackVal, counter, thisPerc) {
        return {
            name: trackTitle,
            borderColor: this.utils.pickColor(counter),
            data: [{
                y: trackVal*20,
                color: this.utils.pickColor(counter),
                radius: thisPerc+'%',
                innerRadius: thisPerc+'%',
            }]
        };
    }
/*
*
 */
    buildHighchartsTrackBG(currentPerc, counter) {
        let color  = this.utils.pickColor(counter);
        let rgbCol = this.utils.hexToRgb(color);
        return { // Track for Test -- note that each percentage value is currently increased by 10% as indication of band-width
                outerRadius: (currentPerc+this.percDecrement/2)+'%',
                innerRadius: ((currentPerc+this.percDecrement/2)-(this.percDecrement)+this.innerRadiusMod)+'%',
                backgroundColor: "rgb("+rgbCol.r+", "+rgbCol.g+", "+rgbCol.b+", "+this.trackBGOpacity+")",
                borderWidth: 0
            }
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