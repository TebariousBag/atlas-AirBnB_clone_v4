#!/usr/bin/node

// document ready function
$(document).ready(function() {
	// empty to keep track of selected
	const selected = {};
  
	// add checkbox
	$('input[type="checkbox"]').change(function() {
		// get data for each
	  const amenityId = $(this).attr('data-id');
	  const amenityName = $(this).attr('data-name');
		// if checked add to selected
	  if ($(this).is(':checked')) {
		selected[amenityId] = amenityName;
	  } else {
		delete selected[amenityId];
	  }
	  // join selected
	  const amenitiesList = Object.values(selected).join(', ');
	  $('.amenities h4').text('Amenities: ' + amenitiesList);
	});
  
	// request status
	$.get('http://0.0.0.0:5001/api/v1/status/', function(data) {
		// if ok add class available
	  if (data.status === 'OK') {
		$('#api_status').addClass('available');
		// else remove class available
	  } else {
		$('#api_status').removeClass('available');
	  }
	});
  });
