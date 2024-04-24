import React, {useState, useEffect } from 'react'
import BarChart from './BarChart'
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
            <BarChart data={income}/>
        </div>
    )
}