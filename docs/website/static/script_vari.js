window.onload = () => { 
    let places = staticLoadPlaces(); 
    renderPlaces(places);

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition (
                gpspos=> {
                    console.log(`Lat ${gpspos.coords.latitude} Lon ${gpspos.coords.longitude}`); 
                },
                err=> {
                    alert(`An error occurred: ${err.code}`);
                }
            );
    } else {
        alert("Sorry, geolocation not supported in this browser");
    }
};

function staticLoadPlaces() { 
   return [ 
       {
            name: 'VariHall', 
            location: { 
                lat: 43.773071,
                lng: -79.503404,
            }
       }
   ];
}

function renderPlaces(places) {
    let scene = document.querySelector('a-scene');

    places.forEach((place) => {
        let latitude = place.location.lat;
        let longitude = place.location.lng;

        let model = document.createElement('a-entity');
        model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
        model.setAttribute('vari-model', './assets/models/VariHall.gltf');
        model.setAttribute('rotation', '0 180 0');
        model.setAttribute('animation-mixer', '');
        model.setAttribute('scale', '0.5 0.5 0.5');

        model.addEventListener('loaded', () => {
            window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
        });

        scene.appendChild(model);
    });
}
/*
function infoLassonde() {
    var cameraModel = document.getElementById('camera').object3D.getWorldPosition();
    var cameraLocation = cameraModel.querySelector('gps-entity-place');
    var cameraLat = cameraLocation.querySelector('latitude');
    var cameraLong = cameraLocation.querySelector('longitude');

    let info = document.createElement('a-text');
    info.setAttribute('value', 'Lassonde Building LSA (formerly Computer Science & Engineering Building<br>120 Campus Walk<br>Building operating hours: 7:00am to 9:00pmMonday to Friday, weekends building is locked 24hr');
    info.setAttribute('scale', '0, 0, 0');
    info.setAttribute('gps-entity-place', 'latitude: 43.773598; longitude: -79.505281;')

    if (cameraLat < 43.7732726310504 && cameraLat > 43.77300390256152 && cameraLong > -79.50342170152756 && cameraLong < -79.50309514260621){
        info.setAttribute('scale', '20, 20, 20');
    }
    //front right: 43.7732726310504, -79.50319706654061
    //front left: 43.77303392274091, -79.50309514260621
    //back right: 43.7732217906181, -79.50342170152756
    //back left: 43.77300390256152, -79.50332581256298
}
*/
function switchInfo(message) {
    let info = document.createElement('a-text');
    info.setAttribute('value', message);
    info.setAttribute('scale', '0, 0, 0');
    info.setAttribute('gps-entity-place', 'latitude: 43.773598; longitude: -79.505281;')
}

number = 0;
AFRAME.registerComponent('accepts-clicks', {
    init: function() {
      this.el.addEventListener('touchend', handleClickEvent);
      this.el.addEventListener('click', handleClickEvent);
    },
    tick: function() {
        if (number == 3) {
            number = 0;
        }
        cycleMessages(number);
    }
  });


  function cycleMessages(number) {
    if (number == 0) {
        return "Name: Lassonde Building LSA (formerly Computer Science & Engineering Building"
    } else if (number == 1) {
        return "Loacation: 120 Campus Walk"
    } else if (number == 2) {
        return "Building operating hours: 7:00am to 9:00pmMonday to Friday, weekends building is locked 24hr"
    }
  }

function handleClickEvent() {
        number = number + 1;
}

tools.forEach(function(tool){
    var toolMarker = document.querySelector("#" + tool.name + "-marker");
    if (toolMarker && toolMarker.object3D.visible) {
      toggleConvoBubble(tool.dialogue);
      if (!gamerState.hasCharacterTool(tool)) gamerState.addTool(tool);
    }
  });
