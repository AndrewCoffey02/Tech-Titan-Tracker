import BarChart from './Components/BarChart/BarView'
import { Layout } from 'antd'
// import { BrowserRouter, Routes, Route} from 'react-router-dom' 

const { Sider, Header, Content } = Layout

export default function Dashboard() {

    return (
        <div>
            <Layout style={{ height: 920 }}>
                <Sider width={300} style={{ backgroundColor: 'steel-blue' }}>
                    <Content style={{ height: 200 }}><h1 align="center">Profile</h1></Content>
                    <Content style={{ height: 300 }}><h1 align="center">PieChart</h1></Content>
                    <Content style={{ height: 400 }}><h1 align="center">Options</h1></Content>
                </Sider>
                <Layout>
                    <Content style={{ height: 100 }}><h1 align="center">LineChart</h1></Content>
                    <Content style={{ height: 200 }}><h1 align="center">BarChart</h1></Content>
                    <Content style={{ height: 200 }}><h1 align="center">Info</h1></Content>
                </Layout>
            </Layout>
        </div>
    )
}
