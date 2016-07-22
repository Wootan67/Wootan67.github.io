var map;
var centerPos = new google.maps.LatLng(48.583167,7.757548);
var zoomLevel = 16;
function LogoControl(controlDiv, map) {
    controlDiv.style.padding = '5px';
    
    var controlUI = document.createElement('div');
    controlUI.style.backgroundImage = 'url(images/logo.png)';
    controlUI.style.width = '300px';
    controlUI.style.height = '113px';
    controlUI.style.cursor = 'pointer';
    controlUI.title = 'Retourner à la position initiale';
    controlDiv.appendChild(controlUI);
    
    google.maps.event.addDomListener(controlUI, 'click', function() {
        map.setCenter(centerPos)
        map.setZoom(zoomLevel)
    });
 
}
function initialize() {
    var styles = [ 
    { "stylers": [ { "visibility": "simplified" } ] },
    { "elementType": "labels.text.fill", "stylers": [ { "color": "#FC5956" } ] },
    { "featureType": "water", "elementType": "geometry.fill", "stylers": [ { "color": "#6DBCDB" } ] },
    { "featureType": "poi", "elementType": "geometry.fill", "stylers": [ { "color": "#D7DADB" } ] },
    { "featureType": "road", "elementType": "geometry.fill", "stylers": [ { "color": "#FFFFFF" } ] },
    { "featureType": "landscape", "elementType": "geometry.fill", "stylers": [ { "color": "#EEEEEE" } ] },
    { "featureType": "road", "elementType": "labels.text.fill", "stylers": [ { "weight": 8 } ] },
    { "featureType": "transit", "elementType": "geometry.fill", "stylers": [ { "color": "#BBBBBB" },{ "weight": 1.5 } ] },
    { "featureType": "poi", "elementType": "labels.icon", "stylers": [ { "visibility": "off" } ] },
    { "featureType": "water", "elementType": "labels.text.fill", "stylers": [ {"color": "#FFFFFF"} ] } ];
    
    var mapOptions = {
        center: centerPos,
        zoom: zoomLevel
    };
    
    map = new google.maps.Map( document.getElementById("map-canvas"), mapOptions );
    
    var locations = [['Café Atlantico',48.583167,7.757548],];
    var image = 'images/marker.png';
    for (i = 0; i < locations.length; i++) {  
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i][1], locations[i][2]),
            title: locations[i][0],
            map: map,
            icon: image
        });
    };
    
    var styledMap = new google.maps.StyledMapType( styles, {name: "Styled Map"} );
    map.mapTypes.set('map_style', styledMap);
    map.setMapTypeId('map_style');
    var logoControlDiv = document.createElement('div');
  
    var logoControl = new LogoControl(logoControlDiv, map);
     
    logoControlDiv.index = 1;
    
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(logoControlDiv)
    
    var contentString =
    '<div id="content">'+
    '<div id="siteNotice">'+
    '</div>'+
    '<h1 id="firstHeading">Café Atlantico</h1>'+
    '<p>19 Quai des Pêcheurs, 67000 Strasbourg</p>'+
    '<p>Ouvert tous les jours de 7:00 à 1:30</p>'+
    '<br />'+
    '<p id="contact">Nous contacter :</p>'+
    '<p>Téléphone : 03 88 35 77 81</p>'+
    '<p>Internet : <a href=http://www.cafe-atlantico.net/>Site web</a> • <a href=https://www.facebook.com/cafeatlanticostrasbourg/>Facebook</a> • <a href="https://www.instagram.com/atlanticostrasbourg/">Instagram</a></p>'+
    '</div>'+
    '</div>';
    
    var infowindow = new google.maps.InfoWindow({
        content: contentString,
    })
    marker.addListener('click', function() {
        infowindow.open(map, marker);
    });
};

google.maps.event.addDomListener(window, 'load', initialize);