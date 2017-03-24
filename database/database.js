
const databaseName = 'twitterbot';
const connectionString = process.env.DATABASE_URL || `postgres://${process.env.USER}@localhost:5432/${databaseName}`
const pgp = require('pg-promise')();
const database = pgp(connectionString);

const getAllTweets = () => {
  return database.any(`SELECT * FROM tweets order by tweetext`);
};

const getTweet = () => {
  return database.one(`SELECT * FROM tweets`);
}

const addTweet = (tweetext) => {
  database.any(
    `INSERT INTO tweets (tweetext)
    VALUES ($1)`, [tweetext]
  )
}

const deleteDuplicates = () => {
  database.any(`DELETE FROM tweets WHERE ctid NOT IN
(SELECT max(ctid) FROM tweets GROUP BY tweets.*)`)
}


module.exports = {
  getAllTweets,
  getTweet,
  addTweet,
  deleteDuplicates
}
