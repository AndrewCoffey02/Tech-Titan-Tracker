import React, {useRef, useEffect, useState } from 'react'
import {
    select,
    axisBottom,
    axisRight,
    scaleLinear, 
    scaleBand
} from 'd3'

export default function BarChart() {

    const [data, setData ] = useState([20, 25, 45, 50, 60, 20, 75])
    const svgRef = useRef();

    useEffect(() => {
        const svg = select(svgRef.current)
        
        const xScale = scaleBand()
            .domain([1, 2, 3, 4, 5])
            .range(0, 300)

        const yScale = scaleLinear()
            .domain()
            .range()

        const xAxis = axisBottom()

    })
}