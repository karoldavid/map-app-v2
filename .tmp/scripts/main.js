"use strict";

var map;

/** @credit: https://snazzymaps.com/style/80276/causely-map */
var styles = [{
    "featureType": "administrative",
    "elementType": "labels.text.fill",
    "stylers": [{
        "color": "#333333"
    }, {
        "lightness": "40"
    }]
}, {
    "featureType": "administrative.country",
    "elementType": "labels.text.fill",
    "stylers": [{
        "color": "#007e7a"
    }]
}, {
    "featureType": "administrative.province",
    "elementType": "labels.text.fill",
    "stylers": [{
        "color": "#333333"
    }]
}, {
    "featureType": "administrative.locality",
    "elementType": "labels.text",
    "stylers": [{
        "weight": "1.42"
    }]
}, {
    "featureType": "administrative.neighborhood",
    "elementType": "labels.text.fill",
    "stylers": [{
        "color": "#007e7a"
    }, {
        "lightness": "15"
    }]
}, {
    "featureType": "landscape.man_made",
    "elementType": "geometry.fill",
    "stylers": [{
        "color": "#00b1ac"
    }, {
        "lightness": "75"
    }, {
        "saturation": "-46"
    }]
}, {
    "featureType": "landscape.natural",
    "elementType": "geometry.fill",
    "stylers": [{
        "visibility": "on"
    }, {
        "color": "#e0efef"
    }]
}, {
    "featureType": "landscape.natural.landcover",
    "elementType": "geometry.fill",
    "stylers": [{
        "saturation": "35"
    }, {
        "lightness": "8"
    }, {
        "visibility": "simplified"
    }]
}, {
    "featureType": "poi",
    "elementType": "geometry.fill",
    "stylers": [{
        "visibility": "on"
    }, {
        "hue": "#1900ff"
    }, {
        "color": "#c0e8e8"
    }]
}, {
    "featureType": "poi.attraction",
    "elementType": "geometry.fill",
    "stylers": [{
        "color": "#ff0000"
    }]
}, {
    "featureType": "poi.business",
    "elementType": "geometry.fill",
    "stylers": [{
        "color": "#00b1ac"
    }, {
        "lightness": "36"
    }, {
        "saturation": "-19"
    }]
}, {
    "featureType": "poi.business",
    "elementType": "labels.text.fill",
    "stylers": [{
        "color": "#00b1ac"
    }, {
        "lightness": "-30"
    }]
}, {
    "featureType": "poi.business",
    "elementType": "labels.text.stroke",
    "stylers": [{
        "weight": "0.77"
    }, {
        "lightness": "-45"
    }, {
        "color": "#ffffff"
    }]
}, {
    "featureType": "poi.business",
    "elementType": "labels.icon",
    "stylers": [{
        "saturation": "-100"
    }, {
        "lightness": "0"
    }]
}, {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [{
        "color": "#006562"
    }, {
        "lightness": "14"
    }]
}, {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [{
        "lightness": 100
    }, {
        "visibility": "simplified"
    }]
}, {
    "featureType": "road",
    "elementType": "labels",
    "stylers": [{
        "visibility": "off"
    }]
}, {
    "featureType": "transit",
    "elementType": "all",
    "stylers": [{
        "visibility": "simplified"
    }]
}, {
    "featureType": "transit.line",
    "elementType": "all",
    "stylers": [{
        "visibility": "off"
    }]
}, {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [{
        "visibility": "on"
    }, {
        "lightness": 700
    }]
}, {
    "featureType": "transit.station",
    "elementType": "all",
    "stylers": [{
        "visibility": "simplified"
    }]
}, {
    "featureType": "water",
    "elementType": "all",
    "stylers": [{
        "color": "#7dcdcd"
    }]
}, {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [{
        "color": "#007e7a"
    }, {
        "lightness": "23"
    }]
}, {
    "featureType": "water",
    "elementType": "geometry.stroke",
    "stylers": [{
        "lightness": "-6"
    }]
}, {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [{
        "color": "#007e7a"
    }, {
        "lightness": "22"
    }]
}, {
    "featureType": "water",
    "elementType": "labels.text.stroke",
    "stylers": [{
        "weight": "1.10"
    }]
}];

function getPin(color) {
    /** @credit: https://stackoverflow.com/posts/7686977/revisions */
    return new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + color, new google.maps.Size(21, 34), new google.maps.Point(0, 0), new google.maps.Point(10, 34));
}

function textSearchPlaces(places) {
    var bounds = map.getBounds();
    var placesService = new google.maps.places.PlacesService(map);

    placesService.textSearch({
        query: 'palo alto',
        type: 'art_gallery',
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
                    icon: getPin("d50f25"),
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
        //center: {lat: 52.516258, lng: 13.377697}, // Berlin
        center: { lat: 37.430594, lng: -122.168581 }, // 20 Palm Drive, Stanford, CA 94305, USA
        zoom: 12,
        styles: styles,
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
