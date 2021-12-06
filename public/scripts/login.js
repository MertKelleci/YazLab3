$("#signupButton").on("click", function (e) {
  $.ajax({
    url: "http://localhost:3000/signup",
    type: "POST",
    data: {
      Email: $("#signupEmail").val(),
      Password: $("#signupPassword").val(),
      AdminCheck: $("#signupAdminCheck")[0].checked,
    },
    success: function (returned) {
      // window.location.href = "/login"; // here can get the return of route
    },
    error: function () {},
  });

  $("#signupPassword").val("");
  $("#signupEmail").val("");
  $("#signupAdminCheck")[0].checked = false;
});

$("#loginButton").on("click", function (e) {
  $.ajax({
    url: "http://localhost:3000/login",
    type: "POST",
    data: {
      Email: $("#loginEmail").val(),
      Password: $("#loginPassword").val(),
    },
    success: function (returned) {
      window.location.href = "/login";
    },
    error: function () {},
  });

  $("#loginPassword").val("");
  $("#loginEmail").val("");
});
