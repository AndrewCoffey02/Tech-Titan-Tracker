import { useState, useEffect } from 'react'
import axios from 'axios'
import Bars from './Bars.js'

export default function BarView() {
    

        const [data, setData] = useState([])

        useEffect(() => { 

            axios.get('http://localhost:4000/api')
            .then((res) => {
                setData(res.json.data)
            })
            .catch((error) => {console.error(error)})

        })
        

        return (
            <div id='view5' className='pane'>
                <div className='header'>BarChart</div>
            <Bars data={data}></Bars>
            </div>
        )
}