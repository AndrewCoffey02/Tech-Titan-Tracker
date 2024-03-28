import Component from 'react';
import drawBarChart from './Bars.js'

export default class BarChart extends Component {

    componentDidMount() {
        drawBarChart(this.props)
    }

    componentDidUpdate() {
        drawBarChart(this.props)
    }

    render() {return(
        <div id="histogram"></div>
        )}
}
