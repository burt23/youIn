'use strict';

let express = require('express');
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
let session = require('express-session');
let passport = require('./middleware/initPassport');
let path = require('path');
let handler = require('./routes/request_handler');
let fs = require('fs');
let port = process.env.PORT || 8080;
// let db = require('./config.js');

let app = express();
var server = require('http').Server(app);
let io = require('socket.io')(server);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session( {
  secret: 'I didn\'t get Inception',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());


app.use('/', express.static(path.join(__dirname, '../src/client')));

app.get('/events', passport.authenticate('facebook-token'), handler.getEvents);

app.get('/users', handler.getUsers);

app.post('/events/users', passport.authenticate('facebook-token'), handler.addUsersEvents);

app.post('/events/create', passport.authenticate('facebook-token'), handler.createEvent);

app.post('/accept', passport.authenticate('facebook-token'), handler.acceptEvent);

app.post('/reject', passport.authenticate('facebook-token'), handler.rejectEvent);

app.post('/delete', passport.authenticate('facebook-token'), handler.deleteEvent);

app.post('/delete/owner', passport.authenticate('facebook-token'), handler.deleteOwnerEvent);

app.post('/checkStatus', passport.authenticate('facebook-token'), handler.checkStatus);

app.get('/test', passport.authenticate('facebook-token'), function(req, res) {
  if (req.user) {
    res.status(200).json(
      { message: 'success',
        user: req.user
      });
  } else {
    res.status(404).send('login failed');
  }
});

app.get('*', handler.wildCard);

// io.on('connection', function (socket) {
//   console.log('inside connectionYEAHBUDDY');
//   socket.on('chat message', function(msg) {
//     //on incoming message log message in db and return updated message list
//     db.
//     console.log('message from client:', msg)
//     io.emit('chat message', msg);
//   })
//   // socket.emit('news', { hello: 'world' });
//   socket.on('disconnect', function (data) {
//     console.log('userDisconnected', data)
//   })
// })



io.on('connection', function (socket) {
  console.log('inside connectionYEAHBUDDY');
  socket.on('chat', function(msg) {
    console.log('message from client:', msg)
    //on incoming message log message in db and return updated message list
    handler.saveMessage(msg)
      .then( () => {
        console.log('inside then promise', msg);
        return handler.getMessages(msg.event_id)
      }).
      then((messages) => {
        // return handler.getMessages(msg)
        console.log('messageSERVER', messages)
        io.emit('messages', messages);
      })
      .catch( (error) => {
        console.error(error);
      })
    });
  socket.on('disconnect', function (data) {
    console.log('userDisconnected', data)
  })
})

server.listen(8080, function(){
  console.log('we are now listening on: who cares!!!');
})

// app.listen(port, function() {
  // console.log('we are now listening on: ' + port);
// });