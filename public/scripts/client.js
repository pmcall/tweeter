/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const renderTweets = function(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
    for (let i = 0; i < tweets.length; i++) {
      let currentTweet = tweets[i]
      let returnedTweet = createTweetElement(currentTweet)
      $(document).ready(function() {
        $('#tweets-container').append(returnedTweet);
      })
    }

}

const createTweetElement = function(tweet) {
  // const userData = tweetData[["user"]]
    let avatar = tweet["user"]["avatars"];
    let userName = tweet["user"]["name"];
    let handle = tweet["user"]["handle"];
    let content = tweet["content"]["text"];
    let timeStamp = tweet["created_at"];
    const tweetArticle = $(
      `<article class="tweet">
      <header>
      <div class="username"><img src="${avatar}">${userName}</div>
      <div class="handle">${handle}</div>
      </header>
      <div class="tweet-body">${content}</div>
      <footer>
      <div class="date">${timeago.format(timeStamp)}</div>
        <div class="icon-set">
          <i class="fa-solid fa-flag" id="flag" style="color: #86B2FD;"></i>
          <i class="fa-solid fa-retweet" id="retweet" style="color: #86B2FD;"></i>
          <i class="fa-solid fa-heart" id="heart" style="color: #86B2FD;"></i>
        </div>
      </footer>
      </article>`
    )
    return tweetArticle;
  // }
  
}

// renderTweets(data)

// Override default form submition and check form before submition
function tweetSubmission() {
  $('form').on('submit', data, function(event) {
    console.log("Someone hit the submit button!");
    event.preventDefault();
    let tweetText = $(this).serialize();
    $.post("http://localhost:8080/tweets", tweetText);
  });
}

function loadTweets() {
  $(document).ready(function() {
    let url = "http://localhost:8080/tweets";
    $.ajax({
      url,
      method: 'GET',
      success: (tweets) => {
        renderTweets(tweets);
      }
    })
      .then(renderTweets(url));
  });
}

loadTweets();
