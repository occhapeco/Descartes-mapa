/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        alert("Esta funcionalidade necessita de conexão de dados do tipo Wi-Fi ou redes móveis :2G, 3G, 4G.")
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        var poder = true;
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
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

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
                  icon: 'images/mark1.png'
                },
                mark2: {
                  icon: 'images/mark2.png'
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

          markers.push(marker);
        }

        //criação da infowindow
        var infowindow = new google.maps.InfoWindow(); // variável para criar a tela quando clica no marcador

        //variáveis de conteudo, substituir depois pela info no features
        var contentString = '<div id="content">'+
          '<div id="siteNotice">'+
          '</div>'+
          '<h1 id="firstHeading" class="firstHeading">NOME DO PONTO '+1+'</h1>'+
          '<div id="bodyContent" class="col-sm-12">'+
          '<p class="col-sm-6"> OLHA O CONTEÚDO DO PONTO MAHOE</p>'+
          '<p class="col-sm-6"> OEIOEIOEIOEOEIOEIEOIEOEI </p><p>'+
          '<p>'+
          '<button class="btn btn-primary">SUCESSO!</button>'+
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
                    position: new google.maps.LatLng(-23.5833158, -46.6339829),
                    type: 'mark1',
                    info:'<div id="content">'+
                          '<div id="siteNotice">'+
                          '</div>'+
                          '<h1 id="firstHeading" class="firstHeading">TESTE</h1>'+
                          '<div id="bodyContent" class="col-sm-12">'+
                          '<p class="col-sm-6"> TESTE</p>'+
                          '<p class="col-sm-6"> TESTE </p>'+
                          '<form action="#" method="post">'+
                          '<p>'+
                          '<button class="btn btn-primary" type="submit">SUCESSO!</button>'+
                          ''+
                          '</p></form>'+
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
                  imagePath: 'images/m'
        };

        var markerCluster = new MarkerClusterer(map, markers, options); // cria cluster
    }
    // Update DOM on a Received Event

};
