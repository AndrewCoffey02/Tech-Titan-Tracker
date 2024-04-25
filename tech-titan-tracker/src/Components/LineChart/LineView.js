import React, { useState, useEffect } from 'react'
import LineChart from './LineChart'
import dataa from './data.json'
import axios from 'axios'

export default function Linechart({ option }) {

    const [income, setIncome] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:4000/api/${option}`)
            .then((res) => {
                setIncome(res.data.data.income_statement)

            }).catch((error) => { console.error(error) })
    })

    return (
        <React.Fragment>
            <LineChart data={income} />
        </React.Fragment>
    )
}