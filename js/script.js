// Set the configuration for your app
// TODO: Replace with your project's config object
/*
var config = {
  apiKey: "AIzaSyAym2Kdyp1Vt5VbKLMCY7fM2t7qzUwJZT4",
  authDomain: "pitch-mate.firebaseapp.com",
  databaseURL: "https://pitch-mate.firebaseio.com/",
  storageBucket: "pitch-mate.appspot.com"
};
firebase.initializeApp(config);

// Get a reference to the database service
var database = firebase.database();
*/
var introSeen = false;
var featuresSeen = false;
var teamSeen = false;
var signupSeen = false;

var $hero_submit_button = $("#hero_email_submit");
var $email_msg = $("#email_msg");

var $hero_section = $("#hero");
var $intro_section = $("#intro");
var $feature_section = $("#features");
var $team_section = $("#testimonials");
var $signup_section = $("#signup");

// var heroHeight = $("#hero").height();
// var introHeight = $("#intro").height();
// var featureHeight = $("#features").height();
// var teamHeight = $("#testimonials").height();
// var signupHeight = $("#signup").height();


window.onload = function () {
   var isFirefox = typeof InstallTrigger !== 'undefined';
   if (isFirefox) {
      $(".jumbotron").css({"background-position": "initial", "background-attachment": "initial"});
   }

   //mixpanel.track("Video play");

   console.log("test");
   $hero_submit_button.click(submitEmail);

};

window.onscroll = function () {
   var scrollBottom = $(window).scrollTop() + $(window).height();
   if (!introSeen && scrollBottom > $intro_section.offset().top + $intro_section.outerHeight(true) && scrollBottom < $intro_section.offset().top + $intro_section.outerHeight(true) + 50) {
      console.log("triggering INTRO mixpanel");
      mixpanel.track("Intro Seen");
      introSeen = true;
   } else if (!featuresSeen && scrollBottom > $feature_section.offset().top + $feature_section.outerHeight(true) && scrollBottom < $feature_section.offset().top + $feature_section.outerHeight(true) + 50) {
      console.log("triggering FEATURES mixpanel");
      mixpanel.track("Features Seen");
      featuresSeen = true;
   } else if (!teamSeen && scrollBottom > $team_section.offset().top + $team_section.outerHeight(true) && scrollBottom < $team_section.offset().top + $team_section.outerHeight(true) + 50) {
      console.log("triggering TEAM mixpanel");
      mixpanel.track("Features Seen");
      teamSeen = true;
   } else if (!signupSeen && scrollBottom > $signup_section.offset().top + $signup_section.outerHeight(true) && scrollBottom < $signup_section.offset().top + $signup_section.outerHeight(true) + 50) {
      console.log("triggering SIGNUP mixpanel");
      mixpanel.track("Features Seen");
      signupSeen = true;
   }
}


function submitEmail() {
   $email_msg.css("opacity", 1);
   console.log("clicked");
   console.log(validateEmail($("#hero_email_form").val()));
   if (!validateEmail($("#hero_email_form").val())) { // Checks for proper email format
      console.log("wrong");
      $email_msg.text("*Please enter a valid email.");

   } else {
      console.log("right");
      $email_msg.text("Success! Thank you for trying out Pitch Mate!");
      var currUserId = Math.floor((Math.random() * 100000) + 1);
      writeUserData(currUserId, null, $("#hero_email_form").val());
      $("#hero_email_form").val("");
   }
   window.setTimeout(function () {
      $email_msg.css("opacity", 0);
   }, 5000);
}

function validateEmail(email) {
   var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   return re.test(email);
}

function writeUserData(userId, name, email) {
   firebase.database().ref('users/' + userId).set({
      username: name,
      email: email
   });
}