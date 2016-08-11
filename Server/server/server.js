var express = require('express'),
    bodyParser      = require('body-parser'),
    methodOverride  = require('method-override'),
    shops        = require('./routes/shops'),
    mongodb = require('mongodb'),
    monk = require('monk'),
    db =  monk('mongodb://localhost:27017/smile'),
    app = express(); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(methodOverride());      

app.use(function(req,res,next){
    req.db = db;
    next();
});

// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.get('/shops', shops.findAll);
app.get('/shops/:id:title', shops.findById);

app.set('port', process.env.PORT || 5000);

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
