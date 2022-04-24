import React , {useState, useEffect} from 'react';
import { Tabs , Row, Col } from  'antd';
import ReactJkMusicPlayer from 'react-jinke-music-player'
import 'react-jinke-music-player/assets/index.css'

const { TabPane } = Tabs;

function callback(key){
    console.log('test',key);
}

const fetchbooks = async (param) => {
    
    let data = await window.electronAPI.getBook(param);
    let books = data.data.map((d)=>{
        return (        
          <>
            <Col className='book-card' span={3} >
                <img src='https://image.weread.asia/Upload/20220214/ea56p0778p4ef0p82f4p8ec7167af1e4.jpg'></img>
                <div className='book-title'>Test</div>
                <div>2022</div>
            </Col>
         </>)
    }) 
    return books;
    
} 

const fetchcategory = async () => {
    let data = await window.electronAPI.getCate();
    console.log(data)
    return data;
}

const Topbar = () => {
    //audio player
    let options = {
        autoPlay:false,
        showDownload: false,
        showThemeSwitch: false,
        showLyric:false,
        showPlayMode:false,
        mode:'full',
      }
    


    const [audioList , setAudiolist] = useState([]);

    // let books = fetchbooks({subjectID:5});
    const [books, setBooks] = useState([]);
    useEffect( () => {
        async function fetchData() {
            let res = await window.electronAPI.getBook({subjectID:5,pageSize:20});
            console.log('data:',res);
            setBooks(res.data);
            setAudiolist(res.data.map((b)=>{return {
                name:b.title,
                cover:'https://image.weread.asia'+b.cover,
                musicSrc: 'https://weread-oss.weread.asia/'+b.audioUrl,
                singer:'Audio Book'
            }}))
          }
         fetchData();
         
        },[])
        console.log('list',audioList);
    return (
        <div className='topbar'>
        <Tabs defaultActiveKey='1' onChange={callback}>
            <TabPane tab={<div className='tab'>អភិវឌ្ឍខ្លួន</div>} key="1">
                <Row gutter={[16,16]}>
                    {books.map((book, id) => (
                        <Col className='book-card' key={id} span={3} onClick={ (key) => {console.log('clicked',key)}}>
                            <img src={'https://image.weread.asia'+book.cover}></img>
                            <div className='book-title'>{book.title}</div>
                        </Col>
                    ))}
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
            <TabPane tab={<div className='tab'>ចិត្តវិទ្យា</div>} key="6">
                <h1>this tab 3</h1>
            </TabPane>
            <TabPane tab={<div className='tab'>ទីផ្សារ</div>} key="7">
                <h1>this tab 3</h1>
            </TabPane>
            <TabPane tab={<div className='tab'>គ្រប់គ្រង</div>} key="8">
                <h1>this tab 3</h1>
            </TabPane>
            <TabPane tab={<div className='tab'>ការងារ</div>} key="9">
                <h1>this tab 3</h1>
            </TabPane>
            <TabPane tab={<div className='tab'>បច្ចេកវិទ្យា</div>} key="10">
                <h1>this tab 3</h1>
            </TabPane>
        </Tabs>
        <ReactJkMusicPlayer audioLists={audioList} {...options}/>
        </div>
    )
}


export default Topbar;
