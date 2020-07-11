window.fbAsyncInit = function() {
  FB.init({
    appId: "608842399848394",
    cookie: true,
    xfbml: true,
    version: "v6.0"
  });

  FB.AppEvents.logPageView();
};

(function(d, s, id) {
  var js,
    fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {
    return;
  }
  js = d.createElement(s);
  js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
})(document, "script", "facebook-jssdk");

// $("#fb").click(function(event) {
//   //   FB.getLoginStatus(function(response) {
//   //     if (response.status !== "connected") {
//   //       FB.login(
//   //         function(response) {
//   //           window.location.href = `/user/make-fb-login/${response.authResponse.accessToken}`;
//   //         },
//   //         { scope: "public_profile,email" }
//   //       );
//   //     }
//   //   });

//   FB.login(
//     function(response) {
//       window.location.href = `/user/make-fb-login/${response.authResponse.accessToken}`;
//     },
//     { scope: "public_profile,email" }
//   );
// });
