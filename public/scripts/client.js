/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

const renderTweets = function(tweets) {
  $('.tweet').hide();
  for (const tweet of tweets) {
    let returnedTweet = createTweetElement(tweet)
      $(returnedTweet).insertAfter("section");
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
    event.preventDefault();
    let tweetContent = $(this).serialize();
    let trimmedContent = tweetContent.replace("text=", "")
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
      $("textarea").val("")
      $(".counter").val("140")
  });

const loadTweets = () => {
    $.ajax({
      url: '/tweets',
      method: 'GET'
    }).then(renderTweets);
}

loadTweets();

// TODO: CSS style is not being added to dynamically added tweets
// TODO: Names do not go to new line
    })
