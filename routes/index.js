const twit = require('twit')
const config = require('../config.js')
const Twitter = new twit(config)
const database = require('../database/database.js')
const express = require('express')
const router = express.Router()


function getTweets(err, data, response) {
  var tweets = data.statuses
  for(var i = 0; i < tweets.length; i++) {
    database.addTweet(tweets[i].text)
  }
}

function getAll() {
  database.getAllTweets().then(data => {
    for(var i = 0; i < data.length; i++) {
      allTweets.push(data[i].tweetext)
    }
    database.deleteDuplicates()
  })
}




//use twitter api to grab last 10 tweets from user
const params = {
	screen_name:'_GeneralMeow_',
	q: '_GeneralMeow_',
	count: 10
}

Twitter.get('search/tweets', params, getTweets)


function getOne() {
	getAll()
	const arrayLength = allTweets.length
	const index = Math.floor((Math.random() * arrayLength) + 1);
	return allTweets[index]
}

//	TWEET OUT ONE RANDOM TWEET FROM DB
setInterval (tweetOut, 1000*60)

function tweetOut() {
	const allTweets = [];
	database.getAllTweets()
	.then(data => {
		for(var i = 0; i < data.length; i++) {
			allTweets.push(data[i].tweetext)
		}
		let arrayLength = allTweets.length
		let index = Math.floor((Math.random() * arrayLength) + 1);
		console.log('index: ', index) //console.log here is intentionally left in!
		let tweet = {
			status: allTweets[index]
		}

		Twitter.post('statuses/update', tweet, tweeted)

		function tweeted(err, data, respoonse) {
			if(err) {
				console.log('Something went wrong!', err)
			} else {
				console.log('It worked!')
			}
		}

	})
}

//ADD TWEETS TO DATABASE AS TWEETED
const stream = Twitter.stream('user')
stream.on('tweet', addToDb)

function addToDb(event) {
	if(event.user.screen_name === 'WebDevBotFun') {
		const message = event.text
		database.addTweet(message)
		console.log('tweet added to database: ', message)
	}
	database.deleteDuplicates()
}


    router.get('/', function(req, res, next) {
      res.render('index', { title: 'WHutup' });
    });


module.exports = router;
