const express = require('express');
const app = express();
const path = require('path');

//app.use(express.static(__dirname + '/dist'));
app.use(express.static(__dirname + '/dist/ng-spring-blog-frontend'));

app.listen(process.env.PORT || 8080);

// PathLocation Strategy

app.get('/*', function(req, res){
    //res.sendFile(path.join(__dirname + '/dist/index.html'));
    res.sendFile(path.join(__dirname+'/dist/ng-spring-blog-frontend/index.html'));
})

console.log('Console listening..');

// node server.js