window.onload = () => { 
    let places = staticLoadPlaces(); 
    renderPlaces(places);
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
        model.setAttribute('lassonde-model', 'https://raw.githack.com/robots-make-art-too/Group4_YU-Navigation-Map/dev_Yuqing_Guo/VariHall.gltf');
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
}
*/

function switchInfo() {
    document.createElement('a-text');
    info.setAttribute('value', 'Lassonde Building LSA (formerly Computer Science & Engineering Building<br>120 Campus Walk<br>Building operating hours: 7:00am to 9:00pmMonday to Friday, weekends building is locked 24hr');
    info.setAttribute('scale', '0, 0, 0');
    info.setAttribute('gps-entity-place', 'latitude: 43.773598; longitude: -79.505281;')
}

//front right: 43.7732726310504, -79.50319706654061
//front left: 43.77303392274091, -79.50309514260621
//back right: 43.7732217906181, -79.50342170152756
//back left: 43.77300390256152, -79.50332581256298

AFRAME.registerComponent('clickModel', {
    init: function () {
      var model = document.getElementById('VariHall');

      model.addEventListener('click', function () {
        
      }, false);
    }
  }); 
  //test
