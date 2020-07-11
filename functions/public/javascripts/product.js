$(document).ready(function() {
  $.getJSON("/product/all_rest", function(data) {
    $("#products").empty();
    $("#products").append(
      $("<option disabled selected >").text("Select product")
    );
    $.each(data, function(index, item) {
      $("#products").append(
        $("<option>")
          .text(item.name)
          .val(item.id)
      );
    });
  });
});
