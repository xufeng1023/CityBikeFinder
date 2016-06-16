if (navigator.geolocation) {
	var mapDiv = $('#mapDiv')[0];
	var infowindow = null;
	var markers = [];
	var map = new google.maps.Map(mapDiv, {zoom:15});
	function showPosition(position) {
		var coords = position.coords;
		var center = new google.maps.LatLng(coords.latitude,coords.longitude);
		var mapOptions = {
			center: center,
        	styles: [
          		{
            		featureType: "poi",
            		stylers: [
              			{ visibility: "off" }
            		]
          		}
        	],
        	mapTypeControl: false
        };
        map.setOptions(mapOptions);
  		var me = new google.maps.Marker({
	  		position:center,
	  		animation:google.maps.Animation.BOUNCE
	  	});
		me.setMap(map);
		var CenterControl = function(controlDiv, map) {
	  							// Set CSS for the control border.
	  							var controlUI = document.createElement('div');
							  	controlUI.style.backgroundColor = '#fff';
							  	controlUI.style.borderRadius = '2px';
							  	controlUI.style.boxShadow = '0 1px 4px rgba(0,0,0,0.3)';
							  	controlUI.style.cursor = 'pointer';
							  	controlUI.style.width = '29px';
							  	controlUI.style.height = '29px';
							  	controlUI.style.marginRight = '10px';
							  	controlUI.style.textAlign = 'center';
							  	controlUI.title = 'Click to recenter the map';
							  	controlDiv.appendChild(controlUI);
							  	// Set CSS for the control interior.
							  	var controlText = document.createElement('div');
							  	controlText.style.color = 'rgb(25,25,25)';
							  	controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
							  	controlText.style.fontSize = '16px';
						 	 	controlText.style.lineHeight = '38px';
							  	controlText.style.paddingLeft = '5px';
							  	controlText.style.paddingRight = '5px';
							  	controlText.innerHTML = '<span class="glyphicon glyphicon-user"></span>';
							  	controlUI.appendChild(controlText);
							  	// Setup the click event listeners: simply set the map to Chicago.
							  	controlUI.addEventListener('click', function() {
							    	map.panTo(center);
							  	});
							};
		var centerControlDiv = document.createElement('div');
		var centerControl = new CenterControl(centerControlDiv, map);
		centerControlDiv.index = 1;
		map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(centerControlDiv);
	}
	function showError(error) {
	    switch(error.code) {
	        case error.PERMISSION_DENIED:
	            mapDiv.innerHTML = "User denied the request for Geolocation."
	            break;
	        case error.POSITION_UNAVAILABLE:
	            mapDiv.innerHTML = "Location information is unavailable."
	            break;
	        case error.TIMEOUT:
	            mapDiv.innerHTML = "The request to get user location timed out."
	            break;
	        case error.UNKNOWN_ERROR:
	            mapDiv.innerHTML = "An unknown error occurred."
	            break;
	    }
	}       
	function setMapOnAll(map) {
  		for (var i = 0; i < markers.length; i++) {
	    	markers[i].setMap(map);
  		}
	}
	navigator.geolocation.getCurrentPosition(showPosition, showError);
    (function loadMap() {
    	$.ajax('/getfeeds', {
    		dataType: 'json',
    		error: function() {
    			location.assign('/login');
    		},
    		success: function(data) {
				$.each(data.stationBeanList, function(index, val) {
					var marker = new google.maps.Marker({
				  		position: new google.maps.LatLng(val.latitude, val.longitude),
				  		map: map,
				  		icon: {
					    	url:'images/redspot.png',
					  	}
				  	});
				  	markers.push(marker);
			  		google.maps.event.addListener(marker, 'click', function() {
			  			if(infowindow) infowindow.close();
				  		$.ajax('/getonefeed/'+val.id, {
				  			dataType: 'json',
				  			error: function() {
				    			location.assign('/login');
				    		},
				  			success: function(data) {
				  				var infoContent = '<div>';
				  				infoContent += '<h4 class="text-primary">'+data.stationName+'</h4>';
				  				infoContent += '<div>';
				  				infoContent += '<p><strong>Total Docks: </strong>'+data.totalDocks+'</p>';
				  				infoContent += '<p><strong>Available Bikes: </strong>'+data.availableBikes+'</p>';
				  				infoContent += '<p><strong>Available Docks: </strong>'+data.availableDocks+'</p>';
				  				infoContent += '<p class="text-muted">Last Update: '+data.lastCommunicationTime+'</p>';
								infoContent += '</div></div>';
								infowindow = new google.maps.InfoWindow({
							  		content: infoContent
							  	});
						  		infowindow.open(map,marker);
					  		}
				  		});
				  	});
				});
			},
			complete: function() {
				if(map == null) navigator.geolocation.getCurrentPosition(showPosition, showError);
				if(markers.length > 0) setMapOnAll(map);
			}
		});
	})();
} else mapDiv.innerHTML = "Geolocation is not supported by this browser.";