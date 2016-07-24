var storeLocation;
var boyLocation;
var request_max_value = 0;
var maxlimit_reached = false;
var delivery_lat;
var delivery_lng;
var locationDetails = {};
/**locationDetails[4] = "12.9171,77.6271";
locationDetails[2] = "12.9171,77.6371";
locationDetails[3] = "12.9161,77.6971";
locationDetails[1] = "12.9279,77.6271";
**/

var originalAlert = "<input type=\"text\"  tabindex=\"3\" placeholder=\"Type here\" />"+
    "<div class=\"sa-input-error\"></div>";

$(function() {
    $('#datetimepicker3').datetimepicker({
        pickDate: false,        
    });
});

var d = new Date();
var hour = d.getHours();
var minutes = d.getMinutes();
var output = hour + ':' + minutes + ":00"
$("#reach_time").val(output);

$('.btn-number').click(function(e){
    e.preventDefault();    
    fieldName = $(this).attr('data-field');
    type      = $(this).attr('data-type');
    var input = $("input[name='"+fieldName+"']");
    var currentVal = parseInt(input.val());
    var delivery_boys_count = currentVal;
    var total_amount = 0;
    if (!isNaN(currentVal)) {
        if(type == 'minus') {

            if(currentVal > input.attr('min')) {
                input.val(currentVal - 1).change();
                delivery_boys_count = currentVal - 1;
            } 
            if(parseInt(input.val()) == input.attr('min')) {
                $(this).attr('disabled', true);
            }

        } else if(type == 'plus') {

            if(currentVal < input.attr('max')) {
                input.val(currentVal + 1).change();
                delivery_boys_count = currentVal + 1;
            }
            if(parseInt(input.val()) == input.attr('max')) {
                $(this).attr('disabled', true);
            }        
        }
        if(!maxlimit_reached){
            $("#delivery_boys_count").html(delivery_boys_count)
            total_amount = parseInt($("#amount_per_boy").val()) * parseInt($("#delivery_boys_count").html());        
            $("#total_amount").val(parseFloat(total_amount).toFixed(2))
        }        
    } else {
        input.val(0);
    }
});
$('.input-number').focusin(function(){
   $(this).data('oldValue', $(this).val());
});
$('.input-number').change(function() {

    minValue =  parseInt($(this).attr('min'));
    maxValue =  parseInt($(this).attr('max'));
    if(request_max_value != 0){
        maxValue = request_max_value;
    }
    valueCurrent = parseInt($(this).val());
    
    name = $(this).attr('name');
    if(valueCurrent >= minValue) {
        $(".btn-number[data-type='minus'][data-field='"+name+"']").removeAttr('disabled')
    } else {
        alert('Sorry, the minimum value was reached');
        $(this).val($(this).data('oldValue'));
    }
    if(valueCurrent <= maxValue) {
        $(".btn-number[data-type='plus'][data-field='"+name+"']").removeAttr('disabled')
        maxlimit_reached = false;
    } else {
        alert('Sorry, the maximum value was reached');
        //$(this).val($(this).data('oldValue'));
        $(this).val(request_max_value);      
        maxlimit_reached = true;          
    }
    
    
    
});
$(".input-number").keydown(function (e) {        
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 190]) !== -1 ||             
       (e.keyCode == 65 && e.ctrlKey === true) ||              
       (e.keyCode >= 35 && e.keyCode <= 39)) {                 
       return;
}        
if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
    e.preventDefault();
}
});

var master_map;
function initMap(map_id,inputbox) {

    if(typeof map_id == "undefined"){        
        map_id = "map";
        inputbox = "pac-input";        
    }
    
    var map = new google.maps.Map(document.getElementById(map_id), {
      center: {lat: 12.9246, lng: 77.6277},
      zoom: 13
  });

    
    master_map = map;
    deliveryBoysLocation();
    

    var input = document.getElementById(inputbox);

    var types = document.getElementById('type-selector');
    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);

    var infowindow = new google.maps.InfoWindow();
    var marker = new google.maps.Marker({
      map: map,
      anchorPoint: new google.maps.Point(0, -29)
  });

    autocomplete.addListener('place_changed', function() {
      infowindow.close();
      marker.setVisible(false);
      var place = autocomplete.getPlace();   
      
      if(map_id == "map"){           
          storeLocation = place.geometry.location;
          //alert(storeLocation);
       }
    
      delivery_lat = place.geometry.location.lat();
      delivery_lng = place.geometry.location.lng();
      console.log(delivery_lat, delivery_lng);
      gpsSimulator(function(){
        if(data){
            boysInVicinity();
        }
      });
      
      if (!place.geometry) {
        window.alert("Autocomplete's returned place contains no geometry");
        return;
    }

    if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
    } else {
        map.setCenter(place.geometry.location);
        map.setZoom(13);
    }
    marker.setIcon(({
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(35, 35)
    }));
    marker.setPosition(place.geometry.location);
    marker.setVisible(true);

    var address = '';
    if (place.address_components) {
        address = [
        (place.address_components[0] && place.address_components[0].short_name || ''),
        (place.address_components[1] && place.address_components[1].short_name || ''),
        (place.address_components[2] && place.address_components[2].short_name || '')
        ].join(' ');
    }

    infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
    $("#hidden_place").val(place.name);    
    infowindow.open(map, marker);
});

