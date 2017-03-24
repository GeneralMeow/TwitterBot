DROP DATABASE IF EXISTS twitterbot;
CREATE DATABASE twitterbot;

\c twitterbot

DROP TABLE IF EXISTS tweets;
CREATE TABLE tweets
  (
    tweetid SERIAL PRIMARY KEY,
    tweetext VARCHAR(1720)
  );

INSERT INTO tweets(tweetext)
VALUES('i am so into eating cake and ice cream')
