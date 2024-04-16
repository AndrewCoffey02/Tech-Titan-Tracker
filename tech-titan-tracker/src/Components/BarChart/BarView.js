import { useState, useEffect } from 'react'
import axios from 'axios'
import Bars from './Bars'

export default function BarView() {

    const getIncome = () => {

        axios.get('http://localhost:4000/api')
            .then((res) => {
                console.log(res.data.data.income_statement)
            })
            .catch((error) => { console.error(error) })

    }

    return (
        <div>
            <button onClick={getIncome}>income</button>
        </div>
    )
}