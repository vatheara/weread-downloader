import React , {useState, useEffect, useCallback} from 'react';
import { Tabs , Row, Col } from  'antd';
import ReactJkMusicPlayer from 'react-jinke-music-player'
import 'react-jinke-music-player/assets/index.css'

const { TabPane } = Tabs;


const fetchcategory = async () => {
    let data = await window.electronAPI.getCate();
    console.log(data)
    return data;
}

const Topbar = () => {
    //audio player
    
    
    // let books = fetchbooks({subjectID:5});
    const [books, setBooks] = useState([]);
    const [audioList , setAudiolist] = useState([{}]);
    let options = {
        autoPlayInitLoadPlayList:false,
        autoPlay:false,
        quietUpdate: false,
        showDownload: false,
        showThemeSwitch: false,
        showLyric:false,
        showPlayMode:false,
        clearPriorAudioLists:true,
        mode:'full',
        audioLists:audioList
      }
    

    useEffect( () => {
        async function fetchData() {
            let res = await window.electronAPI.getBook({subjectID:5,pageSize:60});
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
         
        },[]);
        // console.log('list',audioList);

        const fetchData = useCallback( async function(param) {
            let res = await window.electronAPI.getBook({subjectID:param.subjectID,pageSize:param.pageSize});
            console.log('data:',param);
            setBooks(res.data);
            setAudiolist(res.data.map((b)=>{return {
                name:b.title,
                cover:'https://image.weread.asia'+b.cover,
                musicSrc: 'https://weread-oss.weread.asia/'+b.audioUrl,
                singer:'Audio Book'
            }}))
          }
        ,[]);
        // fetchData({subjectID:5,pageSize:60});
        const  [audioInstance, setAudioInstance ] = useState(null);
        function callback(key){
            fetchData({subjectID:key,pageSize:60});
        }

    return (
        <div className='topbar'>
        <Tabs defaultActiveKey='5' onChange={callback}>
            <TabPane tab={<div className='tab'>អភិវឌ្ឍខ្លួន</div>} key="5">
                <Row gutter={[16,16]}>
                    {books.map((book, id) => (
                        <Col className='book-card' key={id} span={3} >
                            <img src={'https://image.weread.asia'+book.cover} onClick={ () => {audioInstance.playByIndex(id)}}></img>
                            <div className='book-title'>{book.title}</div>
                        </Col>
                    ))}
                </Row>
            </TabPane>
            <TabPane tab={<div className='tab'>អាជីវកម្ម</div>} key="1">
                <Row gutter={[16,16]}>
                    {books.map((book, id) => (
                        <Col className='book-card' key={id} span={3} >
                            <img src={'https://image.weread.asia'+book.cover} onClick={ () => {audioInstance.playByIndex(id)}}></img>
                            <div className='book-title'>{book.title}</div>
                        </Col>
                    ))}
                </Row>
            </TabPane>
            {/* <TabPane tab={<div className='tab'>សហគ្រិនភាព</div>} key="3">
                <h1>this tab 3</h1>
            </TabPane> */}
            {/* <TabPane tab={<div className='tab'>ភាពជាអ្នកដឹកនាំ</div>} key="4">
                <h1>this tab 3</h1>
            </TabPane> */}
            <TabPane tab={<div className='tab'>ហិរញ្ញវត្ថុ</div>} key="3">
                <Row gutter={[16,16]}>
                    {books.map((book, id) => (
                        <Col className='book-card' key={id} span={3} >
                            <img src={'https://image.weread.asia'+book.cover} onClick={ () => {audioInstance.playByIndex(id)}}></img>
                            <div className='book-title'>{book.title}</div>
                        </Col>
                    ))}
                </Row>
            </TabPane>
            <TabPane tab={<div className='tab'>ចិត្តវិទ្យា</div>} key="6">
                <Row gutter={[16,16]}>
                    {books.map((book, id) => (
                        <Col className='book-card' key={id} span={3} >
                            <img src={'https://image.weread.asia'+book.cover} onClick={ () => {audioInstance.playByIndex(id)}}></img>
                            <div className='book-title'>{book.title}</div>
                        </Col>
                    ))}
                </Row>
            </TabPane>
            <TabPane tab={<div className='tab'>ទីផ្សារ</div>} key="9">
                <Row gutter={[16,16]}>
                    {books.map((book, id) => (
                        <Col className='book-card' key={id} span={3} >
                            <img src={'https://image.weread.asia'+book.cover} onClick={ () => {audioInstance.playByIndex(id)}}></img>
                            <div className='book-title'>{book.title}</div>
                        </Col>
                    ))}
                </Row>
            </TabPane>
            <TabPane tab={<div className='tab'>គ្រប់គ្រង</div>} key="4">
                <Row gutter={[16,16]}>
                    {books.map((book, id) => (
                        <Col className='book-card' key={id} span={3} >
                            <img src={'https://image.weread.asia'+book.cover} onClick={ () => {audioInstance.playByIndex(id)}}></img>
                            <div className='book-title'>{book.title}</div>
                        </Col>
                    ))}
                </Row>
            </TabPane>
            <TabPane tab={<div className='tab'>ការងារ</div>} key="7">
                <Row gutter={[16,16]}>
                    {books.map((book, id) => (
                        <Col className='book-card' key={id} span={3} >
                            <img src={'https://image.weread.asia'+book.cover} onClick={ () => {audioInstance.playByIndex(id)}}></img>
                            <div className='book-title'>{book.title}</div>
                        </Col>
                    ))}
                </Row>
            </TabPane>
            <TabPane tab={<div className='tab'>បច្ចេកវិទ្យា</div>} key="8">
                <Row gutter={[16,16]}>
                    {books.map((book, id) => (
                        <Col className='book-card' key={id} span={3} >
                            <img src={'https://image.weread.asia'+book.cover} onClick={ () => {audioInstance.playByIndex(id)}}></img>
                            <div className='book-title'>{book.title}</div>
                        </Col>
                    ))}
                </Row>
            </TabPane>
        </Tabs>
        <ReactJkMusicPlayer
            {...options}
            getAudioInstance={(instance) => {
            setAudioInstance(instance)
            }}
             />
        </div>
    )
}


export default Topbar;
