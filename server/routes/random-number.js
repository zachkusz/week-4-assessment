var express = require('express');
var router = express.Router(); //may not need router???
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/zoo';

// var randomNumber = function(min, max){
//     return Math.floor(Math.random() * (1 + max - min) + min);
// }

router.put('/', function(req, res) {

  //set random number for animal
  var randomNumber = function(min, max){
      return Math.floor(Math.random() * (1 + max - min) + min);
  }
  var rng = randomNumber(1, 100);
  console.log(rng);

  //identify animal changing
  var animal = req.body
  console.log(animal);

  pg.connect(connectionString, function(err, client, done) {
    if (err) {
      res.sendStatus(500);
    }

    client.query('UPDATE animals ' +
                    'SET count = $1 WHERE species = $2', [rng, animal.species],
                  function(err, result) {
                    done();

                    if (err) {
                      res.sendStatus(500);
                      return;
                    }
                    res.sendStatus(201);
                  }
    );
  });
});

module.exports = router;
