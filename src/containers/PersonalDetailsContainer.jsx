import React, { Component } from 'react';

const PersonalDetailsContainer = (props) => {
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
                key={props.key}
                id={"nav-"+props.id}>
                {details}
            </div>
        </>
    )
}

export default PersonalDetailsContainer;