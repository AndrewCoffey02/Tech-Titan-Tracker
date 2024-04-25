import React, { useRef, useEffect, useState } from "react"
import './LineChart.css'
import {
  select,
  line,
  curveCardinal,
  axisBottom,
  axisRight,
  scaleLinear,
  scaleTime,
  min,
  max
} from "d3"

export default function LineChart({data}) {
  const svgRef = useRef()

  // will be called initially and on every data change
  useEffect(() => {
    // set the dimensions and margins of the graph
    var margin = { top: 20, right: 30, bottom: 30, left: 60 },
      width = 1400 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom
    
    // create svg element
    const svg = select(svgRef.current)
    //reset line
    svg.selectAll("path").remove()

    // assign min amd max number of year
    const minYear = min(data, year => year.year)
    const maxYear = max(data, year => year.year)
    
    // declare x-axis as linear scale
    const xScale = scaleLinear()
      .domain([minYear, maxYear])
      .range([ 100 , width])

    // declare y-axis as linear scale
    const yScale = scaleLinear()
      .domain([0, max(data, rev => rev.revenue)])
      .range([height, 10])
    
      // create x-axis
    const xAxis = axisBottom(xScale)
      .ticks(data.length)
      .tickFormat(index => index) // format each year
    svg.select(".x-axis")
      .style("transform", "translateY("+ height +"px)")
      .call(xAxis)

      // create y-axis 
    const yAxis = axisRight(yScale).tickFormat(index => index / 1000000000 + "b")
    svg.select(".y-axis")
      .style("transform", "translateX(" + width + "px)")
      .call(yAxis)

    // generates the "d" attribute of a path element
    const myLine = line()
      .x(d => xScale(d.year))
      .y(d => yScale(d.revenue))
      .curve(curveCardinal)

    // renders path element, and attaches
    // the "d" attribute from line generator above
    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#54c47a")
      .attr("stroke-width", 3)
      .attr("d", myLine)
      

  }, [data])

  // return svg elements
  return (
    <React.Fragment>
      <div>
        <svg ref={svgRef}>
          <g className="x-axis" />
          <g className="y-axis" />
        </svg>
      </div>
    </React.Fragment>
  )
}