function setupClickListener(id, types) {
  var radioButton = document.getElementById(id);
  radioButton.addEventListener('click', function() {
    autocomplete.setTypes(types);
});
}

setupClickListener('changetype-all', []);
setupClickListener('changetype-address', ['address']);
setupClickListener('changetype-establishment', ['establishment']);
setupClickListener('changetype-geocode', ['geocode']);
}



/**Sweet alert**/
var originalAlert = "<input type=\"text\"  tabindex=\"3\" placeholder=\"Type here\" />"+
"<div class=\"sa-input-error\"></div>";
var modifiedAlert = "";

function assignDelivery(ele){            
    var id = ele.id.split("$")[1]
    //console.log(id);
    modifiedAlert = "<input type=\"text\" tabindex=\"3\" placeholder=\"Type here\" style='display:none'/>"+
    "<div class=\"sa-input-error\"></div>"+
    "<p>"+$("#name_"+id).html()+" | <span id = 'popup_boy_id'>"+$("#boy_id_"+id).html()+"</span></p>" + 
    "<input type=\"text\" tabindex=\"1\" placeholder=\"Order ID\" class='inputValue2' id='store_order_id'>"+    
    "<input type=\"text\" tabindex=\"2\" placeholder=\"Delivery Location\" class='inputValue3' id='delivery_loc'>"+
    "<div id='map_in_popup'></div>";        
    assignDeliveryPopup(id)    
}

function assignDeliveryPopup(id){
    $("#dropdown_anchor_"+id).click();
    $(".sweet-alert > fieldset").html(originalAlert);
    swal({      
    title: "Assign Delivery",   
    text: "",   
    type: "input",   
    showCancelButton: true,   
    closeOnConfirm: true,   
    animation: "slide-from-top",   
    }, 
    function(inputValue){                   
        document.getElementById("collapse_item_order_"+id).innerHTML = $("#store_order_id").val()                
        $("#collapse_item_dest_"+id).html($("#delivery_loc").val())        
        updateDelivery(id,$("#store_order_id").val(),$("#delivery_loc").val())        
        $("#dropdown_anchor_"+id).click();
    });         
    $(".sweet-alert > fieldset").html(modifiedAlert);
    initMap('map_in_popup','delivery_loc')
}

//deliveryBoysLocation();
//Pusher
function deliveryBoysLocation(){
    //Pusher.logToConsole = true;
    var pusher = new Pusher('d94cd30a34fe3e094a04', {
    cluster: 'ap1',
    encrypted: true
});

var channel = pusher.subscribe('lastlocation');
var mylat = 0;
var mylng = 0;
var myid = 0;

channel.bind('data', function(data) {
    mylat = data.message.latitude;
    mylng = data.message.longitude;
    myid = data.message.identifier;
    locationDetails[myid] = mylat + "," + mylng;
    //console.log(locationDetails)
    updateMap(locationDetails)
});

}
var markers = [];
var locations = [];
function updateMap(locationDetails){
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    markers = [];

    locations = [];
    var location = [];
    jQuery.each(locationDetails, function(i, val) {
        location = [i, val.split(",")[0], val.split(",")[1]]
        locations.push(location);                
    });

    //console.log(locations);
    var infowindow = new google.maps.InfoWindow();    
    var marker, i;
    for (i = 0; i < locations.length; i++) {  
        //console.log(locations[i][0]);
        //console.log(master_map);
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),        
        map: master_map,
        title : locations[i][0].toString()
      });
            
      marker.info = new google.maps.InfoWindow({
        content: 'Please'
        });

      google.maps.event.addListener(marker, 'click', function() {
        marker.info.open(map, marker);
        });
      //infowindow.setContent('<div><strong> Id - ' + locations[i][0].toString() + '</strong><br>');          
      markers.push(marker);
    }    
}

