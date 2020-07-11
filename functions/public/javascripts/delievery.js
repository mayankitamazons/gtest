$(document).ready(function() {
  $.getJSON("/delievery/all_rest", function(data) {
    $("#delieveries").empty();
    $("#delieveries").append(
      $("<option disabled selected >").text("Select Delievery person")
    );
    console.log("delievery person", data);
    $.each(data, function(index, item) {
      if ($("#user_city_id").val() === item.city_id) {
        $("#delieveries").append(
          $("<option>")
            .text(item.name)
            .val(item.id)
        );
      }
    });
  });
});
