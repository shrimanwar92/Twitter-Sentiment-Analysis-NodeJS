var express = require('express');
var twit = require('twitter');
var router = express.Router();
var path = require('path');
var retext = require('retext');
var inspect = require('unist-util-inspect');
var sentiment = require('retext-sentiment');

var sentimentData = [];

var twitter = new twit({
  consumer_key: 'ugZ3qKFYqT3XfyO4fum9jwMSa',
  consumer_secret: 'I41cAwyekfgQjLY80UioMzwSyqG6mh1CVgtugDta63y1dT8Zf8',
  access_token_key: '784787507946909700-GPQg79wg6YYa7FuYQiKHaUS926ZrQAD',
  access_token_secret: 'HoKiYaQNsxnxCSS5CbxB7aDaaFfWLdrEwuCW5acsjrfg0'
});

router.get('/tweets/:q', function(req, res, next) {
  twitter.get('search/tweets', { q: req.params.q}, function(error, tweets, response){
    if(error){
    	res.json(error);
    }
    
    for (var i = 0; i < tweets.statuses.length; i++) {
    	retext().use(sentiment).use(function () {
		    return function (cst) {
		        console.log(cst.data);
		        console.log(tweets.statuses[i].text);
		    };
		}).process(
		    tweets.statuses[i].text
		);
    }

  });
});


module.exports = router;
