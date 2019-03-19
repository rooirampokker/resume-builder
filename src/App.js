import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

import ContentContainer from './containers/ContentContainer';
import Resume from './data/Resume.js';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    camelize(str) {
        return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
            return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
        }).replace(/\s+/g, '');
    }

    render() {
        const tabs = Object.keys(Resume).map((sectionName, key) => {
          let sectionID = this.camelize(sectionName);
          if (key !== 0) {
              return (
                  <Tab
                      title={sectionName}
                      eventKey={sectionID}>
                          <ContentContainer
                              id             ={sectionID}
                              key            ={sectionID}
                              content        ={sectionName}
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
