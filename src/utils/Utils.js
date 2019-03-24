import React, { Component } from 'react';

class Utils extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    camelize(str) {
        return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
            return index === 0 ? letter.toLowerCase() : letter.toUpperCase();
        }).replace(/\s+/g, '');
    }

    capitalize(str) {
        if (typeof str !== 'string')
            return str;
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

}
export default Utils;