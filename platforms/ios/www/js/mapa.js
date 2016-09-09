var map;
var markers = [];
function initAutocomplete() {
                //criação da infowindow
        var infowindow = new google.maps.InfoWindow();
        var poder = true;
        map = new google.maps.Map(document.getElementById('map'), {
                zoom: 11,
                draggable:true,
                center: new google.maps.LatLng(-23.5833158, -46.6339829),
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                mapTypeControl : false,
                streetViewControlOptions: {
                    position: google.maps.ControlPosition.LEFT_BOTTOM
                },
                zoomControlOptions: {
                    position: google.maps.ControlPosition.LEFT_BOTTOM
                },
                styles: [
                  {
                    "stylers": [
                      { "visibility": "on" },
                      { "weight": 1 },
                      { "hue": "#64B5F6" },
                      { "gamma": 0.75 }
                    ]
                  },
                  {
                    featureType: 'landscape',
                    elementType: 'geometry',
                    stylers: [
                      { hue: '#00ff00' }
                    ]
                  },
                  {
                    featureType: 'poi.park',
                    elementType: 'geometry',
                    stylers: [
                      { hue: '#00ff00' }
                    ]
                  }
                ]
        });

        //responsivo
        google.maps.event.addDomListener(window, "resize", function() {
           var center = map.getCenter();
           google.maps.event.trigger(map, "resize");
           map.setCenter(center);
        });

        //usuário clica e cria marcador - evento de clique
        google.maps.event.addListener(map, 'click', function(event) {
          if(poder)
          {
            var temp =[
              {
                position: event.latLng,
                type: 'mark1',
                info: contentString,
                draggable:true
              }
            ];
            addMarker(temp[0]);
            poder = false;
          }else{
            alert("ponto já adicionado!");
          }
        });

        //cria o input para pesquisar no mapa
        var input = document.getElementById('pac-input');
        var searchBox = new google.maps.places.SearchBox(input);
        //map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        // Bias the SearchBox results towards current map's viewport.
        map.addListener('bounds_changed', function() {
          searchBox.setBounds(map.getBounds());
        });

        
        searchBox.addListener('places_changed', function() {
          var places = searchBox.getPlaces();

          if (places.length == 0) {
            return;
          }

          // Encontra o lugar pesquisado
          var bounds = new google.maps.LatLngBounds();
          places.forEach(function(place) {
            var icon = {
              url: place.icon,
              size: new google.maps.Size(71, 71),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(17, 34),
              scaledSize: new google.maps.Size(25, 25)
            };

            //coloca o lugar em uma variável para dar fit no mapa
            if (place.geometry.viewport) {
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          map.fitBounds(bounds);
        });

        //local dos ícones utilizados
        var icons = {
                mark1: {
                  icon: 'mapa/images/mark1.png'
                },
                mark2: {
                  icon: 'mapa/images/mark2.png'
                }
        };

        //função que adiciona marcadores
        function addMarker(feature) {
          var marker = new google.maps.Marker({
            position: feature.position,
            icon: icons[feature.type].icon,
            draggable:feature.draggable, // se pode ser arrastado
            info: feature.info //conteudo do marcador
          });

          marker.setMap(map);

          google.maps.event.addListener(marker, 'click', function () {
              infowindow.setContent(this.info); //conteúdo do marcador
              infowindow.open(map, this);
          });

          if (feature.draggable == true) {

            document.getElementById('lat').value = marker.position.lat();
            document.getElementById('long').value = marker.position.lng();

            google.maps.event.addListener(marker,'dragend', function() {
                document.getElementById('lat').value = marker.position.lat();
                document.getElementById('long').value = marker.position.lng();
            });
          }

          markers.push(marker);
        }

        //variáveis de conteudo, substituir depois pela info no features
        var contentString = '<div id="content">'+
          '<div id="siteNotice">'+
          '</div>'+
          '<h1 id="firstHeading" class="firstHeading">NOME DO PONTO '+1+'</h1>'+
          '<div id="bodyContent" class="col-sm-12">'+
          '<p class="col-sm-6"> OLHA O CONTEÚDO DO PONTO MAHOE</p>'+
          '<p class="col-sm-6"> OEIOEIOEIOEOEIOEIEOIEOEI </p><p>'+
          '<p>'+
          '<button class="btn btn-primary" onclick="calculateAndDisplayRoute() ;">SUCESSO!</button>'+
          ''+
          '</p>'+'</p>'+
          '</div>'+
          '</div>';

          var contentString1 = '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<h1 id="firstHeading" class="firstHeading">NOME DO PONTO '+2+'</h1>'+
            '<div id="bodyContent" class="col-sm-12">'+
            '<p class="col-sm-6"> OLHA O CONTEÚDO DO PONTO MAHOE</p>'+
            '<p class="col-sm-6"> OEIOEIOEIOEOEIOEIEOIEOEI </p><p><a href="index.php"><button class="btn btn-primary">SUCÉSSO!</button></a></p>'+
            '</div>'+
            '</div>';

        //uso de ícone personalizado e conteúdo de cada marker
        var features = [
                  {
                    position: new google.maps.LatLng(-27.090416, -52.622415),
                    type: 'mark1',
                    info:'<div id="content">'+
                          '<div id="siteNotice">'+
                          '</div>'+
                          '<h1 id="firstHeading" class="firstHeading"></h1>'+
                          '<div id="bodyContent" class="col-sm-12">'+
                          '<p class="col-sm-6"> </p>'+
                          '<p class="col-sm-6"> </p>'+
                          ''+
                          '<p>'+
                          '<button class="btn btn-primary" onclick="setMapOnAll(map);" type="">SUCESSO!</button>'+
                          ''+
                          '</p>'+
                          '</div>'+
                          '</div>',
                    draggable:false
                  }
        ];

        //cria as variáveis chamando as funções
        for (var i = 0, feature; feature = features[i]; i++) {
          addMarker(feature);
        }

        //cluster de marcadores
        var options = {
                  imagePath: 'mapa/images/m'
        };

        var markerCluster = new MarkerClusterer(map, markers, options); // cria cluster
      }

      function submeter()
      {
        var geocoder = new google.maps.Geocoder;
        var lati = document.getElementById('lat').value;
        var long = document.getElementById('long').value;
        var latlng = {lat: parseFloat(lati), lng: parseFloat(long)};

        geocoder.geocode({'location': latlng}, function(results, status) {
          if (status === google.maps.GeocoderStatus.OK) {
            if (results[1]) {
              alert(results[1].formatted_address);
              var address = "", city = "", state = "", zip = "", country = "", formattedAddress = "";
              for (var i = 0; i < results[0].address_components.length; i++) {
                          var addr = results[0].address_components[i];
                          // check if this entry in address_components has a type of country
                          if (addr.types[0] == 'country')
                              country = addr.long_name;
                          else if (addr.types[0] == 'street_address') // address 1
                              address = address + addr.long_name;
                          else if (addr.types[0] == 'establishment')
                              address = address + addr.long_name;
                          else if (addr.types[0] == 'route')  // address 2
                              address = address + addr.long_name;
                          else if (addr.types[0] == 'postal_code')       // Zip
                              zip = addr.short_name;
                          else if (addr.types[0] == ['administrative_area_level_1'])       // State
                              state = addr.long_name;
                          else if (addr.types[0] == ['locality'])       // City
                              city = addr.long_name;
              }
              alert(country);
              alert(address);
              alert(zip);
              alert(state);
              alert(city);
              document.getElementById('estado').value = state;
              document.getElementById('endereco').value = address;
              document.getElementById('cep').value = zip;
              document.getElementById('pais').value = country;
              document.getElementById('cidade').value = city;
            } else {
             //window.alert('No results found');
            }
          } else {
            //window.alert('Geocoder failed due to: ' + status);
          }
        });
       //document.getElementById("submete").submit();
      }

      function calculateAndDisplayRoute() {
        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer; 
        directionsDisplay.setMap(map);
        directionsDisplay.setPanel(document.getElementById("rightpanel"));
        document.getElementById("rightpanel").style.height = 'calc(40% - 56px)';
        document.getElementById("rightpanel").style.zIndex = '9999999999999';
        document.getElementById("rightpanel").style.overflow = 'auto';
        document.getElementById("map").style.height = '60%';
        setMapOnAll(null);
        directionsService.route({
          origin: new google.maps.LatLng(-27.090416, -52.622415),
          destination: new google.maps.LatLng(document.getElementById("lat").value,document.getElementById("long").value),
          travelMode: google.maps.TravelMode.DRIVING
        }, function(response, status) {
          if (status === google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      }

      function setMapOnAll(mapi) {
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(mapi);
          markers[i].setIcon(null);
        }
      }

initAutocomplete();