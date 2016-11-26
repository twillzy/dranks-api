"use-strict";
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Run server to listen on port 3000.
const server = app.listen(3000, () => {
  console.log('listening on *:3000');
});

const io = require('socket.io')(server);

app.use(bodyParser.urlencoded({ extended: false } ));
app.use(express.static('static'));

// Set socket.io listeners.
io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

// Set Express routes.
app.get('/', (req, res) => {
  res.json({id: '1'});
});

app.post('/events', (req, res) => {
  let to = req.body.To;
  let fromNumber = req.body.From;
  let callStatus = req.body.CallStatus;
  let callSid = req.body.CallSid;

  io.emit('call progress event', { to, fromNumber, callStatus, callSid });

  console.log(to, fromNumber, callStatus, callSid);
  res.send('Event received');
});

app.post('/voice', (req, res) => {
  let twiml = new twilio.TwimlResponse();
  // Talk in a robot voice over the phone.
  twiml.say('Call progress events are rad');
  // Set the response type as XML.
  res.header('Content-Type', 'text/xml');
  // Send the TwiML as the response.
  res.send(twiml.toString());
});
