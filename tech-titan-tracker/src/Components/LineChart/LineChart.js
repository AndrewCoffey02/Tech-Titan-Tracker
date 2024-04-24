import React, { useRef, useEffect, useState } from "react"
import './LineChart.css'
import {
  select,
  line,
  curveCardinal,
  axisBottom,
  axisRight,
  scaleLinear
} from "d3"

function App() {
  const [data, setData] = useState([25, 30, 45, 60, 20, 65, 75])
  const svgRef = useRef()

  // will be called initially and on every data change
  useEffect(() => {
    // set the dimensions and margins of the graph
    var margin = { top: 10, right: 30, bottom: 30, left: 60 },
      width = 1000 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom

    const svg = select(svgRef.current)
    
    const xScale = scaleLinear()
      .domain([0, data.length - 1])
      .range([ 0 , width - 10])

    const yScale = scaleLinear()
      .domain([0, 150])
      .range([height - 10, 0])

    const xAxis = axisBottom(xScale)
      .ticks(data.length)
      .tickFormat(index => index + 1)

    svg.select(".x-axis")
      .style("transform", "translateY("+ height +"px)")
      .call(xAxis)

    const yAxis = axisRight(yScale)

    svg.select(".y-axis")
      .style("transform", "translateX(" + width + "px)")
      .call(yAxis)

    // generates the "d" attribute of a path element
    const myLine = line()
      .x((value, index) => xScale(index))
      .y(yScale)
      .curve(curveCardinal)

    // renders path element, and attaches
    // the "d" attribute from line generator above
    svg.selectAll(".line")
      .data([data])
      .join("path")
      .attr("class", "line")
      .attr("d", myLine)
      .attr("fill", "none")
      .attr("stroke", "#54c47a")

     
  }, [data])

  window.addEventListener('resize', svgRef)

  return (
    <React.Fragment>
      <svg ref={svgRef}>
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
    </React.Fragment>
  );
}

export default App