import React, { Component } from 'react';

const Content = (props) => {
    const details = Object.keys(props).map((value, key) => {
        if (value !== 'key' && value !== 'id') {
            return(
                <div className='textLabel'>
                    {value}
                </div>
            )
        } else return '';
    });
    return(
        <>
            <div
                className="tab-content"
                key={props.key}
                id={"nav-"+props.id}>
                {props.details}
            </div>
        </>
    )
}

export default Content;