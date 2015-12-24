var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.status(200).send('Reached to webhook');
});

router.post('/',function(request,response){
	console.log(request.headers);
	//response.status(200).send(request.header);
	if(request.headers['x-contentful-topic'] && request.headers['x-contentful-topic'] === 'ContentManagement.Entry.publish'){
		return response.status(200).send(request.body);
	}
	return response.status(200).send(request.body);
	
})

module.exports = router;
