import React, { Component } from 'react';

const SkillsMatrix = (props) => {
    const details = Object.keys(props.details).map((value, key) => {
    let   subDetailsObj = props.details[value];
    let   totalScore = 0;
    let   totalCount = 0;
    let   subDetails = Object.keys(subDetailsObj).map((subValue, subKey) => {
            let subContent = subDetailsObj[subValue];
            totalScore += subContent;
            totalCount = subKey+1;

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
        let sectionAverage = Math.round((totalScore/totalCount)*100)/100;
        return (
            <>
                <div className="row"
                     key={"skillsMatrixContent-" + key}>
                    <div className="textValue col-6">
                        <b>{value}</b>
                    </div>
                    <div className="textValue col-6">
                        <b>{"Section Weight: "+totalScore}</b>
                    </div>
                </div>
                <div className="row">
                    <div className="textValue col-6">
                        &nbsp;
                    </div>
                    <div className="textValue col-6">
                        <b>{"Section Average: "+sectionAverage}</b>
                    </div>
                    {subDetails}
                </div>
            </>
        );
    });
    return(
        <>
            <div
                className="tab-content"
                id={"nav-"+props.id}>
                {details}
            </div>
        </>
    )
}

export default SkillsMatrix;