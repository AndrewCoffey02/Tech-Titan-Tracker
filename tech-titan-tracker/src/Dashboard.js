import LineChart from './Components/LineChart/LineChart'
import { Layout } from 'antd'
import { Flex } from 'antd'
// import { BrowserRouter, Routes, Route} from 'react-router-dom' 

const {  Sider, Header, Content } = Layout

const boxStyle = {
    width: '100%',
    height: '30%',
    borderRadius: 2,
    border: '5px solid #54c47a',
    backgroundColor: '#222438',
    overflow: "visible",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  };

export default function Dashboard() {

    return (
        <div>
            <Flex>
            <Layout style={{ height:'900px'}}>
                <Sider width="20%">
                    <Content align="center" style={boxStyle}>
                        <h1>Profile</h1>
                    </Content>
                    <Content align="center" style={boxStyle}>
                        <h1>PieChart</h1>
                    </Content>
                    <Content align="center" style={boxStyle}>
                        <h1>Options</h1>
                    </Content>
                </Sider>
                <Layout>
                    <Content style={ {width: '100%',height: '30%',borderRadius: 2,border: '5px solid #54c47a', backgroundColor: '#222438'}}>
                        <LineChart/>
                    </Content>
                    <Content style={boxStyle}>
                    </Content>
                    <Content style={boxStyle}>
                        <h1>Info</h1>
                    </Content>
                </Layout>
            </Layout>
            </Flex>
        </div>
    )
}
