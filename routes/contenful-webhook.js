var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.status(200).send('Reached to webhook');
});

router.post('/',function(request,response){
	response.status(200).send(request.body);
})

module.exports = router;
