import React, { Component } from 'react';
import './App.css';
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
        this.state = {

        }
        this.utils = new Utils();
    }

    components = {
        personalDetails: PersonalDetails,
        education: Education,
        skillsMatrix: SkillsMatrix,
        workExperience:WorkExperience
    };



    render() {
        const tabs = Object.keys(Resume).map((sectionName, key) => {
              const sectionID = this.utils.camelize(sectionName);
              let TabContent = '';
              if (key !== 0) {
                  TabContent = this.components[sectionID];
                  return (
                          <Tab
                              title   ={sectionName}
                              eventKey={sectionID}
                              key     ={"tab-"+sectionID}>

                                <TabContent
                                      key = {sectionName}
                                      id  = {sectionID}
                                      details = {JSON.stringify(Resume[sectionName])}/>
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
