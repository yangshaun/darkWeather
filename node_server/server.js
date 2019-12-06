const express = require('express');
const app = express();
var cors = require('cors')
var request = require('request');
var path = require('path');


// var originsWhitelist = [
//   'http://localhost:4200', //this is my front-end url for development
//   'http://www.myproductionurl.com'
// ];

// var corsOptions = {
//   origin: function (origin, callback) {
//     var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
//     callback(null, isWhitelisted);
//   },
//   credentials: true
// }
// //here is the magic
// app.use(cors(corsOptions));


app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});



var requestUrl_auto = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?input='
var requestUrl_geo = 'https://maps.googleapis.com/maps/api/geocode/json?address='
var requestUrl_geo_latlon = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='
var requestUrl_dark = 'https://api.darksky.net/forecast/'
var requestUrl_customSearch ='https://www.googleapis.com/customsearch/v1?q='
//https://api.darksky.net/forecast/[key]/[latitude],[longitude]
//'https://maps.googleapis.com/maps/api/place/autocomplete/json?input=LOS&types=(cities)&language=en&key='


//https://www.googleapis.com/customsearch/v1?q=[STATE]=[YOUR_SE ARCH_ENGINE_ID][Y OUR_API_KEY]
var google_key = 'AIzaSyDRfV4VN1xUdFJyiUVCoL48ZbfRo3iDwdI'
var dark_key = 'a9524d030a831297bba667ba44b8c636'
var search_key = '018336416826642342937:tydcflppzos'

app.use(express.static(path.join(__dirname, 'front/dist/front/')));

app.get('/customsearch', (req, res) => {
  
  new_request_customsearch = requestUrl_customSearch+'"State+Seal+of+'+req.query.state+'"&cx='+search_key+'&imgType=news&num=1&searchType=image&key='+google_key
  console.log(new_request_customsearch)

  request(new_request_customsearch, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var result = JSON.parse(body);
      res.send(result);
      // console.log(req.query);
    } else {
      // res.send(error);
      console.log(error, response.statusCode, body);
    }
  });
});


app.get('/customsearchALL', (req, res) => {
  
  new_request_customsearch = requestUrl_customSearch+req.query.text+'"&cx='+search_key+'&imgType=news&num=10&searchType=image&key='+google_key
  console.log(new_request_customsearch)

  request(new_request_customsearch, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var result = JSON.parse(body);
      res.send(result);
      // console.log(req.query);
    } else {
      // res.send(error);
      console.log(error, response.statusCode, body);
    }
  });
});



















app.get('/dark', (req, res) => {
  
  new_request_dark = requestUrl_dark+dark_key+'/'+req.query.lat+','+req.query.lon
  console.log(req.query.lat)
  console.log(req.query.lon)
  console.log(req.query)
  request(new_request_dark, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var result = JSON.parse(body);
      res.send(result);
      // console.log(req.query);
    } else {
      // res.send(error);
      console.log(error, response.statusCode, body);
    }
  });
});


app.get('/dark_time', (req, res) => {
  
  new_request_dark = requestUrl_dark+dark_key+'/'+req.query.lat+','+req.query.lon+','+req.query.time
  console.log(req.query.lat)
  console.log(req.query.lon)
  console.log(new_request_dark)
  request(new_request_dark, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var result = JSON.parse(body);
      res.send(result);
      // console.log(req.query);
    } else {
      // res.send(error);
      console.log(error, response.statusCode, body);
    }
  });
});












app.get('/autocomplete', (req, res) => {

  
  new_request_auto = requestUrl_auto + req.query.text+"&types=(cities)&language=en&key="+google_key
  console.log(new_request_auto)
  request(new_request_auto, function (error, response, body) {
    if (!error && response.statusCode == 200) {

      // parse the json result
      var result = JSON.parse(body);
      res.send(result);
      // console.log(req.query);
    } else {
      // res.send(error);
      console.log(error, response.statusCode, body);
    }
  });
});

// https://maps.googleapis.com/maps/api/geocode/json?address=[STREET,CITY,STATE]&key=[YOUR_API_KEY]
app.get('/googlegeo', (req, res) => {

  city = req.query.city
  street = req.query.street
  state = req.query.state
  newstring = requestUrl_geo + street+","+city+","+state+"&key="+google_key
  console.log(newstring)
  request(newstring, function (error, response, body) {
    
    if (!error && response.statusCode == 200) {
      var result = JSON.parse(body);
      res.send(result);
      console.log(result);
    } else {
      console.log(error, response.statusCode, body);
    }
  });

});


app.get('/googlegeoALL', (req, res) => {

  textStr =req.query.text
  newstring = requestUrl_geo +textStr+"&key="+google_key
  console.log(newstring)
  request(newstring, function (error, response, body) {
    
    if (!error && response.statusCode == 200) {
      var result = JSON.parse(body);
      res.send(result);
      console.log(result);
    } else {
      console.log(error, response.statusCode, body);
    }
  });

});

// requestUrl_geo_latlon

app.get('/googlegeoLATLON', (req, res) => {

  latlonStr =req.query.latlon
  newstring = requestUrl_geo_latlon +latlonStr+"&key="+google_key
  console.log(newstring)
  request(newstring, function (error, response, body) {
    
    if (!error && response.statusCode == 200) {
      var result = JSON.parse(body);
      res.send(result);
      console.log(result);
    } else {
      console.log(error, response.statusCode, body);
    }
  });

});





app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'front/dist/front/index.html'));
});



const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});