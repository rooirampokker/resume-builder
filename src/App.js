import React, { Component } from 'react';
//import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Utils from './utils/Utils';
import Content from './containers/Content';
import PersonalDetails from './containers/PersonalDetails';
import Education from './containers/Education';
import SkillsMatrix from './containers/SkillsMatrix';
import WorkExperience from './containers/WorkExperience';

import Resume from './data/Resume.js';

class App extends Component {
    constructor(props) {
        super(props);
        document.title = Resume.heading;
        this.state = {

        }
        this.utils = new Utils();
    }

    components = {
        personalDetails: PersonalDetails,
        education:       Education,
        skillsMatrix:    SkillsMatrix,
        workExperience:  WorkExperience,
        content:         Content
    };



    render() {
        const tabs = Object.keys(Resume).map((sectionName, key) => {
              const sectionID = this.utils.camelize(sectionName);
              let TabContent = '';
              if (key !== 0) {
                  //Output to default 'Content' component if there's no explicit component already created - allows for easy addition of new sections to a default component
                  TabContent = (this.components[sectionID] !== undefined) ? this.components[sectionID] : this.components.content;
                  return (
                          <Tab
                              title   ={sectionName}
                              eventKey={sectionID}
                              key     ={"tab-"+sectionID}>
                                <TabContent
                                      id  = {sectionID}
                                      details = {Resume[sectionName]}
                                />
                          </Tab>

                  )
              } else return false;
        });

        return (
            <div className={"container"}>
               <legend>{Resume.heading}</legend>
               <Tabs defaultActiveKey="home" transition={false} id="tab">
                        {tabs}
               </Tabs>
            </div>
        );
    }
}

export default App;
