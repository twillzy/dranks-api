'use strict';

const express = require('express');
const socketIO = require('socket.io');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const corsOptions = {
  origin: /./,
  allowedHeaders: 'Origin, X-Requested-With, Content-Type, Authorization',
};

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log('listening on 3000');
});

const io = socketIO(server);

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('disconnect', () => console.log('Client disconnected'));
});

app.get('/', (req, res) => {
  const response = {hello: 'startcon'};
  res.json(response);
});

app.post('/breathalyzer-value/:drunkenness', (req, res) => {
  const drunkenness = req.params.drunkenness;
  io.emit('breathalyzer', {
    drunkenness
  });
  res.send(200);
});

app.post('/orders', (req, res) => {
  const totalPrice = req.body.totalPrice;
  io.emit('drinkBought', {
     totalPrice
  });

  res.json({totalPrice});
});