var app = app || {};

$(function() {

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

  var Place = function(data, vm) {
    var self = this;
    var position = data.geometry.location;
    var title = data.name;
    var defaultIcon = getPin('d50f25');
    var highlightedIcon = getPin('FFFF24');

    this.name = data.name;
    this.visible = ko.observable(true);
    this.marker = data.marker;
    this.icon = data.icon;
    this.vicinity = data.vicinity;

    this.marker = new google.maps.Marker({
            position: position,
            map: vm.map,
            icon: defaultIcon,
            defaultIcon: defaultIcon,
            highlightedIcon, highlightedIcon,
            title: title,
            animation: google.maps.Animation.Drop,
            id: data.place_id
          });

    this.toggleVisibility = ko.computed(function() {
      self.marker.setVisible(self.visible());
    });

    this.marker.addListener('click', function() {
      var marker = this;
      vm.map.panTo(marker.getPosition())
      vm.currentLocation(self);
      vm.getPlacesDetails(marker);
      vm.infoWindow.open(vm.map, marker)
    });

    this.marker.addListener('mouseover', function() {
      this.setIcon(this.highlightedIcon);
    });

    this.marker.addListener('mouseout', function() {
      this.setIcon(this.defaultIcon);
    });
  };

  var ViewModel = function() {
    var self = this;

    this.query = ko.observable('');
    this.places = ko.observableArray([]);
    this.currentLocation = ko.observable('');
    this.infoWindowData = ko.observableArray([]);
  };

  ViewModel.prototype.nearbySearch = function(places, position) {
    var self = this;
    var request = {
      location: position,
      radius: '1000',
      types: ['art_gallery']
    };

    var service = new google.maps.places.PlacesService(self.map);
    service.nearbySearch(request, callback);

    function callback(results, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {

        for (var i = 0; i < results.length; i++) {
          var place = results[i];
          places.push(new Place(place, self));

        }
      }
    }
  };

  ViewModel.prototype.getPlacesDetails = function(marker) {
    var self = this;
    self.infoWindowData([]);

    var service = new google.maps.places.PlacesService(self.map);
    service.getDetails({
      placeId: marker.id
    }, function(place, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        // Set the marker property on this infowindow so it isn't created again.

        if (place.name) {
          self.infoWindowData.push(place.name);
        }

        if (place.formatted_address) {
          self.infoWindowData.push(place.formatted_phone_number);
        }

        if (place.photos) {
          self.infoWindowData.push(place.photos[0].getUrl({
            maxHeight: 100,
            maxWidth: 200
          }));
        }
      }
    });
  };

  ViewModel.prototype.initializeInfoWindow = function() {
    var self = this;
    var contentString = '<div id="info-window"' + 'data-bind="template: { name: \'info-window-template\', data: infoWindowData}">' + '</div>';
    var isInfoWindowLoaded = false;

    self.infoWindow = new google.maps.InfoWindow({
      content: contentString
    });

    /*
     * When the info window opens, bind it to Knockout.
     * Only do this once.
     */
    google.maps.event.addListener(self.infoWindow, 'domready', function() {
      if (!isInfoWindowLoaded) {
        ko.applyBindings(self, $('#info-window')[0]);
        isInfoWindowLoaded = true;
      }
    });
  };

  ViewModel.prototype.activateMarker = function(place) {
    var marker = place.marker;
    google.maps.event.trigger(marker, 'click');
  };

  ViewModel.prototype.getPlaces = function() {
    var self = this;
       // Try HTML5 geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        self.map.setCenter(pos);
        self.nearbySearch(self.places, pos);
      }, function() {
        handleLocationError(true);
      });
    } else {
      console.log("The Geolocation service failed.");
      // Browser doesn't support Geolocation
      handleLocationError();
      self.nearbySearch(self.places);
    }

    function handleLocationError() {
      alert('Error: The Geolocation service failed.');
    }

  };

  ViewModel.prototype.initMap = function() {
    var self = this;

    this.map = new google.maps.Map(document.getElementById('map'), {
      center: {
        lat: 37.430594,
        lng: -122.168581
      }, // 20 Palm Drive, Stanford, CA 94305, USA
      zoom: 16,
      styles: styles,
      mapTypeControl: false
    });

    this.getPlaces();
    this.initializeInfoWindow();
  };

  app.vm = new ViewModel();
  ko.applyBindings(app.vm);

  ViewModel.prototype.filteredPlaces = ko.computed(function() {
      var query = this.query().toLowerCase();

      if (this.infoWindow) { 
        this.infoWindow.close();
      }
      this.places().forEach(function(place) {
        var name = place.name.toLowerCase();
        var match = name.indexOf(query) != -1;
        place.visible(match);
      });
    }, app.vm);

});