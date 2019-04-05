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
    formatDataBackGround() {
        const backgroundSeries =
            [
/*                { // Track for Test -- note that each percentage value is currently increased by 10% as indication of band-width
                    outerRadius: '105%',
                    innerRadius: '95%',
                    backgroundColor: Highcharts.Color(Highcharts.getOptions().colors[2]).setOpacity(0.2).get(),
                    borderWidth: 0
                },
                { // Track for Move
                outerRadius: '95%',
                innerRadius: '85%',
                backgroundColor: Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0.2).get(),
                borderWidth: 0
                },
                { // Track for Exercise
                outerRadius: '85%',
                innerRadius: '75%',
                backgroundColor: Highcharts.Color(Highcharts.getOptions().colors[1]).setOpacity(0.2).get(),
                borderWidth: 0
                },
                { // Track for Stand
                outerRadius: '75%',
                innerRadius: '65%',
                backgroundColor: Highcharts.Color(Highcharts.getOptions().colors[2]).setOpacity(0.2).get(),
                borderWidth: 0
            }*/
         ];
        return backgroundSeries;
    }
/*
*
 */
    options() {
        return {
            chart: {
                type: 'solidgauge',
                marginTop: 50,
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
                style: {
                    fontSize: '16px'
                },
                pointFormat: '{series.name}<br><span style="font-size:2em; color: {point.color}; font-weight: bold">{point.y}%</span>',
                positioner: function (labelWidth, labelHeight) {
                    return {
                        x: 245 - labelWidth / 2,
                        y: 180
                    };
                }
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
                background: this.formatDataBackGround()
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