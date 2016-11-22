var express = require('express');
var twit = require('twitter');
var router = express.Router();
var path = require('path');
var retext = require('retext');
var inspect = require('unist-util-inspect');
var sentiment = require('retext-sentiment');

var sentimentData = [];

var twitter = new twit({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_KEY,
  access_token_key: process.env.TWITTER_CONSUMER_KEY,
  access_token_secret: process.env.TWITTER_CONSUMER_KEY.
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
