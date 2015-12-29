var express = require('express');
var router = express.Router();
var fs = require('fs');
var gulp = require('gulp'), gulpjade = require('gulp-jade') , gulpData = require('gulp-data');

router.get('/', function(req, res, next) {
  res.status(200).send('Reached to webhook');
});

router.post('/',function(request,response){
	console.log(request.body.fields);
	
	if(request.headers['x-contentful-topic'] && request.headers['x-contentful-topic'] === 'ContentManagement.Entry.publish'){
		
		gulp.task('templates',function(){
			console.log('task Running');
			gulp.src(['./src/jade/*.jade'])
				.pipe(gulpjade(function(file){
					return request.body;
				}))
				.pipe(gulpjade( {pretty: true}))
				.pipe(gulp.dest('./public/'));
		})
		console.log('task will be called');
		gulp.start('templates');

		fs.writeFile('./test-file-folder/test-file.txt',request.body || 'test for content ful',function(err){
			if(err){
				return response.status(500).send('could not write file');
			}
			
		});
		return response.status(200).send('Got the header '+ request.headers['x-contentful-topic']);
	}
	return response.status(200).send('no header');
	
})

module.exports = router;
