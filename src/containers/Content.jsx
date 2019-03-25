import React, { Component } from 'react';

const Content = (props) => {
    const details = Object.keys(props.details).map((value, key) => {
        if (value !== 'key' && value !== 'id') {
            return(
                <div className="row"
                     key={"genericContent-"+key}>
                    <div className='textLabel col-2'>
                        {value}
                    </div>
                    <div className='textValue col'>
                        {props.details[value]}
                    </div>
                </div>
            )
        } else return '';
    });
    return(
        <div className="container">
            {details}
        </div>
    )
}

export default Content;