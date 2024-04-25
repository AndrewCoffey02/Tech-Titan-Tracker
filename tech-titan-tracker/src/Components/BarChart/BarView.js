//imports
import React, {useState, useEffect } from 'react'
import BarChart from './BarChart'
import data from './data.json'
import axios from 'axios'

export default function Data({option}) {

    // store data
    const [income, setIncome] = useState([])

    // called on every data change
    useEffect(() => {
        axios.get(`http://localhost:4000/api/${option}`) //call local url with given assigned code
            .then((res) => {
                setIncome(res.data.data.income_statement) //assign data
            })
            .catch((error) => { console.error(error) })
    })
    //return Barchart with data
    return(
        <div>
            <BarChart data={income}/>
        </div>
    )
}