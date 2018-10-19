$(() => {
  $("#loc_button").click(() => {
    const loc = $("#select_loc").val();
    console.log(loc);
    $("#loc_submit").attr("action", `/locations/${loc}`);
    $("#loc_submit").submit();
    // console.log($("#select_loc").val());
  });
});
