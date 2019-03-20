import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Utils from './utils/utils';

import PersonalDetailsContainer from './containers/PersonalDetailsContainer';
import Resume from './data/Resume.js';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const tabs = Object.keys(Resume).map((sectionName, key) => {
          let sectionID = Utils.camelize(sectionName);
          if (key !== 0) {
              return (
                  <Tab
                      title   ={sectionName}
                      eventKey={sectionID}
                      key     ={"tab-"+sectionID}>
                          <PersonalDetailsContainer
                              id             ={sectionID}
                              key            ={"content-"+sectionID}
                              {...Resume[sectionName]}
                          />
                  </Tab>
              )
          } else return false;
        });

        return (
            <>
               <legend>{Resume.heading}</legend>
               <Tabs defaultActiveKey="home" transition={false} id="noanim-tab-example">
                        {tabs}
               </Tabs>
            </>
        );
    }
}

export default App;
