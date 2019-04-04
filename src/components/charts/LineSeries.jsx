import React, { Component } from 'react';
import Highcharts from "highcharts";
import HighchartsReact from 'highcharts-react-official'

class LineSeries extends Component {
    constructor(props) {
        super(props);
        this.text    = props.text;
        this.data    = props.data;
        this.options = {
            title: {
                text: props.text
            },
            series: [{
                data: props.data
            }]
        }
    }
    render() {
        return (
            <div className="row">
                <div className="col-md-4 col-md-offset-3">
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={this.options}
                    />
                </div>
            </div>
        )}
}

export default LineSeries;