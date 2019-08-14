var express = require('express');
var router = express.Router();

//setup basic auth
//source from http://www.codexpedia.com/node-js/node-js-basic-auth-in-express-js/
var basicAuth = require('basic-auth');
 
function doBasicAuthCheck(req, res) {
  var user = basicAuth(req);
  if (!user || !user.name || !user.pass) {
    console.log('no match');
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    res.status(401);
    res.send('Current password does not match');
    return false;
  }
  if (user.name === 'pluralsight' && user.pass === 'password') {
    return true;
  } else {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    res.status(401);
    res.send('Current password does not match');
    return false;
  }
}

/* GET users listing. */
router.get('/', function(req, res) {
    
    if(doBasicAuthCheck(req, res)){
  
        //fixed array of positions
        var positionarray = [
            "No new taxes!",
            "Year 'round schools!",
            "Free trade with Canada!",
            "Term limits!",
            "Candy for all children!"
        ];
        
            res.json({positions: positionarray});
        }
  
});

router.get('/async', function(req, res){
   
    //fixed array of positions
    var positionarray = [
        "No new taxes!",
        "Year 'round schools!",
        "Free trade with Canada!",
        "Term limits!",
        "Candy for all children!"
    ];
    
    setTimeout(function() {
        res.json({positions: positionarray});
    }, 5000);
    
});

module.exports = router;