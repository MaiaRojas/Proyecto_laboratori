var express = require("express");
const app = express();
// var io = require('socket.io')(http);

app.use('/', express.static('public'));

// app.get('/', function(req, res){
//   res.sendFile(__dirname + '/index.html');
// });

// io.on('connection', function(socket){
//   socket.on('chat message', function(msg){
//     io.emit('chat message', msg);
//   });
// });

app.listen(process.env.PORT || 3000, () => {
    console.log("Listening on port 3000");
});
