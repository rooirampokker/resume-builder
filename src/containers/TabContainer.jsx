import React, { Component } from 'react';

const TabContainer = (props) => {
    return(
        <li className="nav-item">
            <a className={"nav-link "+props.active}
               id={props.tabId}
               data-toggle="tab"
               href={"#"+props.tabId}
               role="tab"
               aria-controls={props.tabId}
               aria-selected="false">{props.tabLable}</a>
        </li>
    )
}

export default TabContainer;