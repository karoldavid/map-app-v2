var map;

var locations = [

];


function initMap() {

	console.log("initMap");

    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 52.516258, lng: 13.377697}, // Berlin
        zoom: 12,
        //styles: styles,
        mapTypeControl: false
    });

	function textSearchPlaces() {
	    var bounds = map.getBounds();
	    var placesService = new google.maps.places.PlacesService(map);
	    
	    placesService.textSearch({
	        query: "restaurants",
	        bounds: bounds
	    }, function(results, status) {
	    	if (status === google.maps.places.PlacesServiceStatus.OK) {
	        	console.log(results);
	        }
	    });
	}

	textSearchPlaces();

}

var ViewModel = function () {
	var self = this;

};


ko.applyBindings(new ViewModel());