setInterval(function(){ boysInVicinity(); }, 1000*60);
setInterval(function(){  calculateETA_3(); }, 1000*10);
setInterval(function(){  calculateETD_3(); }, 1000*15);



function boysInVicinity(){
    var distances = [];
    var boy = {};
    if (typeof storeLocation != "undefined"){
        for (i = 0; i < locations.length; i++) {  
            boyLocation = new google.maps.LatLng(parseFloat(locations[i][1]), parseFloat(locations[i][2]));            
            if (google.maps.geometry.spherical.computeDistanceBetween(boyLocation, storeLocation) < 5000){
                boy[locations[i][0]] = google.maps.geometry.spherical.computeDistanceBetween(boyLocation, storeLocation);
                distances.push(boy);
            }                        
        }
    console.log("There are " + distances.length + " delivery boys in your vicinity");
    $("#available_boys").html(distances.length.toString());
    request_max_value = distances.length;
    }    
}

function updateDelivery(id, order_id, delivery_destination){
    $(".sweet-alert > fieldset").html(originalAlert);
    //console.log($("#id_"+id));
    //console.log(delivery_lat);
    //console.log(delivery_lng);
    //console.log("updateDelivery");
    //console.log("request : " + id.toString().split("_")[0])
    //console.log("boy : " + id.toString().split("_")[1])
    var dateString = new Date(Date.now()).toString();
    dateString = new Date(dateString).toUTCString();
    dateString = dateString.split(' ').slice(0, 5).join(' ')    
    $.ajax({
        type: "POST",
        dataType: "json",
        url:'/boy_requests/updateDelivery',
        data: { "updateDelivery": 
            {
                "id" : parseInt($("#id_"+id).html()),
                "request_id" : parseInt(id.toString().split("_")[0]),
                "boy_id" : parseInt(id.toString().split("_")[1]), 
                "order_id" : parseInt(order_id), 
                "delivery_destination" : delivery_destination,
                "delivery_lat" : delivery_lat.toString(),
                "delivery_lng" : delivery_lng.toString(),
                "delivery_start_time" : dateString
            }
        },        
        success: function(data){            
            //requestsAcceptedByBoys(true)
            swal("Sucess!", "", "success")
            //console.log(data);
        },
        error: function(err){
            //requestsAcceptedByBoys(true)
            //sweetAlert("Oops.", "Something went wrong!", "error");
            //console.log(err);
        }
    });  
}



function calculateETA_3(){
    
    var local_latLng = {};
    if(typeof storeLocation != "undefined"){
        var destination = storeLocation.lat().toString() + ',' + storeLocation.lng().toString();    
        var requests_and_boys = $(".delivery_destination");
        //console.log(requests_and_boys);
        var directionsService = new google.maps.DirectionsService();
        var requests = [];
        var responses = [];
        var count = 0;
        for(var i = 0 ; i < requests_and_boys.length; i++){
            var id = requests_and_boys[i].id;            
            var latLng = locationDetails[id.split("_")[3]];            
            if(typeof latLng != "undefined"){                
            //    console.log("latLng : " +  latLng);
            //var origin = new google.maps.LatLng( 12.9279, 77.6271 );         
            var originLat = parseFloat(latLng.split(",")[0]);
            var originLng = parseFloat(latLng.split(",")[1]);
            //console.log(originLat);
            //console.log(originLng);
            var origin = new google.maps.LatLng(originLat, originLng);         
                var request = {
                    origin: origin, 
                    destination: destination, 
                    travelMode: google.maps.DirectionsTravelMode.DRIVING
                };

                //console.log("outside");
                //console.log(id);
                local_latLng[origin.lat()+","+origin.lng()] = "#eta_"+id.split("_")[2]+"_"+id.split("_")[3];                                
                requests.push("#eta_"+id.split("_")[2]+"_"+id.split("_")[3]);

                    directionsService.route( request, function( response, status ) {                        
                    if ( status === 'OK' ) {                        
                        var point = response.routes[ 0 ].legs[ 0 ];
                        //console.log("inside")

                        //console.log(local_latLng);
                        //console.log(request.origin.lat()+","+request.origin.lng());
                        //console.log( 'Estimated travel time: ' + point.duration.text + ' (' + point.distance.text + ')' );
                        //console.log($("#eta_"+id.split("_")[2]+"_"+id.split("_")[3]));
                        //$("#eta_"+id.split("_")[2]+"_"+id.split("_")[3]).html("ETA - " + point.duration.text + ' (' + point.distance.text + ')');
                        //$(local_latLng[request.origin.lat()+","+request.origin.lng()]).html("ETA - " + point.duration.text + ' (' + point.distance.text + ')');
                        responses.push("ETA - " + point.duration.text + ' (' + point.distance.text + ')');                        
                        count++;
                        console.log(count);
                        console.log(requests.length);
                        if(count == requests.length){                            
                            populateETAs(requests, responses);
                        }
                    }
                } );


            }        
        }

    }    
}


