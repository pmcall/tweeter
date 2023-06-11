$(document).ready(function() {
  $("textarea").on("input", function(event) {
    let tweetLimit = 140;
    let remainingChars = tweetLimit - $(this).val().length;
    $(".counter").text(remainingChars)
    if (remainingChars < 0) {
    $(".counter").css('color', 'red')
    }
  });
});

