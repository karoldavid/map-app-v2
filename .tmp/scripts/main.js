"use strict";

var map;

function textSearchPlaces(places) {
	var bounds = map.getBounds();
	var placesService = new google.maps.places.PlacesService(map);

	placesService.textSearch({
		query: "restaurants berlin germany",
		bounds: bounds
	}, function (results, status) {
		if (status === google.maps.places.PlacesServiceStatus.OK) {
			console.log(results);
			results.forEach(function (result, i) {
				var position = result.geometry.location;
				var marker = new google.maps.Marker({
					position: position,
					// icon: defaultIcon,
					map: map,
					title: result.name,
					animation: google.maps.Animation.Drop,
					id: i
				});

				result.marker = marker;
				places.push(result);
			});
		}
	});
}

function initMap() {

	map = new google.maps.Map(document.getElementById('map'), {
		center: { lat: 52.516258, lng: 13.377697 }, // Berlin
		zoom: 12,
		//styles: styles,
		mapTypeControl: false
	});

	ko.applyBindings(new ViewModel());
}

var ViewModel = function ViewModel() {
	var self = this;

	this.places = ko.observableArray();

	// Get the initial places for the list view
	textSearchPlaces(this.places);
};
//# sourceMappingURL=main.js.map
