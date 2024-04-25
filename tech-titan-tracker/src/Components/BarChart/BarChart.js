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
  // set the dimensions and margins of the graph
  const svgRef = useRef()

  useEffect(() => {
    var margin = { top: 20, right: 20, bottom: 30, left: 40 },
        width = 1400 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom

    const minYear = min(data, year => year.year)
    const maxYear = max(data, year => year.year)

    const svg = select(svgRef.current)
    svg.selectAll("*").remove()

    const xScale = scaleBand()
      .domain(data.map(index => index.year).reverse())
      .range([0, width])
      .padding(0.1)

    const yScale = scaleLinear()
      .domain([0, max(data, rev => rev.revenue)])
      .range([height, 0])

    const xAxis = axisBottom(xScale)
    svg
      .append("g")
      .style("transform", `translateY(${height}px)`)
      .call(xAxis)

    const yAxis = axisRight(yScale)
    svg
      .append("g")
      .style("transform", `translateX(${width}px)`)
      .call(yAxis)

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
      .transition()
      .duration(1000)
      .delay((d, i) => i * 100)
      .attr("y", d => yScale(d.revenue))
      .attr("height", d => height - yScale(d.revenue))
      .attr("fill", "#54c47a")
      
      

  })
  return (
    <React.Fragment>
      <svg ref={svgRef}>
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
    </React.Fragment>
  )

}