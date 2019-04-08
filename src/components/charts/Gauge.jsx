import React, { Component } from 'react';
import HighchartsMore from 'highcharts/highcharts-more';
import SolidGauge from 'highcharts/modules/solid-gauge';
import HighchartsReact from 'highcharts-react-official'

var Highcharts = require('highcharts');

class Gauge extends Component {
    constructor (props) {
        super(props);
        HighchartsMore(Highcharts);
        SolidGauge(Highcharts);
        this.name       = props.name;
        this.data       = props.data;
        this.dataBG     = props.dataBG;
        this.trackWidth = props.trackWidth;
    }
/*
*
 */
    options() {
        return {
            chart: {
                type: 'solidgauge',
                marginTop: 35,
            },

            title: {
                text: this.name,
                style: {
                    fontSize: '20px'
                }
            },

            tooltip: {
                borderWidth: 0,
                backgroundColor: 'none',
                shadow: false,
                outside: false,
                useHTML: true,
                pointFormat:
                                 '<div class="gaugeTooltipLabel">{series.name}</div>' +
                                 '<div class="gaugeTooltipValue" style="color: {point.color};">{point.y}%</div>',
                positioner: function (labelWidth, labelHeight) {
                    return {
                        x: 100,
                        y: (labelHeight/2)-15
                    };
                },
            },

            yAxis: {
                min: 0,
                max: 100,
                lineWidth: 0,
                tickPositions: []
            },

            plotOptions: {
                solidgauge: {
                    borderWidth: this.trackWidth,
                    dataLabels: {
                        enabled: false
                    },
                    linecap: 'round',
                    stickyTracking: false
                }
            },

            pane: {
                startAngle: 0,
                endAngle: 360,
                background: this.dataBG
            },
            series: this.data.trackData,
            credits: {
                enabled: false
            },

        };
    }
/*
* Wouldn't it be cool if I can incorporate the tech-logo here...?
 */
    callback() {
        // Move icon
        this.renderer.path(['M', -8, 0, 'L', 8, 0, 'M', 0, -8, 'L', 8, 0, 0, 8])
            .attr({
                'stroke': '#303030',
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': 2,
                'zIndex': 10
            })
            .translate(190, 26)
            .add(this.series[2].group);

        // Exercise icon
        this.renderer.path(['M', -8, 0, 'L', 8, 0, 'M', 0, -8, 'L', 8, 0, 0, 8, 'M', 8, -8, 'L', 16, 0, 8, 8])
            .attr({
                'stroke': '#303030',
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': 2,
                'zIndex': 10
            })
            .translate(190, 61)
            .add(this.series[2].group);

        // Stand icon
        this.renderer.path(['M', 0, 8, 'L', 0, -8, 'M', -8, 0, 'L', 0, -8, 8, 0])
            .attr({
                'stroke': '#303030',
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': 2,
                'zIndex': 10
            })
            .translate(190, 96)
            .add(this.series[2].group);
    };
    render () {
        return (
            <HighchartsReact
                highcharts={Highcharts}
                options={
                this.options()}>
            </HighchartsReact>
        )}
}

export default Gauge;