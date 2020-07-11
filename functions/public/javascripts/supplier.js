$(document).ready(function() {
  $.getJSON("/supplier/all_rest", function(data) {
    $("#suppliers").empty();
    $("#suppliers").append(
      $("<option disabled selected >").text("Select Spplier")
    );
    $.each(data, function(index, item) {
      $("#suppliers").append(
        $("<option>")
          .text(item.name)
          .val(item.id)
      );
    });
  });
});
