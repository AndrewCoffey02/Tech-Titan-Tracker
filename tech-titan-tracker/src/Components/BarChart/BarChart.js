import React, { useRef, useEffect, useState } from "react"
import "./BarChart.css"
import {
  select,
  axisBottom,
  axisRight,
  scaleLinear,
  scaleBand,
  min,
  max
} from "d3"

export default function BarChart({ data }) {
  //create svg element
  const svgRef = useRef()

  useEffect(() => {
    // set the dimensions and margins of the graph
    var margin = { top: 20, right: 20, bottom: 30, left: 40 },
        width = 1400 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom

    // set the minimum and maximum number of the year parameter used
    const minYear = min(data, year => year.year)
    const maxYear = max(data, year => year.year)

    const svg = select(svgRef.current)
    svg.selectAll("*").remove()

    // declare x-axis as a band scale and assign measurements
    const xScale = scaleBand()
      .domain(data.map(index => index.year).reverse())
      .range([0, width])
      .padding(0.1)

    // declare y-axis as a linear scale and assign measurements
    const yScale = scaleLinear()
      .domain([0, max(data, rev => rev.revenue)])
      .range([height, 0])

    // create x-axis and set to dimensions
    const xAxis = axisBottom(xScale)
    svg
      .append("g")
      .style("transform", `translateY(${height}px)`)
      .call(xAxis)

    // create y-axis and set to dimensions
    const yAxis = axisRight(yScale).tickFormat(index => index / 1000000000 + "b")
    svg
      .append("g")
      .style("transform", `translateX(${width}px)`)
      .call(yAxis)
    // generate Bars and assign data measurements
    svg
      .append("g")
      .selectAll(".bar")
      .data(data)
      .enter().append("rect")
      .attr("class", "bar")
      
      .attr("x", d => xScale(d.year))
      .attr("width", d => xScale.bandwidth())
      .attr("y", height)
      .attr("height", 0)
      .transition() // transition 
      .duration(1000) // duration of transition
      .delay((d, i) => i * 100) // transition each bar at a time
      .attr("y", d => yScale(d.revenue)) 
      .attr("height", d => height - yScale(d.revenue))
      .attr("fill", "#54c47a")
      
      

  })
  // return svg element
  return (
    <React.Fragment>
      <svg ref={svgRef}>
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
    </React.Fragment>
  )

}