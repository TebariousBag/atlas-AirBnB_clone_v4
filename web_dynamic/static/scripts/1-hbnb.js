#!/usr/bin/node

// document ready function
$(document).ready(function() {
	// empty to keep track of selected
	const selected = {};
    // add checkbox
	$('input[type="checkbox"]').change(function() {
		// get data for each
	  const id = $(this).attr('data-id');
	  const name = $(this).attr('data-name');
  
	  // if checked add to selected
	  if ($(this).is(':checked')) {
		selected[id] = name;
	  } else {
		// else remove from selected
		delete selected[id];
	  }
      // join selected
	  const amenitiesList = Object.values(selected).join(', ');
	  $('.amenities h4').text('Amenities: ' + amenitiesList);
	});
  });
