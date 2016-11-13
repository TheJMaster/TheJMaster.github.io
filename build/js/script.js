// Set the configuration for your app
// TODO: Replace with your project's config object
/*var config = {
  apiKey: "AIzaSyAym2Kdyp1Vt5VbKLMCY7fM2t7qzUwJZT4",
  authDomain: "pitch-mate.firebaseapp.com",
  databaseURL: "https://pitch-mate.firebaseio.com/",
  storageBucket: "pitch-mate.appspot.com"
};
firebase.initializeApp(config);

// Get a reference to the database service
var database = firebase.database();
*/
var $hero_submit_button = $("#hero_email_submit");
var $email_msg = $("#email_msg");

window.onload = function () {

   mixpanel.track("Video play");

   console.log("test");
   $hero_submit_button.click(submitEmail);

};


function submitEmail() {
   $email_msg.css("opacity", 1)
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