function calculateETD_3(){    
    
    var local_latLng = {};
    var boys_and_deliveries = $(".classHelper_2");
    var directionsService = new google.maps.DirectionsService();
    var requests = [];
    var responses = [];
    count = 0;
    for(var i = 0 ; i < boys_and_deliveries.length; i++){        
        var id = boys_and_deliveries[i].id
        //console.log("#delivery_lat_"+id.split("_")[2]+"_"+id.split("_")[3]);
        var destination = $("#delivery_lat_"+id.split("_")[2]+"_"+id.split("_")[3]).html() + ',' + $("#delivery_lng_"+id.split("_")[2]+"_"+id.split("_")[3]).html();    
        //console.log(destination);
        var latLng = locationDetails[id.split("_")[3]];  
        if(typeof latLng != "undefined"){
            var originLat = parseFloat(latLng.split(",")[0]);
            var originLng = parseFloat(latLng.split(",")[1]);   
            var origin = new google.maps.LatLng(originLat, originLng);         
                var request = {
                    origin: origin, 
                    destination: destination, 
                    travelMode: google.maps.DirectionsTravelMode.DRIVING
                };

                //console.log("outside");
                //console.log(id);
                local_latLng[origin.lat()+","+origin.lng()] = "#delivery_etd_"+id.split("_")[2]+"_"+id.split("_")[3];
                requests.push("#delivery_etd_"+id.split("_")[2]+"_"+id.split("_")[3]);
                
                
                    directionsService.route( request, function( response, status ) {                        
                    if ( status === 'OK' ) {
                        console.log("1");
                        var point = response.routes[ 0 ].legs[ 0 ];
                        //console.log("inside")

                        //console.log(local_latLng);
                        //console.log(request.origin.lat()+","+request.origin.lng());
                        //console.log( 'Estimated travel time: ' + point.duration.text + ' (' + point.distance.text + ')' );
                        //console.log($("#delivery_etd_"+id.split("_")[2]+"_"+id.split("_")[3]));
                        //$("#eta_"+id.split("_")[2]+"_"+id.split("_")[3]).html("ETA - " + point.duration.text + ' (' + point.distance.text + ')');
                        responses.push("ETD - " + point.duration.text + ' (' + point.distance.text + ')');                        
                        count++;
                        if(count == requests.length){
                            populateETAs(requests, responses);
                        }
                    }
                } );
         
        }          
    }    
}

function bindEvent(){
    $("#request_delivery_status li a").click(function(){     

      $($(this).parent().parent().parent()).text($(this).text());
      $($(this).parent().parent().parent()).val($(this).text());
      if($(this).text() == "Completed"){        
        $(this).closest('div.track_request_heading').css( "background-color", "aquamarine" );
      }
      else{
        $(this).closest('div.track_request_heading').css( "background-color", "white" );
      }
   });
   $("#delivery_status li a").click(function(){    
      $($(this).parent().parent().parent()).text($(this).text());
      $($(this).parent().parent().parent()).val($(this).text());
      if($(this).text() == "Completed"){
        console.log($(this).closest('div.track_request_details'));
        $(this).closest('div.track_request_details').css( "background-color", "aquamarine" );
      }
      else{
        $(this).closest('div.track_request_details').css( "background-color", "white" );
      }
   });
   
}
 
function populateETAs(requests, responses){
    console.log(requests);
    console.log(responses);
    
    for(var i = 0 ; i < requests.length; i++){   
        
        $(requests[i]).html(responses[i]);
        
    }
}

function gpsSimulator(callback){
    var url = "https://boiling-island-46905.herokuapp.com/go";
    $.ajax({
        type: "GET",
        dataType: "json",
        url: url,
        crossDomain: true,
        data: { "latitude": delivery_lat,
            "longitude"  : delivery_lng           
        },        
        success: function(data){    
            console.log(data);   
            data = JSON.parse(data);            
            locationDetails = data;
            return callback(true);  
        },
        error: function(err){
            return callback(false); 
        }
    });  

}