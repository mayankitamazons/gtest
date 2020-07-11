$(document).ready(function() {
  $.getJSON("/city/all_rest", function(data) {
    $("#cities").empty();
    $("#cities").append($("<option disabled selected >").text("Select city"));
    $.each(data, function(index, item) {
      $("#cities").append(
        $("<option>")
          .text(item.name)
          .val(item.id)
      );
    });
  });
});
