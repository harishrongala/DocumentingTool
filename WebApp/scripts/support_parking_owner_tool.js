// Global variables

	var user_marker="";
	var cen_lat="";
	var cen_lon="";
	var chkin="";
	var chkout="";
	var fil_setting="";
	var map;
	var pointer_lat;
	var pointer_lng;
	var pointer_user;
	newmarkers=[];
	oldmarkers=[];
	markers=[];
	buffer=[];
	stat=false;
	var popup;

// Global variables end

// Get the geolocation
	function geolocation()
	{
		if(navigator.geolocation){
			var opt={
				enableHighAccuracy: true,
				timeout: Infinity,
				maximumAge: 0
			};
			navigator.geolocation.getCurrentPosition(load);
		}
	}

// Map Initializer
	function load(position){
		cen_lat=position.coords.latitude;
		cen_lon=position.coords.longitude;
		var google_latlon= new google.maps.LatLng(cen_lat,cen_lon);
		map = new google.maps.Map(document.getElementById('map'),
		{
			center: google_latlon,
			zoom: 18,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			zoomControl: false,
			mapTypeControl: false,
			scaleControl: false,
			streetViewControl: false,
			rotateControl: false,
			fullscreenControl: false
    });

		center_marker= new google.maps.Marker({
				position: map.center,
				map: map,
				icon: "images/center_car.png",
				draggable: true
		});
		center_marker.addListener('click',show_addparking_modal);
		map.addListener('bounds_changed', update_center);
		markers=[];
		buffer=[];
		pointer_user=$('#getuserid').val();
		get_owner_spaces();

		//setInterval(ping,200);
	}

	function update_center(){
		center_marker.setPosition(map.getCenter());
		cen_lat=map.getCenter().lat();
		cen_lon=map.getCenter().lng();
	}

// On click "Reserve" in the modal
function ajax_reservation()
{
	console.log($('#spaceid_modal').html());
	console.log($('#checkin_modal').html());
	console.log($('#checkout_modal').html());
	console.log($('#address_modal').html());
	console.log($('#duration_modal').html());
}

function show_help()
{
	$('#helpModal').modal();
}


function showmodal(ob){
pointer_user;
pointer_lat=ob.latLng.lat();
pointer_lng=ob.latLng.lng();
$.post("./support/get_space_details.php",{user:pointer_user,lat:pointer_lat,lng:pointer_lng},function (result){
	result=$.parseJSON(result);
	$('#rmspaceid_modal').html(result[0].space_id);
	$('#rmaddress_modal').html(result[0].address);
	var pic="./user_images/"+result[0].picture;
	$('#parking_space_image').attr('src',pic);
	var duration_val="$"+result[0].price;
	$('#rmmax_modal').html(duration_val);
});
	$('#removeModal').modal();
}

function remove_parkingspace()
{
	$.post("./support/remove_parkingspace.php",{user:pointer_user,lat:pointer_lat,lng:pointer_lng},function(data){
		$('#removeModal').modal('hide');
		get_owner_spaces();

	});

}

function show_addparking_modal(obj)
{
	console.log(obj);
	pointer_lat=obj.latLng.lat();
	pointer_lng=obj.latLng.lng();
	$('#myModal').modal();
}



//// Testing new algorithm


	function just_create_markers_from_view(result)
	{
		//stat=false;
		var obj=$.parseJSON(result);
		var len=obj.length;
		var i=0;
		newmarkers=[];
		while(i<len)
		{
			var lat=obj[i].lat;
			var lon=obj[i].lon;
			var google_latlon= new google.maps.LatLng(lat,lon);
			var nmarker = new google.maps.Marker(
			{
				position: google_latlon,
				title: "Your parking space",
				id: obj[i].space_id
			});
			google.maps.event.addListener(nmarker,'click',showmodal);
			newmarkers.push(nmarker);
			i++;
		}
		return(newmarkers);
	}

function get_markers(result)
{
	if(markers.length>0)
	{
		for(var i=0;i<markers.length;i++)
		{
			markers[i].setMap(null);
		}
		markers=[];
	}
	markers=just_create_markers_from_view(result);
	for(var i=0;i<markers.length;i++)
	{
		markers[i].setMap(map);
	}
}



// On submitting add parking modal
$(document).ready(function (e) {
$("#addparkingform").submit(function(e) {
e.preventDefault();
var fmdata=new FormData(this);
fmdata.append('userid',pointer_user);
fmdata.append('lat',pointer_lat);
fmdata.append('lng',pointer_lng);
$.ajax({
url: "./support/uploadparkingspace.php",
type: "POST",
data: fmdata,
contentType: false,
cache: false,
processData:false,
success: function(data)
{
$('#myModal').modal('hide');
get_owner_spaces();
}
});
});
});


// This is executed on pressing
// "Locate me" on the map
function recenter_map()
{
	if(navigator.geolocation){
		var opt={
			enableHighAccuracy: true,
			timeout: Infinity,
			maximumAge: 0
		};
		navigator.geolocation.getCurrentPosition(recentering);
	}
}

function recentering(position){
	cen_lat=position.coords.latitude;
	cen_lon=position.coords.longitude;
	var updated_latlon= new google.maps.LatLng(cen_lat,cen_lon);
	map.setCenter(updated_latlon);
	// get or post to update view on center change
	//update_center();

}

// Handle Keypress - Enter of Searchbar
$(document).ready(function()
{
	$("#searchtext").keyup(function(event)
	{
	    if(event.keyCode == 13){
				handle_geocoding();
				$("#notify_here").html($("#searchtext").val());

	    }
	})
});



// This creates view as per user input
function get_owner_spaces()
{
	$.post("./support/retrieve_owner_spaces.php",{userid: pointer_user},function(data){get_markers(data);});
}


// Geo coding support

	function handle_geocoding(){
	  var url="https://maps.googleapis.com/maps/api/geocode/json";
		// In tinker search_text is searchtext
	  var inp_address=document.getElementById("searchtext").value;
	  $.get(url,{address:inp_address,key:"AIzaSyCjMCVGz3TlmuKFuwQ-H7-ORIQQlZ6s2mA"},function(data){han(data);});
	  }

	function han(data){
	  if(data.status!="OK"){
	    alert("Try to be more specific");
	  }
	  if(data.status=="OK") {
	  var geo_lat=data.results[0].geometry.location.lat;
	  var geo_lng=data.results[0].geometry.location.lng;
		map.setCenter({lat:geo_lat,lng:geo_lng});
	}
	}

	// end of geo coding support file

function center_clicked()
{
	var ltn_lng={lat:center_marker.getPosition().lat(), lng:center_marker.getPosition().lng()};
	reverse_geocode(ltn_lng);
}

// Reverse geocoding support

function reverse_geocode(ltn_lng)
{
	//alert("got in geocoder "+ltn_lng);
	var geocoder=new google.maps.Geocoder;
	geocoder.geocode({'location':ltn_lng},function(results, status){
		if(status ==='OK')
		{
			alert(results[1].formatted_address);
		}
	})

}
