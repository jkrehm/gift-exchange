
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , draw = require('./routes/draw')
  // , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , cons = require('consolidate');

var app = express();

// Ass the dust engine to .dust files
app.engine('dust', cons.dust);

app.configure(function(){
  app.set('port', process.env.PORT || 9501);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'dust');
  app.use(express.favicon(__dirname + '/public/favicon.ico', { maxAge: 2592000000 }));
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.post('/draw', draw.draw);
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
