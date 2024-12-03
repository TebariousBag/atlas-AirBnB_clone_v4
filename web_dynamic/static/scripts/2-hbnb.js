#!/usr/bin/node

// document ready function
$(document).ready(function() {
    let selected = {};

		// add checkbox
    $('input[type="checkbox"]').change(function() {
        const id = $(this).attr('data-id');
        const name = $(this).attr('data-name');
		// if checked add to selected
        if (this.checked) {
            selected[id] = name;
        } else {
			// else remove from selected
            delete selected[id];
        }
		// join selected
        const amenitiesList = Object.values(selected).join(', ');
        $('.amenities h4').text(amenitiesList);
    });

		// check api status
    $.get('http://0.0.0.0:5001/api/v1/status/', function(data) {
		// if status is OK add class available
        if (data.status === 'OK') {
            $('#api_status').addClass('available');
        } else {
			// else remove class available
            $('#api_status').removeClass('available');
        }
    });
});
