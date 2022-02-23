var https = require('https');
var fs = require('fs');
var request = require('request');
var download_https = function(url, filename,cb) {
    var file = fs.createWriteStream(filename);
    https.get(url, function(response) {
    response.pipe(file);
    file.on('finish', function() {
      file.close(cb);
    });
  });
}

var download_request = (url , filename, callback) => {
    var file = fs.createWriteStream(filename);
    request.get(url)
    .on('response', (response) => {
        if (response.statusCode !== 200) {
            return callback('Response status was ' + response.statusCode);
        }

    })
    .pipe(file)
    .on('error', (err) => {
        fs.unlink(filename);
        return callback(err.message);
    });
    // end request

    file.on('finish', () => {
        console.log("File Downloaded!")
        file.close(callback);
    });

    file.on('error', (err) => {
        fs.unlink(filename); 
        return callback(err.message);
    });

}
// for(let i=0; i<2; i++){
//     download_https('https://weread-oss.weread.asia/Audio/Final A.mp3',i+'.mp3');
// }

download_request(encodeURI('https://weread-oss.weread.asia/Audio/១-បញ្ហា.mp3'),'1.mp3');

// download_https('https://weread-oss.weread.asia/Audio/Final A.mp3','1.mp3');
// download_https('https://weread-oss.weread.asia/Audio/១-បញ្ហា.mp3','2.mp3');
// download_https('https://weread-oss.weread.asia/Audio/២-ដំណោះស្រាយ.mp3','3.mp3');
// download_https('https://weread-oss.weread.asia/Audio/៣-ទំហំទីផ្សារ.mp3','4.mp3');
// download_https('https://weread-oss.weread.asia/Audio/៤-ដៃគូប្រកួតប្រជែង.mp3','5.mp3');
// download_https('https://weread-oss.weread.asia/Audio/៥-ប្រតិបត្តិការ.mp3','6.mp3');
// download_https('https://weread-oss.weread.asia/Audio/៦-ផែនការអនាគត.mp3','7.mp3');
// download_https('https://weread-oss.weread.asia/Audio/៧-ទុនដែលត្រូវការ.mp3','8.mp3');
// download_https('https://weread-oss.weread.asia/Audio/៨-ក្រុមការងារ.mp3','9.mp3');
// download_https('https://weread-oss.weread.asia/Audio/៩-ផែនការអាជីវកម្មមួយសន្លឹក.mp3','10.mp3');
// download_https('https://weread-oss.weread.asia/Audio/១០_ប្រការគួរយកចិត្តទុកដាក់.mp3','11.mp3');
// download_https('https://weread-oss.weread.asia/Audio/១១-ប្រការគួរជៀសវាង.mp3','12.mp3');