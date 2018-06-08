var express = require('express');
var config = require('./config');
var gcloud = require('google-cloud');
var formidable = require('formidable');
var fs = require('fs');

var app = express();
app.use(express.static('public'));
app.enable('trust proxy');

var storage = gcloud.storage();

var bucket = storage.bucket(config.bucketName);

var remoteFile = bucket.file('file_200_MB.bin');

app.get('/', function(req, res) {
  res.send('Speed Server: Up and running');
});

app.get('/download', function(req, res) {
  remoteFile.createReadStream()
    .on('error', function(err) {})
    .on('response', function(response) {})
    .on('end', function() {})
    .pipe(res);
});

app.post('/upload', function(req, res){
  var form = new formidable.IncomingForm();
  form.maxFileSize = 1024 * 1024 * 1024;
  
  form.on('error', function(err) {
    console.log('An error has occured: \n' + err);
  });

  form.on('end', function() {
    res.end('Upload complete');
  });

  form.parse(req);

});

app.listen(8080);

console.log('Running');
