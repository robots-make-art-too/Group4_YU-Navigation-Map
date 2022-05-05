let startLat;
let startLng;
let places
const LAT_LONG_SECOND = 1/60/60;
const FEET_PER_LAT_SECOND = 100;
const FEET_PER_LONG_SECOND = 75;
let currentLat = startLat;
let currentLng = startLng;

window.onload = () => {
    const button = document.querySelector('button[data-action="change"]');
    button.innerText = '?';

    getStartingPosition();
    let coordsGPS = updatePosition();
    /*
    startLat = coordsGPS.lat;
    startLng = coordsGPS.long;
    
    console.log(coordsGPS);
    console.log(startLat);
    console.log(startLng);
    */
    places = loadPlaces();
    //    renderPlaces(places);
    console.log('Hello');

    //     currentLat = startLat;
    //     currentLng = startLng;

    //     startLat = 43.773598;
    //     startLng = -79.505281;

};

function updatePosition() {
    
    if(navigator.geolocation) {
        navigator.geolocation.watchPosition(
            position=> {
                currentLng = position.coords.longitude;
                currentLat = position.coords.latitude;
                console.log(`Current Lat ${position.coords.latitude} Lon ${position.coords.longitude}`);
 
                places.forEach(place => {
                    let latFromPlace = Math.abs(currentLat - place.location.lat);
                    let longFromPlace = Math.abs(currentLng - place.location.lng);
 
                    let latSeconds = latFromPlace / LAT_LONG_SECOND;
                    let longSeconds = longFromPlace / LAT_LONG_SECOND;
                    let latFeet = latSeconds * FEET_PER_LAT_SECOND;
                    let longFeet = longSeconds * FEET_PER_LONG_SECOND;
 
                    if (latFeet <= 15 && longFeet <= 15) {
                        console.log("In range!");
                        renderPlace(place);
                    } else {
                        console.log("Not in range");
                    }
                });
            },
            err=> {
                console.error('Error in retreiving position', err);
            },
            {
                enableHighAccuracy: true
            },
        ); 
    } else {
        alert("Sorry, geolocation not supported in this browser");
    }
};

function getStartingPosition() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                startLat = position.coords.latitude;
                startLng = position.coords.longitude;
                console.log(`Starting: Lat ${startLat} Lon ${startLng}`);
            },
            err => {
                console.error('Error in retreiving position', err);
            },
        );
    } else {
        alert("Sorry, geolocation not supported in this browser");
    }
}


function loadPlaces() {
    return [
        {
            name: 'Lassonde Building',
            id: 'lassonde-building',
            location: {
                lat: 43.773598,
                lng: -79.505281,
            },
            url: 'https://raw.githack.com/robots-make-art-too/Group4_YU-Navigation-Map/dev_Jason_Lu/docs/website/assets/models/LassondeBuilding.gltf',
            info: {
                short: 'Name: Lassonde Building LSA (formerly Computer Science & Engineering Building)',
                loc: 'Location: 120 Campus Walk',
                hour: 'Building operating hours: 7:00am to 9:00pmMonday to Friday, weekends building is locked 24hr',
            },
        },
    ]
};

var infoIdx = 0;
function renderPlaces(places) {
    let scene = document.querySelector('a-scene');
    let div = document.querySelector('.instructions');

    let latitude = place.location.lat;
    let longitude = place.location.lng;
    let shorthand = place.info.short;
    let location = place.info.loc;
    let hours = place.info.hour;

    let model = document.createElement('a-entity');
    model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
    model.setAttribute('gltf-model', place.url);
    model.setAttribute('rotation', '0 90 0');
    model.setAttribute('animation-mixer', '');
    model.setAttribute('scale', '0.05 0.05 0.05');
    model.setAttribute('name', place.name);
    model.setAttribute('info', '');
    model.setAttribute('position', '0 0 -20');

    //         if (getPosition() != 'lat: 43.773598, lng: -79.505281,') {
    console.log(`GPS CHECK -- current: Lat ${currentLat} Lon ${currentLng} ::: start: Lat ${startLat} Lon ${startLng} ::: check: ${check.lat} ${check.long}`);

    document.querySelector('button[data-action="change"]').addEventListener('click', function () {
        var el = document.querySelector('[gps-entity-place]');
        var newIdx = infoIdx % 3;

        const distance = el.getAttribute('distance');
        console.log(distance);
        const distanceMsg = document.querySelector('[gps-entity-place]').getAttribute('distanceMsg');
        console.log(distanceMsg);

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
    });

    model.addEventListener('loaded', () => {
        window.dispatchEvent(new CustomEvent('gps-entity-place-loaded', { detail: { component: this.el } }))
    });
    scene.appendChild(model);
}
