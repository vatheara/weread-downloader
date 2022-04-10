import React from 'react';
import { Tabs , Row, Col } from  'antd';
const { TabPane } = Tabs;

function callback(key){
    console.log('test',key);
}

const fetchcategory = async () => {
    let data = await window.electronAPI.getCate();
    console.log(data)
}

const Topbar = () => {
    fetchcategory();
    return (
        <div className='topbar'>
        <Tabs defaultActiveKey='1' onChange={callback} tabBarStyle={{margin:0}}>
            <TabPane tab={<div className='tab'>អភិវឌ្ឍខ្លួន</div>} key="1">
                <Row gutter={[16,16]}>
                <Col span={4} >test</Col>
                <Col span={4} >test</Col>
                <Col span={4} >test</Col>
                <Col span={4} >test</Col>
                <Col span={4} >test</Col>
                <Col span={4} >test</Col>
                </Row>
            </TabPane>
            <TabPane tab={<div className='tab'>អាជីវកម្ម</div>} key="2">
                <h1>this tab 2</h1>
            </TabPane>
            <TabPane tab={<div className='tab'>សហគ្រិនភាព</div>} key="3">
                <h1>this tab 3</h1>
            </TabPane>
            <TabPane tab={<div className='tab'>ភាពជាអ្នកដឹកនាំ</div>} key="4">
                <h1>this tab 3</h1>
            </TabPane>
            <TabPane tab={<div className='tab'>ហិរញ្ញវត្ថុ</div>} key="5">
                <h1>this tab 3</h1>
            </TabPane>
            <TabPane tab={<div className='tab'>ហិរញ្ញវត្ថុ</div>} key="6">
                <h1>this tab 3</h1>
            </TabPane>
        </Tabs>
        </div>
    )
}


export default Topbar;
