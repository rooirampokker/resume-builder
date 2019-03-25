import React, { Component } from 'react';

const PersonalDetails = (props) => {
    const details = Object.keys(props.details).map((value, key) => {
            return(
                <div className="row"
                     key={"personalDetailsContent-"+key}>
                    <div className='textLabel col-3'>
                        {value}
                    </div>
                    <div className='textValue col'>
                        {props.details[value]}
                    </div>
                </div>
            )
    });
    return(
            <div className="container">
                {details}
            </div>
    )
}

export default PersonalDetails;