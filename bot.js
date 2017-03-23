const twit = require('twit')
const config = require('./config.js')
const Twitter = new twit(config)

Twitter.get('search/tweets', {q: 'nodejs since:2015-01-01', count:5}, function(err, data, response){
  console.log(data)
})
