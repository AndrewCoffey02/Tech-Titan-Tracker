import { Component } from "react";
import BarChart from './Components/BarChart';

export default class View extends Component {
    render() {
        const {data} = this.props

        return (
            <div>
                <BarChart data={data} width={1000} height={550}/>
            </div>
        )
    }
}

