var express = require('express');
var fs = require('fs');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var chalk = require('chalk');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

var path = require('path');
var jsDirectory = './public/javascripts/';

fs.watch(jsDirectory, {recursive: true}, function(event, filename){
    var isEmpty = false;
    if(null === filename) return;

    if(path.extname(filename) !== '.js') return;

    fs.readFile(jsDirectory + filename, 'utf8', function(err, data){
      isEmpty = (data === '');

      var directiveName = filename.replace(/\.js/, '');
      var moduleName = directiveName.charAt(0).toUpperCase() + directiveName.substring(1);
      var templateName = directiveName.replace(/([A-Z])/g, function(a,b,c,d){return '-'+a.toLowerCase()});

      var jsScaffold = fs.readFileSync('./temp/directive.js', 'utf8')
        .replace(/%MODULENAME%/m, moduleName)
        .replace(/%DIRECTIVENAME%/gm, directiveName)
        .replace(/%TEMPLATENAME%/m, templateName + '.html');
      
      if(isEmpty){
        fs.writeFile(jsDirectory + filename, jsScaffold, function(err){
          console.log(
            chalk.green( 
              chalk.bgWhite(
                '\tCreated ' + chalk.blue(filename)
              )
            )
          );

          fs.openSync('./public/includes/' + templateName + '.html', 'w');
          fs.writeFileSync('./public/includes/' + templateName + '.html', '<div></div>');
        });
      }

    });
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
