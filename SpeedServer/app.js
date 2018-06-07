var config = require('./config');
var express = require('express');
var busboy = require('connect-busboy');

var app = express();
app.use(express.static('public'));
app.use(busboy());
app.enable('trust proxy');

var gcloud = require('google-cloud');

var storage = gcloud.storage({
    projectId: config.projectId,
    keyFilename: config.keyFilename
});

var bucket = storage.bucket(config.bucketName);

var remoteFile = bucket.file('file_200_MB.bin');

app.get('/download', function(req, res) {
  remoteFile.createReadStream()
    .on('error', function(err) {})
    .on('response', function(response) {})
    .on('end', function() {})
    .pipe(res);
});

app.post("/upload", function(req, res) {
  if(req.busboy) {
    req.busboy.on("file", function(fieldName, fileStream, fileName, encoding, mimeType) {
      res.send('File uploaded');
    });
    return req.pipe(req.busboy);
  }
});

app.listen(8080);

console.log('Running');
