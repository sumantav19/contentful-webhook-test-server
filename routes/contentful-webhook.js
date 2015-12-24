var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/', function(req, res, next) {
  res.status(200).send('Reached to webhook');
});

router.post('/',function(request,response){
	console.log(request.headers);
	//response.status(200).send(request.header);
	if(request.headers['x-contentful-topic'] && request.headers['x-contentful-topic'] === 'ContentManagement.Entry.publish'){
		
		fs.writeFile('./test-file-folder/test-file.txt',request.body.sys.id || 'test for content ful',function(err){
			if(err){
				return response.status(500);
			}
			
		});
		return response.status(200).send('Got the header '+ request.headers['x-contentful-topic']);
	}
	return response.status(200).send('no header');
	
})

module.exports = router;
