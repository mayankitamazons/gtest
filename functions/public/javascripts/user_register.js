let user = [];
function checkPassword() {
  let confirm_password = $("#confirm_password").val();
  let password = $("#password").val();
  if (password === confirm_password) {
    return true;
  } else {
    return false;
  }
}

async function checkEmail() {
  let email = stringify($("#email").val());
  user = await $.getJSON("/user/all_email/:email");
  if (user.length == 0) {
    return true;
  }
  // let i;
  // for (i = 0; i < users.length; i++) {
  //   if (email == users[i].email) {
  //     return true;
  //   }
  // }
  return false;
}

$(document).ready(function() {
  $("#confirm_password").keyup(function(e) {
    if (checkPassword()) {
      $("#message").html('<h4 style = "color : green">Password  Matched</h4>');
    } else {
      $("#message").html('<h4 style = "color : red">Password Not Matched</h4>');
    }
  });

  $("#myform").submit(async function(e) {
    if (!checkPassword()) {
      e.preventDefault();
      alert("Passwords Do Not Matched..");
    } else if (await checkEmail()) {
      e.preventDefault();
      alert("Email already exist..");
    }
  });
});
