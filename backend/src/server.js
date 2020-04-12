'use strict';

// Constants
const PORT_EXPRESS = '8080';
const HOST_EXPRESS = '0.0.0.0';
const PORT_MONGO = '27017';
const HOST_MONGO = 'db';
const DB_MONGO = 'datadb';


const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');
const express = require('express');

var dataSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is necesary"]
  },
  age: {
    type: Number,
    min: 18,
    max: 100,
    required: [true, "Age is necesary"]
  },
  gender: {
    type: String,
    required: [true, "Gender is necesary"]
  },
  q01: Number,
  q02: Number,
  q03: Number,
  q04: Number,
  q05: Number,
  q06: Number,
  q07: Number,
  q08: Number,
  q09: Number,
  q10: Number,
  q11: Number,
  q12: Number,
  q13: Number,
  q14: Number,
  q15: Number,
  q16: Number,
  q17: Number,
  q18: Number,
  q19: Number,
  q20: Number,
  q21: Number,
  q22: Number,
  q23: Number,
  q24: Number,
  q25: [Number],
  q26: [Number],
  q27: [Number],
  q28: [Number],
  q29: [Number],
  q30: [Number],
  q31: [Number],
  q32: [Number],
  q33: [Number],
  q34: [Number],
  q35: [Number],
  q36: [Number],
  q37: [Number],
  q38: [Number],
  q39: [Number],
  q40: [Number],
  q41: [Number],
  q42: Number,
  q43: Number,
  q44: Number,
  q44: Number,
  q45: Number,
  q46: Number,
  q47: Number,
  q48: Number,
  q49: Number,
  q50: Number,
  q51: Number,
  q52: Number,
  q53: Number,
  q54: Number,
  q56: Number,
  q57: Number,
  q58: Number,
  q59: Number,
  q60: Number,
  q61: Number,
  q62: Number,
  q63: Number,
  q64: Number,
  q65: Number,
  q66: Number,
  q67: Number,
  q68: Number,
  q69: Number,
  created: {
    type: Date,
    required: true,
    default: Date.now
  }
});

var Poll = mongoose.model('Poll', dataSchema);




// App
var app = express();

app.use(cors());
app.use(express.json());

app.post('/new', (req, res, next) => {

  let poll = new Poll(req.body);
  console.log(poll);
  poll.save()
    .then(newPoll => res.status(200).json({
      ok: true,
      new: newPoll
    }))
    .catch(err => res.status(500).json({
      ok: false,
      message: "No se ha podido insertar en la base de datos"
    }));
});


app.get('/', (req, res, next) => {

  Poll.find({}).exec()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => res.status(500).json({
      ok: false,
      message: "No se ha podido conectar a la base de datos"
    }));

});

app.post('/query', (req, res, next) => {
  var promise = Poll.findOne({
    email: req.body.email
  }).exec();

  promise
    .then(user => {
      if (user) {
        res.status(200).json({ exist: true });
      } else {
        res.status(200).json({ exist: false });
      }
    })
    .catch(err => { 
      res.status(500).json({ ok: false, message: "No se ha podido conectar a la base de datos" })
    });
});




/**
 * Necesario ya que el contenedor de mongo, tarda unos segundos en estar disponible, por lo que se retrasa la conexión 5 segundos
 */
setTimeout(function () {
  var mongoConnectionString = `mongodb://dev:dev@${ HOST_MONGO }:${ PORT_MONGO }/${ DB_MONGO }`;
  mongoose.connect(mongoConnectionString, {
      useNewUrlParser: true
    })
    .then(
      () => {
        console.log('Running mongodb on: \x1b[42m%s\x1b[0m', mongoConnectionString);

        var expressListenString = `http://${HOST_EXPRESS}:${PORT_EXPRESS}`;
        app.listen(PORT_EXPRESS, HOST_EXPRESS, () => {
          console.log('Running express on: \x1b[42m%s\x1b[0m', expressListenString);
        });
      },
      err => {
        throw err
      }
    );
}, 5000);