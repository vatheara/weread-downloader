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
        <Tabs defaultActiveKey='1' onChange={callback}>
            <TabPane tab={<div className='tab'>អភិវឌ្ឍខ្លួន</div>} key="1">
                <Row gutter={[16,16]}>
                    <Col className='book-card' span={3} >
                        <img src='https://image.weread.asia/Upload/20220214/ea56p0778p4ef0p82f4p8ec7167af1e4.jpg'></img>
                    </Col>
                    <Col className='book-card' span={3} >
                        <img src='https://image.weread.asia/Upload/20220214/ea56p0778p4ef0p82f4p8ec7167af1e4.jpg'></img>
                        <div className='book-title'>Test</div>
                        <div>2022</div>
                    </Col>
                    <Col className='book-card' span={3} >
                        <img src='https://image.weread.asia/Upload/20220214/ea56p0778p4ef0p82f4p8ec7167af1e4.jpg'></img>
                    </Col>
                    <Col className='book-card' span={3} >
                        <img src='https://image.weread.asia/Upload/20220214/ea56p0778p4ef0p82f4p8ec7167af1e4.jpg'></img>
                    </Col>
                    <Col className='book-card' span={3} >
                        <img src='https://image.weread.asia/Upload/20220214/ea56p0778p4ef0p82f4p8ec7167af1e4.jpg'></img>
                    </Col>
                    <Col className='book-card' span={3} >
                        <img src='https://image.weread.asia/Upload/20220214/ea56p0778p4ef0p82f4p8ec7167af1e4.jpg'></img>
                    </Col>
                    <Col className='book-card' span={3} >
                        <img src='https://image.weread.asia/Upload/20220214/ea56p0778p4ef0p82f4p8ec7167af1e4.jpg'></img>
                    </Col>
                    <Col className='book-card' span={3} >
                        <img src='https://image.weread.asia/Upload/20220214/ea56p0778p4ef0p82f4p8ec7167af1e4.jpg'></img>
                    </Col>
                    <Col className='book-card' span={3} >
                        <img src='https://image.weread.asia/Upload/20220214/ea56p0778p4ef0p82f4p8ec7167af1e4.jpg'></img>
                    </Col>
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
