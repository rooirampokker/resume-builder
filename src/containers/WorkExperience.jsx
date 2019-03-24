import React, { Component } from 'react';

const WorkExperience = (props) => {
    const details = Object.keys(props).map((value, key) => {
    if (value !== 'key' && value !== 'id') {
        return(
            <div className='textLabel'>
                {value}
            </div>
        )
    }
    });
    return(
        <>
            <div
                className="tab-content"
                id={"nav-"+props.id}>
                {props.details}
            </div>
        </>
    )
}

export default WorkExperience;