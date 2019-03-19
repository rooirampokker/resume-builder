import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import TabContainer from './containers/TabContainer';
import Resume from './data/Resume.js';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        const Tabs = Object.keys(Resume).map((d, key) => {
          if (key != 0) {
              return (
                  <TabContainer
                      active=""
                      tabId={d}
                      tabLable={d}
                      key={d}
                  />
              )
          }
        });

        return (
            <React.Fragment>
               <legend>{Resume.heading}</legend>
               <ul className="nav nav-tabs" id="myTab" role="tablist">
                    {Tabs}
               </ul>
            </React.Fragment>
        );
    }
}

export default App;
