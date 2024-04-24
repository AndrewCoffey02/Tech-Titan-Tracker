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
  const svgRef = useRef()

  const minYear = min(data, year => year.year)
  const maxYear = max(data, year => year.year)

  useEffect(() => {

    const svg = select(svgRef.current)

    const xScale = scaleBand()
      .domain(data.map( (value, index) => index))
      .range([100, 1400])
      .padding(0.5)

    const yScale = scaleLinear()
      .domain([0, max(data, rev => rev.revenue)])
      .range([200, 10]) 

    const xAxis = axisBottom(xScale).ticks(data.length)

    svg
      .select(".x-axis")
      .style("transform", "translateY(200px)")
      .call(xAxis)

    const yAxis = axisRight(yScale)
    svg
      .select(".y-axis")
      .style("transform", "translateX(1400px)")
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