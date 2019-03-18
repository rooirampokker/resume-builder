import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import FormContainer from './containers/FormContainer';

class App extends Component {
    render() {
        return (
            <div className='grid-container'>
            <div className='grid-x grid-padding-x card'>
            <fieldset className='fieldset'>
            <legend>Select Excel file for processing</legend>
                                          <FormContainer />
                                          </fieldset>
                                          </div>
                                          </div>
        );
    }
}

export default App;
