$(document).ready(function() {
  $.getJSON("/category/all_rest", function(data) {
    $("#categories").empty();
    $("#categories").append(
      $("<option disabled selected >").text("Select Category")
    );
    $.each(data, function(index, item) {
      $("#categories").append(
        $("<option>")
          .text(item.name)
          .val(item.id)
      );
    });
  });
});
