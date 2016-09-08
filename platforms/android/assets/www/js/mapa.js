function initAutocomplete() {
                //criação da infowindow
        var infowindow = new google.maps.InfoWindow();
        var poder = true; // somente utilizada quando a empresa for criar um ponto para selecionar o local
        var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 11,
                center: new google.maps.LatLng(-23.5833158, -46.6339829),
                mapTypeId: google.maps.MapTypeId.ROADMAP,
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

        var markers = [];
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
            map: map,
            draggable:feature.draggable, // se pode ser arrastado
            info: feature.info //conteudo do marcador
          });

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
          '<button class="btn btn-primary" onclick="submeter();">SUCESSO!</button>'+
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

         /* <?php
                $pontos = mysql_query("SELECT * FROM pontos order by id");
                $lin = mysql_num_rows($pontos);

                for ($i=0; $i <$lin ; $i++)
                {
                  $reg=mysql_fetch_row($pontos);
                  ?>
                  {
                    position: new google.maps.LatLng(<?php echo "$reg[2],$reg[3]" ?>),
                    type: 'mark1',
                    info:'<div id="content">'+
                          '<div id="siteNotice">'+
                          '</div>'+
                          '<h1 id="firstHeading" class="firstHeading"><?php echo utf8_encode($reg[1]); ?></h1>'+
                          '<div id="bodyContent" class="col-sm-12">'+
                          '<p class="col-sm-6"> <?php echo utf8_encode($reg[1]); ?></p>'+
                          '<p class="col-sm-6"> <?php echo utf8_encode($reg[4]); ?> </p>'+
                          '<form action="#" method="post">'+
                          '<p>'+
                          '<button class="btn btn-primary" type="submit">SUCESSO!</button>'+
                          ''+
                          '</p></form>'+
                          '</div>'+
                          '</div>',
                    draggable:false
                  }
                  <?php
                  if ($i!=$lin-1) {
                    echo ",";
                  }
                }
          ?>*/
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
