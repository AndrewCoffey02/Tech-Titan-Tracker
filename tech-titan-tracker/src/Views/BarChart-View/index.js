import { Component } from "react";
import Bars from './Component/BarChart';

export default class BarChart extends Component {
    render() {
        const {data} = this.props

        return (
            <div id='view5' className='pane'>
                <div className='header'>Age</div>
                <div style={{ overflowX: 'scroll',overflowY:'hidden' }}>
                <Bars data={data} width={1000} height={550}/>
                </div>                
            </div>
        )
    }
}

