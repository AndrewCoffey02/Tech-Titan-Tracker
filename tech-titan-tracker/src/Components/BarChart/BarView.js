import { useState, useEffect } from 'react'
import axios from 'axios'
import BarChart from './BarView'

export default function BarView() {

    let response

    axios.get('http://localhost:4000/api')
        .then((res) => {
            response = res.data.data.income_statement
            
        })
        .catch((error) => { console.error(error) })

    return(
        <div>
            <BarChart/>
        </div>
    )
}