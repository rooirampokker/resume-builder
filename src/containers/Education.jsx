import React, { Component } from 'react';

const Education = (props) => {
    const details = Object.keys(props.details).map((value, key) => {
        if (value !== 'key' && value !== 'id') {
            return(
                <div className='textLabel'
                     key={"educationContent-"+key}>
                    {value}
                </div>
            )
        } else return '';
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

export default Education;