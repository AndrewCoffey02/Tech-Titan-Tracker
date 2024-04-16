import { useState, useEffect } from 'react'
import axios from 'axios'
import Bars from './Bars'

export default function BarView() {

    const [data, getData] = useState([]) 

    const getIncome = () => {
    

        axios.get('http://localhost:4000/api')
            .then((res) => {
                getData(res.data.data.income_statement)
                console.log(data)
            })
            .catch((error) => { console.error(error) })

    }

    return (
        <div>
            <button onClick={getIncome}>income</button>
            
        </div>
    )
}