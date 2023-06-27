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

  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = function(tweet) {
    const tweetArticle = $(
      `<article class="tweet">
      <header>
      <div class="username"><img src="${tweet.user.avatars}">${tweet.user.name}</div>
      <div class="handle">${tweet.user.handle}</div>
      </header>
      <div class="tweet-body">${escape(tweet.content.text)}</div>
      <footer>
      <div class="date">${timeago.format(tweet.created_at)}</div>
        <div class="icon-set">
          <i class="fa-solid fa-flag" id="flag" ></i>
          <i class="fa-solid fa-retweet" id="retweet"></i>
          <i class="fa-solid fa-heart" id="heart"></i>
        </div>
      </footer>
      </article>`
    )
    return tweetArticle;
  }

  // I've kept the setInterval functionality in here as when it works it's great. However, sometimes it seems to just finish in an instant...
  $("#tweetZone").on("submit", function(event) {
    event.preventDefault();
    let tweetContent = $(this).serialize();
    let trimmedContent = tweetContent.replace("text=", "")
    if (trimmedContent.length === 0) {
      $("#error-messages").text("You gotta have words to have a tweet be a masterpiece, try typing something next time!")
      $("#error-messages").slideDown("slow")
      setInterval(function() {
        $("#error-messages").slideUp("slow")
        return
      }, 4000);
      return
    }
    if (trimmedContent.length > 140) {
      $("#error-messages").text("Tweets which exceed 140 characters are not tweets, but TWEEEEEETs! Try again, but more briefly.")
      $("#error-messages").slideDown("slow")
      setInterval(function() {
        $("#error-messages").slideUp("slow")
        return
      }, 4000);
      return
    }
    $("#error-messages").hide()
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
})
