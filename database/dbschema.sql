DROP DATABASE IF EXISTS twitterbot;
CREATE DATABASE twitterBot;

\c twitterbot;

DROP TABLE IF EXISTS tweets;
CREATE TABLE tweets(
  tweetId SERIAL PRIMARY KEY,
  tweet VARCHAR(1720)
)
