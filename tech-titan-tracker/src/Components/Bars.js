import React, { Component } from 'react';
import * as d3 from 'd3';

class Bars extends Component {
    
    componentDidMount() {
        const data = d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/1_OneNum.csv");
        this.drawBarChart(data)
    }
    drawBarChart(data) {

        const svg = d3.select("#chart")
            .append("svg")
            .attr("width", 600)
            .attr("height", 400)
            .style("border", "1px solid black")
    }
    render() { return <div id="chart"></div> }
}
export default Bars