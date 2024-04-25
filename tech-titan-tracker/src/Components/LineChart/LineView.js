import React, { useState, useEffect } from 'react'
import LineChart from './LineChart'
import data from './data.json'
import axios from 'axios'

export default function Data() {

    const [income, setIncome] = useState([])
    const [selected, setSelected] = useState('')

    useEffect(() => {
             axios.get(`http://localhost:4000/api/${selected}`)
                .then((res) => {
                    setIncome(res.data.data.income_statement)
                    console.log(income)
                })
                .catch((error) => { console.error(error) })

    })

    const handleChange = (event) => {
        setSelected(event.target.value)
    }
    return (
        <React.Fragment>
                <select value={selected} onChange={handleChange}>
                    <option >Select Company</option>
                    <option value="AMZN">Amazon</option>
                    <option value="MSFT">Microsoft</option>
                    <option value="META">Meta</option>
                    <option value="GOOGL">Google</option>
                    <option value="AAPL">Apple</option>
                </select>
            <LineChart data={income}/>
        </React.Fragment>
    )
}