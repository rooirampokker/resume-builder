import React, {Component} from 'react';
import Utils from '../utils/Utils';
import Formatting from '../utils/Formatting';
import {Row} from 'react-bootstrap';
import './WorkExperience.css';

class WorkExperience extends Component {
    constructor(props) {
        super(props);
        this.details       = props.details;
        this.utils         = new Utils();
        this.formatting    = new Formatting({content: this.details});
        this.componentName = this.utils.camelize(this.constructor.name);
    }
    /*
    *
    */
    filterItems() {
        return (Object.keys(this.details).map((index) => {
                return (
                    <div className = {"employer-container"}
                         key       = {"employer-container"+index}>
                        {this.getItems(this.details[index])}
                    </div>
                );

        }));
    }
    /*
    *
    */
    getItems(employer) {
        return Object.keys(employer).map((index) => {
            if (index === "Projects") {
                return this.setEmploymentProjects(employer, index);
            } else {
                return this.setGenericItems(employer, index);
            }

        });
    }
    /*
    *
    */
    setGenericItems(employer, index) {
        let formattedLabel   = this.formatting.formatLabel(index, 2);
        let formattedContent = this.formatting.formatContent(employer[index], 10);
        return (
            <Row
                id  = {"employer-row-"+index}
                key = {this.componentName+"-content-"+index}>
                {formattedLabel}
                {formattedContent}
            </Row>);
    }
    /*
    *
    */
    setEmploymentProjects(employer, index) {
        let projects    = employer[index];
        let projectAttribute = '';
        return Object.keys(projects).map((project) => {
            projectAttribute = this.setProjectAttribute(projects, project);
            return (
                <div
                    className = "project"
                    key       = {this.componentName+"-project-"+project}>
                    {projectAttribute}
                </div>
            );
        });

    }
/*
* //SETS SINGLE LABEL/VALUE ITEM FOR A SPECIFIC PROJECT
*/
    setProjectAttribute(projects, project) {
        let label       = '';
        let description = '';
        return Object.keys(projects[project]).map((index) => {
            label       = this.formatting.formatLabel(index, 2);
            description = this.formatting.formatContent(projects[project][index], 10);
            return (
                <Row
                    id  = {"employer-project-row-"+project+'-'+index.toLowerCase()}
                    key = {this.componentName+"-content-"+project+index}>
                    {label}
                    {description}
                </Row>
            )
        });
    }

    render() {
        return (
            <div className={this.componentName+" container"}
                 id={this.componentName+"-container"}>
                {this.filterItems()}
            </div>
        );
    }
}

export default WorkExperience;