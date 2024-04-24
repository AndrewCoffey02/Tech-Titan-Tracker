import React, {useState, useEffect } from 'react'
import LineChart from './LineChart'
import axios from 'axios'

export default function Data() {

    const [income, setIncome] = useState([])

    useEffect(() => {
        axios.get('http://localhost:4000/api')
            .then((res) => {
                setIncome(res.data.data.income_statement)
            })
            .catch((error) => { console.error(error) })
    })
    return(
        <div>
            <LineChart data={income}/>
        </div>
    )
}