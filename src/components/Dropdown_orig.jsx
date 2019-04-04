import React, { Component } from 'react';
class dropDown extends Component {
    constructor(props) {
        super(props);
        this.action = props.action;
    }
}

const Dropdown = (props) => {
    return (
        <React.Fragment>
            <select name={props.name} id={props.name} onChange={props.action}>
                {(props.options || []).map((optionVal, i) => {
                    return <option key={i} value={optionVal}>{optionVal}</option>
                })}
            </select>
        </React.Fragment>
    );
}

export default Dropdown;