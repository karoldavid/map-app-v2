var map;

/** @credit: https://snazzymaps.com/style/80276/causely-map */
var styles = [{
    'featureType': 'administrative',
    'elementType': 'labels.text.fill',
    'stylers': [{
        'color': '#333333'
    }, {
        'lightness': '40'
    }]
}, {
    'featureType': 'administrative.country',
    'elementType': 'labels.text.fill',
    'stylers': [{
        'color': '#007e7a'
    }]
}, {
    'featureType': 'administrative.province',
    'elementType': 'labels.text.fill',
    'stylers': [{
        'color': '#333333'
    }]
}, {
    'featureType': 'administrative.locality',
    'elementType': 'labels.text',
    'stylers': [{
        'weight': '1.42'
    }]
}, {
    'featureType': 'administrative.neighborhood',
    'elementType': 'labels.text.fill',
    'stylers': [{
        'color': '#007e7a'
    }, {
        'lightness': '15'
    }]
}, {
    'featureType': 'landscape.man_made',
    'elementType': 'geometry.fill',
    'stylers': [{
        'color': '#00b1ac'
    }, {
        'lightness': '75'
    }, {
        'saturation': '-46'
    }]
}, {
    'featureType': 'landscape.natural',
    'elementType': 'geometry.fill',
    'stylers': [{
        'visibility': 'on'
    }, {
        'color': '#e0efef'
    }]
}, {
    'featureType': 'landscape.natural.landcover',
    'elementType': 'geometry.fill',
    'stylers': [{
        'saturation': '35'
    }, {
        'lightness': '8'
    }, {
        'visibility': 'simplified'
    }]
}, {
    'featureType': 'poi',
    'elementType': 'geometry.fill',
    'stylers': [{
        'visibility': 'on'
    }, {
        'hue': '#1900ff'
    }, {
        'color': '#c0e8e8'
    }]
}, {
    'featureType': 'poi.attraction',
    'elementType': 'geometry.fill',
    'stylers': [{
        'color': '#ff0000'
    }]
}, {
    'featureType': 'poi.business',
    'elementType': 'geometry.fill',
    'stylers': [{
        'color': '#00b1ac'
    }, {
        'lightness': '36'
    }, {
        'saturation': '-19'
    }]
}, {
    'featureType': 'poi.business',
    'elementType': 'labels.text.fill',
    'stylers': [{
        'color': '#00b1ac'
    }, {
        'lightness': '-30'
    }]
}, {
    'featureType': 'poi.business',
    'elementType': 'labels.text.stroke',
    'stylers': [{
        'weight': '0.77'
    }, {
        'lightness': '-45'
    }, {
        'color': '#ffffff'
    }]
}, {
    'featureType': 'poi.business',
    'elementType': 'labels.icon',
    'stylers': [{
        'saturation': '-100'
    }, {
        'lightness': '0'
    }]
}, {
    'featureType': 'poi.park',
    'elementType': 'labels.text.fill',
    'stylers': [{
        'color': '#006562'
    }, {
        'lightness': '14'
    }]
}, {
    'featureType': 'road',
    'elementType': 'geometry',
    'stylers': [{
        'lightness': 100
    }, {
        'visibility': 'simplified'
    }]
}, {
    'featureType': 'road',
    'elementType': 'labels',
    'stylers': [{
        'visibility': 'off'
    }]
}, {
    'featureType': 'transit',
    'elementType': 'all',
    'stylers': [{
        'visibility': 'simplified'
    }]
}, {
    'featureType': 'transit.line',
    'elementType': 'all',
    'stylers': [{
        'visibility': 'off'
    }]
}, {
    'featureType': 'transit.line',
    'elementType': 'geometry',
    'stylers': [{
        'visibility': 'on'
    }, {
        'lightness': 700
    }]
}, {
    'featureType': 'transit.station',
    'elementType': 'all',
    'stylers': [{
        'visibility': 'simplified'
    }]
}, {
    'featureType': 'water',
    'elementType': 'all',
    'stylers': [{
        'color': '#7dcdcd'
    }]
}, {
    'featureType': 'water',
    'elementType': 'geometry.fill',
    'stylers': [{
        'color': '#007e7a'
    }, {
        'lightness': '23'
    }]
}, {
    'featureType': 'water',
    'elementType': 'geometry.stroke',
    'stylers': [{
        'lightness': '-6'
    }]
}, {
    'featureType': 'water',
    'elementType': 'labels.text.fill',
    'stylers': [{
        'color': '#007e7a'
    }, {
        'lightness': '22'
    }]
}, {
    'featureType': 'water',
    'elementType': 'labels.text.stroke',
    'stylers': [{
        'weight': '1.10'
    }]
}];


function getPin(color) {
    /** @credit: https://stackoverflow.com/posts/7686977/revisions */
    return new google.maps.MarkerImage('http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|' + color,
        new google.maps.Size(21, 34),
        new google.maps.Point(0, 0),
        new google.maps.Point(10, 34)
    );
}

function initMap() {
    var vm = ko.dataFor(document.body);

    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 37.430594,
            lng: -122.168581
        }, // 20 Palm Drive, Stanford, CA 94305, USA
        zoom: 16,
        styles: styles,
        mapTypeControl: false
    });

    // Try HTML5 geolocation
    if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            map.setCenter(pos);
            vm.nearbySearch(vm.places, pos);
          }, function() {
            handleLocationError(true);
          });
        } else {
            console.log("The Geolocation service failed.");
            // Browser doesn't support Geolocation
            handleLocationError();
            vm.nearbySearch(vm.places);
      }

      function handleLocationError() {
        alert('Error: The Geolocation service failed.');
      }

    vm.initializeInfoWindow();
}

var Place = function(data, vm) {
    var self = this;

    this.name = data.name;
    this.marker = data.marker;
    this.icon = data.icon;
    this.vicinity = data.vicinity;

    this.marker.addListener('click', function(){
        var marker = this;
        vm.currentLocation(self);
        vm.infoWindow.open(map, marker)
    });    
};

var ViewModel = function() {
    var self = this;

    this.places = ko.observableArray([]);

    this.currentLocation = ko.observable('');

    this.name = ko.computed(function() {
        var location = self.currentLocation();
        var title = location.name;
        return title;
    });

    this.nearbySearch = function(places, position) {
        var request = {
            location: position,
            radius: '500',
            types: ['store']
        };

        var service = new google.maps.places.PlacesService(map);
        service.nearbySearch(request, callback);

        function callback(results, status) {
            console.log(results);
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                for (var i = 0; i < results.length; i++) {
                    var place = results[i];
                    var position = place.geometry.location;
                    var name = place.name;
                    var marker = new google.maps.Marker({
                        position: position,
                        map: map,
                        icon: getPin('d50f25'),
                        title: name,
                        animation: google.maps.Animation.Drop,
                        id: i
                    });

                    place.marker = marker;
                    places.push(new Place(place, self));
                   
                }
            }
        }
    };

    this.initializeInfoWindow = function() {

        var contentString = '<div id="info-window"' +
            'data-bind="template: { name: \'info-window-template\', data: name }">' +
            '</div>';

        self.infoWindow = new google.maps.InfoWindow({
            content: contentString
        });

        var isInfoWindowLoaded = false;

        /*
         * When the info window opens, bind it to Knockout.
         * Only do this once.
         */
         google.maps.event.addListener(self.infoWindow, 'domready', function () {
            if (!isInfoWindowLoaded) {
                ko.applyBindings(self, $('#info-window')[0]);
                isInfoWindowLoaded = true;
            }
        });

    };
};

ko.applyBindings(new ViewModel());