import React, { Component } from 'react';

class FileUploader extends Component {
    constructor(props){
        super(props);
        this.action = props.action;
        this.state = {

        }
    }

    render() {
        return (
            <React.Fragment>
                <input type='file'
                       id='xlsxFileUpload'
                       name='xlsxFileUpload'
                       class='form-control-file'
                       onChange={this.action}
                />
            </React.Fragment>
        );
    }
}

export default FileUploader;