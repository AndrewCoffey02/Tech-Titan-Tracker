import React, { useRef, useEffect, useState } from "react"
import "./BarChart.css"
import { select,
        axisBottom,
        axisRight, 
        scaleLinear, 
        scaleBand,
        min,
        max
} from "d3"

export default  function BarChart({data}) {
  // set the dimensions and margins of the graph
  var margin = { top: 10, right: 30, bottom: 30, left: 60 },
  width = 1400 - margin.left - margin.right,
  height = 300 - margin.top - margin.bottom

  const svgRef = useRef()

  const minYear = min(data, year => year.year)
  const maxYear = max(data, year => year.year)

  useEffect(() => {

    const svg = select(svgRef.current)

    const xScale = scaleBand()
      .domain(data.map( (value, index) => index))
      .range([100, width])
      .padding(0.5)

    const yScale = scaleLinear()
      .domain([0, max(data, rev => rev.revenue)])
      .range([height, 10])

    const xAxis = axisBottom(xScale).ticks(data.length)

    svg
      .select(".x-axis")
      .style("transform", "translateY("+height+"px)")
      .call(xAxis)

    const yAxis = axisRight(yScale)
    svg
      .select(".y-axis")
      .style("transform", "translateX(" + width + "px)")
      .call(yAxis)

    svg
      .selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("class", "bar")
      
      .style("transfrom", "scale(1, -1)")
      .attr("x", index => xScale(index))
      .attr("y", rev => yScale(rev.revenue.length))
      .attr( "width", xScale.bandwidth())
      .attr("height", d => yScale(d.value))
      .attr("fill", "#54c47a")
  })


  return (
    <React.Fragment>
      <svg ref={svgRef}>
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
    </React.Fragment>
  );

  
}