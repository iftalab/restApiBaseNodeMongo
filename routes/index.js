var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    db.query("Select * from users",function (err, result) {
        if (err) throw err;
        for(var i = 0 ; i < result.length ; i++){
            console.log(result[i].username);
        }
    });
    var drinks = [
        { name: 'Bloody Mary', drunkness: 3 },
        { name: 'Martini', drunkness: 5 },
        { name: 'Scotch', drunkness: 10 }
    ];
    var tagline = "Any code of your own that you haven't looked at for six or more months might as well have been written by someone else.";
  res.render('index', { drinks: drinks,tagLine:tagline });
});

module.exports = router;
