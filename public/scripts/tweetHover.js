$(document).ready(function() {
  $(".tweet").on("mouseover", function() {
    $(this).css("box-shadow", "5px 5px 5px #B8D2FF");
  }).mouseleave(function() {
    $(this).css("box-shadow", "0px 0px 0px #B8D2FF");
  });
})

$(document).ready(function() {
  $(".fa-flag").on("mouseover", function() {
    $(this).css("color", "#000");
  }).mouseleave(function() {
    $(this).css("color", "#85B2FD");
  });
})

$(document).ready(function() {
  $(".fa-heart").on("mouseover", function() {
    $(this).css("color", "#000");
  }).mouseleave(function() {
    $(this).css("color", "#85B2FD");
  });
})

$(document).ready(function() {
  $(".fa-retweet").on("mouseover", function() {
    $(this).css("color", "#000");
  }).mouseleave(function() {
    $(this).css("color", "#85B2FD");
  });
})