var express = require('express');
var fs = require('fs'); 
var parse = require('csv-parse');
var app = express();
var csvData=[];

var cors = require('cors');
app.use(cors());

//exposing api to get bandwidth data on based of day
app.get('/', function (req, res) {
    csvData=[];
    //reading data from file and parsing int an array
    fs.createReadStream( __dirname + '/' + req.query.day+'.csv')
    .pipe(parse({delimiter: ','}))
    .on('data', function(csvrow) {
        csvData.push(csvrow);        
    })
    .on('end',function() {
      res.send({"data" : csvData});
    });
});


app.listen(8080, function () {
  console.log('Badwidth app listening on port 8080!');
});