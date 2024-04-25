// imports 
import React, { useState, useEffect } from 'react'
import LineChart from './LineChart'
import dataa from './data.json'
import axios from 'axios'

export default function Linechart({ option }) {
    // store data
    const [income, setIncome] = useState([])

    // initialize after each data change
    useEffect(() => {
        axios.get(`http://localhost:4000/api/${option}`) // api return with assigned option code
            .then((res) => {
                setIncome(res.data.data.income_statement)

            }).catch((error) => { console.error(error) }) // catch error
    })

    // return LineChart
    return (
        <React.Fragment>
            <LineChart data={income} />
        </React.Fragment>
    )
}