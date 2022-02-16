var http = require('https');

const prompt = require('prompt');
var fs = require('fs');
var request = require('request');
var _cliProgress = require('cli-progress');
const console = require('console');

var download = function(url, filename, callback) {
  var file = fs.createWriteStream(filename);
  // http.get(url, function(response) {
  //   response.pipe(file);
  //   file.on('finish', function() {
  //     file.close(cb);
  //   });
  // });
  const progressBar = new _cliProgress.SingleBar({
        format:'{bar} {percentage}% | ETA: {eta}s'},
          _cliProgress.Presets.shades_classic);
  let receivedBytes = 0;
  request.get(url)
    .on('response', (response) => {
        if (response.statusCode !== 200) {
            return callback('Response status was ' + response.statusCode);
        }

        const totalBytes = response.headers['content-length'];
        progressBar.start(totalBytes, 0);
    })
    .on('data', (chunk) => {
        receivedBytes += chunk.length;
        progressBar.update(receivedBytes);
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



prompt.start();

prompt.get(['id'], function (err, result) {
  if (err) {
    return onErr(err);
  }
  console.log('Command-line input received:');
  searchID(result.id);
});

function onErr(err) {
  console.log(err);
  return 1;
}