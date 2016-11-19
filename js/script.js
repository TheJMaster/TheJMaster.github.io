var introSeen = false;
var featuresSeen = false;
var teamSeen = false;
var signupSeen = false;
var heroEmailClicked = false;
var footerEmailClicked = false;

var $hero_submit_button = $("#hero_email_submit");
var $email_msg = $("#email_msg");

var $hero_section = $("#hero");
var $intro_section = $("#intro");
var $feature_section = $("#features");
var $team_section = $("#team");
var $signup_section = $("#signup");


window.onload = function () {
   window.setTimeout(function () {
      $("#loading_screen").fadeTo("slow", 0, function(){
         $(this).css("display", "none");
      });
      $(".spinner").css("opacity", 0);
      
      $("nav, section, header, footer").fadeTo("slow", 1);
   }, 800);

   // Disables parallax effect for Firefox
   var isFirefox = typeof InstallTrigger !== 'undefined';
   if (isFirefox) {
      $(".jumbotron").css({"background-position": "initial", "background-attachment": "initial"});
   }

   
   
   $hero_submit_button.click(submitEmail);
   //mixpanelEventListeners();
   initEventListeners();
   
};


window.onscroll = function () {
   var scrollBottom = $(window).scrollTop() + $(window).height();
   if (!introSeen && scrollBottom > $intro_section.offset().top + $intro_section.outerHeight(true) && scrollBottom < $intro_section.offset().top + $intro_section.outerHeight(true) + 50) {
      console.log("MP: INTRO Seen");
      mixpanel.track("Intro Seen");
      introSeen = true;
   } else if (!featuresSeen && scrollBottom > $feature_section.offset().top + $feature_section.outerHeight(true) && scrollBottom < $feature_section.offset().top + $feature_section.outerHeight(true) + 50) {
      console.log("MP: FEATURES Seen");
      mixpanel.track("Features Seen");
      featuresSeen = true;
   } else if (!teamSeen && scrollBottom > $team_section.offset().top + $team_section.outerHeight(true) && scrollBottom < $team_section.offset().top + $team_section.outerHeight(true) + 50) {
      console.log("MP: TEAM Seen");
      mixpanel.track("Team Seen");
      teamSeen = true;
   } else if (!signupSeen && scrollBottom > $signup_section.offset().top + $signup_section.outerHeight(true) && scrollBottom < $signup_section.offset().top + $signup_section.outerHeight(true) + 50) {
      console.log("MP: SIGNUP Seen");
      mixpanel.track("Signup Seen");
      signupSeen = true;
   }
}


// function mobileStyling () {
//    $("#team").css("background", "url(../img/dot_grid_pattern.svg) repeat fixed, #663fb5 url(../img/sm-mission-banner.png) no-repeat left bottom fixed");
//    $(".jumbotron").css("background", "url(../img/dot_grid_pattern.svg) repeat fixed, #663fb5 url(../img/sm-header4.png) no-repeat center top fixed");
// }


function initEventListeners () {
   // Fucntions for a smooth click scroll.
   $("#navbar_intro_link").click(function() {
      $('html, body').animate({
         scrollTop: $intro_section.offset().top
      }, 600);
   });
   $("#navbar_features_link").click(function() {
      $('html, body').animate({
         scrollTop: $feature_section.offset().top
      }, 900);
   });
   $("#navbar_team_link").click(function() {
      $('html, body').animate({
         scrollTop: $team_section.offset().top
      }, 1200);
   });
   $("#down_arrow").click(function() {
      $('html, body').animate({
         scrollTop: $intro_section.offset().top
      }, 600);
   });
}

// Event listeners for Mixpanel triggers.
function mixpanelEventListeners () {
   $("#hero_email_form").click(function(){
      if (!heroEmailClicked) {
         console.log("MP: Hero email form clicked");
         heroEmailClicked = true;
         mixpanel.track("Hero email box clicked");
      }
   });

   $("#inputEmail").click(function(){
      if (!footerEmailClicked) {
         console.log("MP: Footer email form clicked");
         footerEmailClicked = true;
         mixpanel.track("Footer email box clicked");
      }
   });

   $("#navbar_intro_link").click(function(){
      console.log("MP: Intro navbar link clicked");
      mixpanel.track("Intro navbar link clicked");
   });

   $("#navbar_features_link").click(function(){
      console.log("MP: Features navbar link clicked");
      mixpanel.track("Features navbar link clicked");
   });

   $("#navbar_team_link").click(function(){
      console.log("MP: Team navbar link clicked");
      mixpanel.track("Team navbar link clicked");
   });

   $("#down_arrow").click(function(){
      console.log("MP: Down arrow clicked");
      mixpanel.track("Down arrow clicked");
   });
}


// Email submittion checker.
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

// Regex for proper email format.
function validateEmail(email) {
   var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   return re.test(email);
}

// Log data on Firebase
function writeUserData(userId, name, email) {
   firebase.database().ref('users/' + userId).set({
      username: name,
      email: email
   });
}