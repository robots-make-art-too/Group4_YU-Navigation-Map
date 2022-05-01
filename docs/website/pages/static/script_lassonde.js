let startLat = 0.00;
let startLng = 0.00;
let currentLat = startLat;
let currentLng = startLng;

window.onload = () => { 
    const button = document.querySelector('button[data-action="change"]');
    button.innerText = '?';
    
    let coordsGPS = getPosition();
    startLat = coordsGPS.lat;
    startLng = coordsGPS.long;
    
    let places = loadPlaces();
    renderPlaces(places);
    
    console.log(coordsGPS);
    console.log(startLat);
    console.log(startLng);

//     currentLat = startLat;
//     currentLng = startLng;

//     startLat = 43.773598;
//     startLng = -79.505281;

};

function getPosition() {
    
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position=> {
                currentLng = position.coords.longitude;
                currentLat = position.coords.latitude;
                console.log(`start lat: ${currentLat} long: ${currentLng}`);
            },
            err=> {
                console.error('Error in retreiving position', err);
            },
        ); 
    } else {
        alert("Sorry, geolocation not supported in this browser");
    }

    return [
        {
            lat: currentLat,
            long: currentLng,
        },
    ]
};

function loadPlaces() {
    return [ 
        {
            name: 'Lassonde Building',
            location: { 
                lat: 43.773598,
                lng: -79.505281,
            },
            url: 'https://raw.githack.com/robots-make-art-too/Group4_YU-Navigation-Map/dev_Jason_Lu/docs/website/assets/models/LassondeBuilding.gltf',
            info: {
                short: 'Name: Lassonde Building LSA (formerly Computer Science & Engineering Building)',
                loc: 'Location: 120 Campus Walk',
                hour: 'Building operating hours: 7:00am to 9:00pmMonday to Friday, weekends building is locked 24hr',
                blank: ' '
            },
        },
    ]
};

var infoIdx = 0;
function renderPlaces(places) {
    let scene = document.querySelector('a-scene');
    let div = document.querySelector('.instructions');
    
    places.forEach((place) => {
        let latitude = place.location.lat;
        let longitude = place.location.lng;
        let shorthand = place.info.short;
        let location = place.info.loc;
        let hours = place.info.hour;
        let blank = place.info.blank;
       
        let model = document.createElement('a-entity');
        model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
        model.setAttribute('gltf-model', place.url);
        model.setAttribute('rotation', '0 90 0');
        model.setAttribute('animation-mixer', '');
        model.setAttribute('scale', '0.05 0.05 0.05');
        model.setAttribute('name', place.name);
        model.setAttribute('info', '');
        model.setAttribute('position', '0 0 -20');

        model.addEventListener('loaded', () => {
            window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))//, { detail: { component: this.el }}))
        });
        let check = getPosition();
//         if (getPosition() != 'lat: 43.773598, lng: -79.505281,') {
        if(check) {    
           console.log(`GPS CHECK -- current: Lat ${currentLat} Lon ${currentLng} ::: start: Lat ${startLat} Lon ${startLng} ::: check: ${check.lat} ${check.long}`);
            
            document.querySelector('button[data-action="change"]').addEventListener('click', function () {
                var el = document.querySelector('[gps-entity-place]');
                var newIdx = infoIdx % 3;

                const distance = el.getAttribute('distance');
                console.log(distance);

                if (distance < 10) {
                    if (newIdx === 1) {
                        el.setAttribute('info', { event: 'updateInfo', message: shorthand });
                        el.emit('updateInfo');
                        div.innerText = shorthand;
                    } else if (newIdx === 2) {
                        el.setAttribute('info', { event: 'updateInfo', message: location });
                        el.emit('updateInfo');
                        div.innerText = location;
                    } else {
                        el.setAttribute('info', { event: 'updateInfo', message: hours });
                        el.emit('updateInfo');
                        div.innerText = hours;
                    }

                    infoIdx++;
                }
                else {
                    el.setAttribute('info', { event: 'updateInfo', message: blank });
                    el.emit('updateInfo');
                    div.innerText = blank;
                }
            });
        } else {
           div.innerText = ' ';
        }

        scene.appendChild(model);
    });
}
