/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//       ,
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd"
//     },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
// ]
$(document).ready(function() {

const renderTweets = function(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  for (const tweet of tweets) {
    let returnedTweet = createTweetElement(tweet)
      $('#tweets-container').append(returnedTweet);
  }

}

const createTweetElement = function(tweet) {
  const tweetArticle = $(
    `<article class="tweet">
      <header>
      <div class="username"><img src="${tweet.user.avatars}">${tweet.user.name}</div>
      <div class="handle">${tweet.user.handle}</div>
      </header>
      <div class="tweet-body">${tweet.content.text}</div>
      <footer>
      <div class="date">${timeago.format(tweet.created_at)}</div>
        <div class="icon-set">
          <i class="fa-solid fa-flag" id="flag" style="color: #86B2FD;"></i>
          <i class="fa-solid fa-retweet" id="retweet" style="color: #86B2FD;"></i>
          <i class="fa-solid fa-heart" id="heart" style="color: #86B2FD;"></i>
        </div>
      </footer>
      </article>`
  )
  return tweetArticle;
}

  $("#tweetZone").on("submit", function(event) {
    // get the element of textarea -> do val
    event.preventDefault();
    let tweetContent = $(this).serialize();
    let trimmedContent = tweetContent.replace("text=", "")
    // implement edge cases for error handling - put in return
    console.log(trimmedContent.length)
    if (trimmedContent.length === 0) {
      alert("You gotta have words to have a tweet be a masterpiece, try typing something next time!")
      return
    }
    if (trimmedContent.length > 140) {
      alert("Tweets which exceed 140 characters are not tweets, but TWEEEEEETs! Try again, but more briefly.")
      return
    }
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: tweetContent
    })
      .then(loadTweets)
  });

const loadTweets = () => {
    $.ajax({
      url: '/tweets',
      method: 'GET'
    }).then(renderTweets);
}

loadTweets();

// TODO: CSS style is not being added to dynamically added tweets
// TODO: Change font back to black if count < 140
    })
