import React, { Component } from 'react';

const ContentContainer = (props) => {
    return(
        <>
            <div
                className="tab-content"
                key={props.key}
                id={"nav-"+props.id}>
                {props.content}
            </div>
        </>
    )
}

export default ContentContainer;