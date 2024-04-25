import React, { useEffect, useState } from 'react'
import axios from 'axios'

//import components
import LineChart from './Components/LineChart/LineView'
import BarChart from './Components/BarChart/BarView'
import DropDown from './Components/Options/options'
import { Layout } from 'antd'
import { Flex } from 'antd'

// call Layout components
const {  Sider, Header, Content } = Layout

// assign css format of boxes
const boxStyle = {
    width: '100%',
    height: '30%',
    borderRadius: 2,
    border: '5px solid #54c47a',
    backgroundColor: 'grey',
    overflow: "visible",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  };

export default function Dashboard() {
    //store dropdown choices 
    const [selected, setSelected] = useState('')

    //handle dropdown data change
    const handleSelectChange = async (event) => {
        await setSelected(event)
    }

    //return format
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
                            <DropDown selected={selected} onSelectChange={handleSelectChange}/>
                        </Content>
                    </Sider>
                    <Layout>
                        <Content style={ {width: '100%',height: '30%',borderRadius: 2,border: '5px solid #54c47a', backgroundColor: 'grey'}}>
                            <LineChart option={selected}/>
                        </Content>
                        <Content style={ {width: '100%',height: '30%',borderRadius: 2,border: '5px solid #54c47a', backgroundColor: 'grey'}}>
                            <BarChart option={selected}/>
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
