import React, { Component } from 'react';
import { render } from 'react-dom'
import Gauge from '../components/charts/Gauge';

class SkillsMatrix extends Component {
    constructor (props) {
        super(props);
        this.key         = props.key;
        this.details     = props.details;
        this.id          = props.id;
        this.sectionData = {};
        this.trackData   = [];
        this.sectionAvg  = 0;
        this.sectionWght = 0;
        this.totalItems  = 0;
        this.totalScore  = 0;
        this.colorArray  = ["#a13b73",
                            "#d4a62b",
                            "#e61c4b",
                            "#4b20c9",
                            "#704ac6",
                            "#c70d8e",
                            "#017716",
                            "#e2385c",
                            "#0145dc",
                            "#bca388",
                            "#763a72",
                            "#e7fc44",
                            "#2b4019",
                            "#e39882",
                            "#966ff9"];
    }
/*
* //gets sections - 'Front End', 'Back End', Dev Ops', etc
*/
    getSection() {
        return Object.keys(this.details).map((sectionName, key) => {
            this.totalScore = 0;
            this.totalItems = 0;
            let   subDetailsObj = this.details[sectionName];
            let   subSection = this.getSubSection(subDetailsObj, sectionName);
            this.sectionData = {
                trackData: this.trackData
            }
            let sectionAverage = Math.round((this.totalScore/this.totalItems)*100)/100;
            return (
                <div className="col-md-4">
                    <Gauge
                        name={sectionName}
                        data={this.sectionData}
                    />
                </div>

            );
        });
    }
/*
* Get constituents that make up each section (eg. Dev Ops {Jenkins, CircleCI, etc})
 */
    getSubSection(subDetailsObj, sectionName) {
        this.trackData = [];
        let thisPerc =  100;
        return Object.keys(subDetailsObj).map((subValue, subKey) => {
            thisPerc -= 5;
            let subContent = subDetailsObj[subValue];
            this.totalScore += subContent;
            this.totalItems = subKey+1;
            this.trackData.push({
                name: subValue,
                borderColor: this.colorArray[subKey],
                data: [{
                    y: subContent*20,
                    color: this.colorArray[subKey],
                    radius: thisPerc+'%',
                    innerRadius: thisPerc+'%',
                }]
            });
            // this.series.push(meh);
            return (
                <>
                    <div className='textValue col-6'>
                        {subValue}
                    </div>
                    <div className='textValue col-6'>
                        {subContent}
                    </div>
                </>
            )
        });
    }
    render() {
        return (
            <div
                className="tab-content"
                id={"nav-"+this.id}
                key={this.key}>
                <div className="row">
                    {this.getSection()}
                </div>
            </div>
        )}
}

export default SkillsMatrix;