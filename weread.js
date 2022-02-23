var https = require('https');

const prompt = require('prompt');
var fs = require('fs');
var request = require('request');
var _cliProgress = require('cli-progress');
const console = require('console');
const Queue = require('async-await-queue');

/**
 * No more than 10 parallel, spaced at least 100ms apart
 * These are typical fair-use limitations of public APIs
 **/
 const queue = new Queue(10, 100);
 var p = [];


var download_https = function(url) {
    https.get(url, function(response) {
    response.pipe(file);
    file.on('finish', function() {
      file.close(cb);
    });
  });
}
const progressBar = new _cliProgress.MultiBar({  
    clearOnComplete: false,
    hideCursor: true},
    _cliProgress.Presets.shades_classic);

var download = function(url, filename, callback) {
  url = 'https://weread-oss.weread.asia/' + url;
  console.log(url);
  var file = fs.createWriteStream(filename);
  // http.get(url, function(response) {
  //   response.pipe(file);
  //   file.on('finish', function() {
  //     file.close(cb);
  //   });
  // });
  // const progressBar = new _cliProgress.SingleBar({format:'{bar} {percentage}% | ETA: {eta}s'},_cliProgress.Presets.shades_classic);
  let receivedBytes = 0;
    request.get(encodeURI(url))
      .on('response', (response) => {
          if (response.statusCode !== 200) {
              return callback('Response status was ' + response.statusCode);
          }

          const totalBytes = response.headers['content-length'];
          progressBar.create(totalBytes, 0);
      })
      .on('data', (chunk) => {
          receivedBytes += chunk.length;
          progressBar.update(receivedBytes,{filename: filename});
      })
      .pipe(file)
      .on('error', (err) => {
          fs.unlink(filename);
          progressBar.stop();
          return callback(err.message);
      });
      file.on('finish', () => {
          progressBar.stop();
          console.log("File Downloaded!")
          file.close(callback);
      });
  
      file.on('error', (err) => {
          fs.unlink(filename); 
          progressBar.stop();
          return callback(err.message);
      });


}


var searchID = (id) => {
  request('https://api.weread.asia/webapi/Detail?id='+id,function(error,response,body){
  if(!error && response.statusCode === 200) {
    let data = JSON.parse(body);
    let url = 'https://weread-oss.weread.asia/'+data.model.audioUrl;
    let title = data.model.title + '.mp3';
    download(url,title);
  }
  });
}

let  fetchCourses =  () => {
  var courseID = [];
  request('https://api.weread.asia/webapi/College',function(error,response,body){
    if(!error && response.statusCode === 200) {
      let data = JSON.parse(body);
      for(let i=0; i<data.recommend.length ; i++){
        courseID.push(data.recommend[i].data[0].id);
        console.log('['+(i+1)+'] '+data.recommend[i].data[0].title);
      }
      prompt.start();
      prompt.get(['select'],  function (err, result) {
        if (err) {
          return onErr(err);
        }

        request('https://api.weread.asia/webapi/Course?id='+courseID[Number(result.select) - 1], async  function(error,response,body){
          if(!error && response.statusCode === 200) {
            let data = JSON.parse(body);
            for(let i=0; i<data.list.length ; i++){
              // /* Generate a queue ID */
              // const me = Symbol();
              // /* 0 is the priority, -1 is higher priority than 0 */
              // p.push(queue.wait(me, 0)
              // .then(() => download(data.list[i].audioUrl,data.list[i].title+'.mp3'))
              // .catch((e) => console.error(e))
              // /* don't forget this or you will end up freezing */
              // .finally(() => queue.end(me)));
      
              // download(data.list[i].audioUrl,data.list[i].title.replace(/\s/g, "")+'.mp3');
              console.log(i);
              download(data.list[i].audioUrl,data.list[i].title.replace(/\s/g, "")+'.mp3');
              // download(data.list[i].videoUrl,data.list[i].title+'.m4v');
           
            }
            // await Promise.allSettled(p);
          }
          });
      });
    }
    });


}

 startMenu = () => {
  prompt.start();
  console.log('[Options]');
  console.log('[1] Audio Books');
  console.log('[2] Courses');
  console.log('[0] Exit');
  prompt.get(['select'], function (err, result) {
    if (err) {
      return onErr(err);
    }
    switch(result.select){
      case '1' : console.log('1'); break;
      case '2' : fetchCourses(); break;
      case '0' : process.exit(1);
      default : console.log("option not found"); 
               setTimeout(() => {
                 console.clear();
                 startMenu();}, 2000);
                
    }
  });

  function onErr(err) {
    console.log(err);
    return 1;
  }
}

startMenu();