var express = require('express')
var router = express.Router()
var fs = require('fs')
var https = require('https')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('weather.html', { root: 'public' })
})

router.get('/getcity',function(req,res,next) {
  console.log("In getcity route");
  fs.readFile(__dirname + '/cities.dat.txt',function(err,data) {
    if(err) throw err;
    var cities = data.toString().split("\n");
    var jsonresult = [];
    for (var i = 0; i < cities.length; i++) {
      var result = cities[i].search(myRe);
      if(result != -1){
        jsonresult.push({city:cities[i]});
      }
    }
    res.status(200).json(jsonresult); 
 });  
  
  var myRe = new RegExp("^" + req.query.q);
  console.log(myRe);
})

router.get('/owlRoute',function(req,res,next){
  var url = 'https://owlbot.info/api/v1/dictionary/' + req.query.w + '?format=json'
  https.get(url, function(owl) {
    owl.pipe(res)
  })
})

module.exports = router


