var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var index = require('./routes/index');
var animals = require('./routes/animals');
var count = require('./routes/random-number');

app.use(bodyParser.urlencoded({extended: true}));

//Routes
app.use('/animals', animals);
app.use('/count', count);
app.use('/', index);


//Port
app.set('port', process.env.PORT || 5000);

app.listen(app.get('port'), function(){
  console.log('Listening on port: ', app.get('port'));
});
