var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/categories', function(req, res, next) {
  req.app.locals.con.connect( function(err){
    if(err){
      console.log(err)
    }

    let categories = `SELECT * FROM productlines`

    req.app.locals.con.query(categories, function(err, result){
      if(err){
        console.log(err)
      }
      console.log(result)
      res.send(result);
    })
  })
});

router.post('/productsbycategory', function(req, res, next) {
  req.app.locals.con.connect( function(err){
    if(err){
      console.log(err)
    }

    let products = `SELECT * FROM products WHERE productLine = "${req.body.productLine}"`

    req.app.locals.con.query(products, function(err, result){
      if(err){
        console.log(err)
      }
      console.log(result)
      res.send(result);
    })
  })
});

// SELECT column1, column2, ...
// FROM table_name
// WHERE condition;

module.exports = router;
