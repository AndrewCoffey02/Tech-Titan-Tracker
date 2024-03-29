import { useState } from "react";
import drawBarChart from './Bars.js'
import axios from 'axios'

export default function BarView() {
    

        const [data, setData] = useState([])
        
        axios.get('/api')
        .then((res) => {
            setData(res.data)
        })
        .catch((err) => {console.error(err)})

        return (
            <div id='view5' className='pane'>
                <div className='header'>Age</div>
                <div style={{ overflowX: 'scroll',overflowY:'hidden' }}>
                <drawBarChart data={data} width={1000} height={550}/>
                </div>                
            </div>
        )
}