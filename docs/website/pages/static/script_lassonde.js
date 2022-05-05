let startLat, startLng, currentLat, currentLng;
let places;
const LAT_LONG_SECOND = 1/60/60;
const FEET_PER_LAT_SECOND = 101;
const FEET_PER_LONG_SECOND = 80;
const DISTANCE_IN_FEET = 100; // distance for object to appear

window.onload = () => { 
    const button = document.querySelector('button[data-action="change"]');
    button.innerText = '?';
    
    getStartingPosition();
    updatePosition(); 
    
    places = loadPlaces();
    console.log('Hello');
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

                    if (latFeet <= DISTANCE_IN_FEET && longFeet <= DISTANCE_IN_FEET) {
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
            {
                enableHighAccuracy: true
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
            url: 'https://robots-make-art-too.github.io/Group4_YU-Navigation-Map/website/assets/models/LassondeBuilding.gltf',
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
function renderPlace(place) {
    let scene = document.querySelector('a-scene');
    let div = document.querySelector('.instructions');

    let shorthand = place.info.short;
    let location = place.info.loc;
    let hours = place.info.hour;
    
    let model = document.createElement('a-entity');
    model.id = place.id;
    model.setAttribute('gltf-model', place.url);
    model.setAttribute('rotation', '0 90 0');
    model.setAttribute('animation-mixer', '');
    model.setAttribute('scale', '0.05 0.05 0.05');
    model.setAttribute('name', place.name);
    model.setAttribute('info', '');
    model.setAttribute('position', '0 0 -20');

    document.querySelector('button[data-action="change"]').addEventListener('click', function () {
        var el = document.getElementById(model.id);
        var newIdx = infoIdx % 3;

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

    scene.appendChild(model);
}
