import React, { Component } from 'react';

const SkillsMatrix = (props) => {
    const details = Object.keys(props.details).map((value, key) => {
    let   subDetailsObj = props.details[value]
    let   subDetails = Object.keys(subDetailsObj).map((subValue, subKey) => {
            let subContent = subDetailsObj[subValue];
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
        return (
            <div className="row"
                 key={"skillsMatrixContent-" + key}>
                <div className="textValue col-12">
                    <b>{value}</b>
                </div>
                {subDetails}

            </div>
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