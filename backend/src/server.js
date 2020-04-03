'use strict';

// Constants
const PORT_EXPRESS        = '8080';
const HOST_EXPRESS        = '0.0.0.0';
const PORT_MONGO          = '27017';
const HOST_MONGO          = 'db';
const DB_MONGO            = 'datadb';


const mongoose  = require('mongoose');
const cors      = require('cors');
const fs        = require('fs');
const express   = require('express');

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
  q01: String,
  q02: String,
  q03: String,
  q04: String,
  q05: String,
  q06: String,
  q07: String,
  q08: String,
  q09: String,
  q10: String,
  q11: String,
  q12: String,
  q13: String,
  q14: String,
  q15: String,
  q16: String,
  q17: String,
  q18: String,
  q19: String,
  q20: String,
  q21: String,
  q22: String,
  q23: String,
  q24: String,
  q25: [String], 
  q26: [String], 
  q27: [String], 
  q28: [String], 
  q29: [String], 
  q30: [String], 
  q31: [String], 
  q32: [String], 
  q33: [String], 
  q34: [String], 
  q35: [String], 
  q36: [String], 
  q37: [String], 
  q38: [String], 
  q39: [String], 
  q40: [String], 
  q41: [String],  
  created: {
    type: Date, 
    required: true,
    default: Date.now
  }
});

var Poll = mongoose.model('Poll', dataSchema);




// App
var app = express();

/*
 * Para permitir llamadas javascript a otros dominios
 * Sin embargo utilizamos el paquete de node cors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});
 */

app.use(cors());
app.use(express.json());

app.post('/new', (req, res, next) => {

  let poll = new Poll(req.body);
  console.log(poll);
  poll.save()
    .then(newPoll => res.status(200).json({ok: true, new: newPoll}))
    .catch(err => res.status(500).json({ok: false, message: "No se ha podido insertar en la base de datos" }));
});


app.get('/',  (req, res, next) => {

  Poll.find({}).exec()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => res.status(500).json({ok: false, message: "No se ha podido conectar a la base de datos" }));

});




/**
 * Necesario ya que el contenedor de mongo, tarda unos segundos en estar disponible, por lo que se retrasa la conexión 5 segundos
 */
setTimeout(function() {
  var mongoConnectionString = `mongodb://dev:dev@${ HOST_MONGO }:${ PORT_MONGO }/${ DB_MONGO }`;
  mongoose.connect(mongoConnectionString, {useNewUrlParser: true})
    .then(
      () => {
        console.log('Running mongodb on: \x1b[42m%s\x1b[0m', mongoConnectionString);

        var expressListenString = `http://${HOST_EXPRESS}:${PORT_EXPRESS}`;      
        app.listen(PORT_EXPRESS, HOST_EXPRESS, () => {
          console.log('Running express on: \x1b[42m%s\x1b[0m', expressListenString);
        });
      },
      err => { throw err }
  );
}, 5000);


