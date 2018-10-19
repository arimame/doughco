$(() => {
    $.ajax({
      method: "GET",
      url: "/api/location"
    }).done((locations) => {
      console.log(locations);
      for (let location of locations) {
        $("#select_loc").append(`
          <option value="${location.id}">${location.address}</option>
        `)
      }
    });;
});
