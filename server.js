
const express = require('express');
const app = express();
app.use('/',express.static('public'));

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), () => {
console.log('Node app is running on port', app.get('port'));
});



// var express = require("express");
// //var http    = require("http").Server(app);
// //var io      = require('socket.io')(http);
// var api     = require("./api");
// const app   = express();
//
// app.get('/api/news/', function (req, res) {
//     let news = api;
//     console.log(news);
// });
// app.use('/', express.static('public'));
// /*
// app.get('/', function(req, res){
//     res.sendFile(__dirname + '/index.html');
// });
//
// io.on('connection', function(socket){
//     socket.on('chat message', function(msg){
//         io.emit('chat message', msg);
//     });
// });
// */
//
// app.listen(process.env.PORT || 3000, () => {
//     console.log("Listening on port 3000");
// });
