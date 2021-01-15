import React, { Component } from 'react';
import HighchartsMore from 'highcharts/highcharts-more';
import SolidGauge from 'highcharts/modules/solid-gauge';
import HighchartsReact from 'highcharts-react-official';
import $ from "jquery";

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
        this.highcharts = Highcharts;
        this.afterChartCreated = this.afterChartCreated.bind(this);
        this.chartMouseOutCallback = this.chartMouseOutCallback();
    }
/*

 */
    afterChartCreated(chart) {
        var legendId = "customLegend_"+chart.index;
        var legend = $('#'+legendId);
        $.each(chart.series, function (j, data) {
            var legendColor = data.userOptions.borderColor;
            let legendClass = "chart_"+chart.index+"_item_"+data.index;
            legend.append('<div id="'+legendClass+'" class="item">' +
                          '<div class="symbol" style="background-color:'+legendColor+'"></div>' +
                          '<div class="legend-title" id="">' + data.name + '</div>' +
                          '</div>');

        });

        $('#'+legendId+' .item').click(function() {
            var itemIndex = $(this).index();

            $.each(chart.series, function (key, value) {
                chart.series[key].setVisible(false);
            });
            chart.series[itemIndex].setVisible(true);
        });
    }

    /**
     *
      */
    chartMouseOutCallback() {
        Highcharts.Chart.prototype.callbacks.push(function(chart) {
            Highcharts.addEvent(chart.container, 'mouseleave', function() {
                let legendContainer = $("#customLegend_"+chart.index);
                legendContainer.children().each(function(index) {
                    let activeLegend = $("#chart_"+chart.index+"_item_"+index);
                    $(activeLegend).css({ 'opacity' : 1});
                });
            });
        });
    }


/*
*
 */
    options(chartRef) {
        return {
            chart: {
                type: 'solidgauge',
                marginTop: 35,
            },
            legend: {
                enabled: false,
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
                    stickyTracking: false,
                    showInLegend: true
                },
                series: {
                    point: {
                        events: {
                            mouseOver: function(e) {
                                let thisSeries      = this.series;
                                let chartDOM        = $(thisSeries.chart);
                                let chartIndex      = $(chartDOM)[0].index;
                                let legendContainer = $("#customLegend_"+chartIndex);

                                legendContainer.children().each(function(index) {
                                    let activeLegend = $("#chart_"+chartIndex+"_item_"+thisSeries.index);
                                    if (index == thisSeries.index) {
                                        $(activeLegend).css({ 'opacity' : 1});
                                    } else {
                                        let inactiveLegend = $("#chart_"+chartIndex+"_item_"+index);
                                        $(inactiveLegend).css({ 'opacity' : 0.3});
                                    }
                                });

                                if( $('.highcharts-legend text').length )
                                    $('.highcharts-legend text:nth-child('+(this.x+2)+')').trigger('mouseover');
                                else
                                    $('.highcharts-legend span:eq('+(this.x)+')').trigger('mouseover');
                            },
                            mouseOut: function() {
                                let chartDOM = $(this.series.chart);
                                let chartIndex = $(chartDOM)[0].index;
                                let legend = $("#chart_"+chartIndex+"_item_"+this.series.index);
                            }
                        }
                    }
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
            .translate(190, 96)
            .add(this.series[2].group);
    };
    render () {
        return (
            <HighchartsReact
                highcharts = {Highcharts}
                options    = {this.options(Highcharts)}
                callback   = {this.afterChartCreated}
                chartRef   = {this.chartRef}

            >
            </HighchartsReact>

        )}
}

export default Gauge;