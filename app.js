'use strict';

const express = require('express');
const socketIO = require('socket.io');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log('listening on 3000');
});

const io = socketIO(server);

app.use(bodyParser.urlencoded({ extended: false } ));

io.on('connection', (socket) => {
  console.log('Client connected');
  io.emit('hello sreeja');
  socket.on('disconnect', () => console.log('Client disconnected'));
});

app.get('/', (req, res) => {
  const response = {hello: 'sreeja'};
  io.emit(response);
  res.json(response);
});