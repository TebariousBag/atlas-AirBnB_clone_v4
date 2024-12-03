#!/usr/bin/node

// document ready function
$(document).ready(function() {
    console.log("Document is ready");

    // Check API status
    $.get('http://0.0.0.0:5001/api/v1/status/', function(data) {
        console.log("API response:", data);
        if (data.status === 'OK') {
            $('#api_status').addClass('available');
        } else {
            $('#api_status').removeClass('available');
        }
    }).fail(function() {
        console.log("Failed to reach API");
        $('#api_status').removeClass('available');
    });

    // load places from api 
	// instead of coding them on the html page
    $.ajax({
		// the info we need to make request
        url: 'http://0.0.0.0:5001/api/v1/places_search/',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({}),
        success: function(data) {
			// once successful, loop through data request
            console.log("Places response:", data);
            for (let place of data) {
				// create article for each place
                let article = $('<article></article>');
				// create title box
                let placeData = $('<div class="title_box"></div>');
                placeData.append('<h2>' + place.name + '</h2>');
                placeData.append('<div class="price_by_night">$' + place.price_by_night + '</div>');
                article.append(placeData);
				// create information div
                let information = $('<div class="information"></div>');
				// if number of guests is 1, display Guest instead of plural
                information.append('<div class="max_guest">' + place.max_guest + ' Guest' + (place.max_guest != 1 ? 's' : '') + '</div>');
				// if number of rooms is 1, display Bedroom instead of plural
                information.append('<div class="number_rooms">' + place.number_rooms + ' Bedroom' + (place.number_rooms != 1 ? 's' : '') + '</div>');
				// if number of bathrooms is 1, display Bathroom instead of plural
                information.append('<div class="number_bathrooms">' + place.number_bathrooms + ' Bathroom' + (place.number_bathrooms != 1 ? 's' : '') + '</div>');
				// append info to article
                article.append(information);
				// append description to article
                let description = $('<div class="description"></div>');
				// append description of place
                description.append(place.description);
				// append description to article
                article.append(description);
				// append article to places
                $('section.places').append(article);
				// should update the places section in html file
            }
        }
    });
});
