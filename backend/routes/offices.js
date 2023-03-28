var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    req.app.locals.con.connect( function(err){
      if(err){
        console.log(err)
      }
  
      let offices = `SELECT * FROM offices`
  
      req.app.locals.con.query(offices, function(err, result){
        if(err){
          console.log(err)
        }
        console.log(result)
        res.send(result);
      })
    })
});

router.post('/employees', function(req, res, next) {
  req.app.locals.con.connect( function(err){
    if(err){
      console.log(err)
    }

    let employees = `SELECT * FROM employees WHERE officeCode = "${req.body.officeCode}"`

    req.app.locals.con.query(employees, function(err, result){
      if(err){
        console.log(err)
      }
      console.log(result)
      res.send(result);
    })
  })
});

module.exports = router;
