import React from "react";
import {Tabs ,Row, Col} from 'antd';



const Books = (param) => {


    return(
        <>
            <Col className='book-card' span={3} >
                <img src='https://image.weread.asia/Upload/20220214/ea56p0778p4ef0p82f4p8ec7167af1e4.jpg'></img>
                <div className='book-title'>Test</div>
                <div>2022</div>
            </Col>
        </>
    )
}


export default Books;