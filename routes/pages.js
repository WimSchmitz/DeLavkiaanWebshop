var express = require('express');
var router = express.Router();

/* GET index page. */
router.get('/', function(req, res, next){
  res.render("index");
})

/* GET index page. */
router.get('/index', function(req, res, next){
  res.render("index");
})

/* GET checkout page. */
router.get('/checkout', function(req, res, next) {
  res.render("checkout");
});

/* GET products page. */
router.get('/products', function(req, res, next) {
  res.render("products");
});

/* GET contact page. */
router.get('/contact', function(req, res, next) {
  res.render("contact");
});


/* GET about page. */
router.get('/about', function(req, res, next) {
  res.render("about");
});


/* GET bedankt page. */
router.get('/paymentReturn', function(req, res, next) {
  console.log(req);
  res.render("paymentSuccess");
});


module.exports = router;
