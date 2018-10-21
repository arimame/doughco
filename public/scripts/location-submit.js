$(() => {
  $('#loc_button').click(() => {
    const loc = $('#select_loc').val();
    $('#loc_submit').attr('action', `/locations/${loc}`);
    $('#loc_submit').submit();
  });
});
