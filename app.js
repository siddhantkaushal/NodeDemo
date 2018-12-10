const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const ejs = require('ejs');
const routes = require('./api/routes');
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.set('views', __dirname + '/views'); // Render on browser
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);
app.use(express.static(__dirname + '/views'));

app.use('/',routes)


app.listen(3000, function(err, res) {
  if(err){
    console.log("Error starting the server",err);
  }else {
    console.log("Listening on port 3000");
  }
});
