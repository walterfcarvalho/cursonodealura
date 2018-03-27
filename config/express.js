var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

module.exports = function() {
    var app = express();

    app.use(express.static('./app/public'));
    app.set('view engine', 'ejs');
    app.set('views', './app/views');

    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(expressValidator());
    app.use(express.static('./app/public'));
    
	
    load('routes', {cwd: 'app'})
    .then('infra')
    .into(app);

    app.use(function(req, res, next){
        res.status(404).render("errors/404", {url: req.url});
        next();
    });
    
/*    app.use(function(err, req, res, next){
        if (process.env.NODE_ENV == "producao"){
            res.status(500).render("errors/500", {url: req.url});
            return;
        }
        next(err);
    });
*/


    return app;
}
