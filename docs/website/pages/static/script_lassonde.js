let startLat = 0.00;
let startLng = 0.00;
let currentLat = startLat;
let currentLng = startLng;

window.onload = () => { 
    const button = document.querySelector('button[data-action="change"]');
    button.innerText = '?';
    
    let places = loadPlaces();
    renderPlaces(places);
    console.log('Hello');

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position=> {
                startLng = position.coords.longitude;
                startLat = position.coords.latitude;
                console.log(`Lat ${startLat} Lon ${startLng}`);
            },
            err=> {
                alert(`An error occurred: ${err.code}`);
            },
        ); 
    } else {
        alert("Sorry, geolocation not supported in this browser");
    }

    startLat = 43.773598;
    startLng = -79.505281;

};

function getPosition() {
    
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position=> {
                currentLng = position.coords.longitude;
                currentLat = position.coords.latitude;
                console.log(`Lat ${position.coords.latitude} Lon ${position.coords.longitude}`);
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
        }
    ]
}


function loadPlaces() {
    return [ 
        {
            name: 'Lassonde Building',
            location: { 
                lat: 43.773598,
                lng: -79.505281,
            },
            url: '../../assets/models/LassondeBuilding.gltf',
            info: {
                short: 'Name: Lassonde Building LSA (formerly Computer Science & Engineering Building)',
                loc: 'Location: 120 Campus Walk',
                hour: 'Operating Hours: Building operating hours: 7:00am to 9:00pmMonday to Friday, weekends building is locked 24hr',
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
        model.setAttribute('rotation', '0 180 0');
        model.setAttribute('animation-mixer', '');
        model.setAttribute('scale', '0.1 0.1 0.1');
        model.setAttribute('name', place.name);
        model.setAttribute('info', '')

        model.addEventListener('loaded', () => {
            window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))//, { detail: { component: this.el }}))
        });
        //if (getPosition() != 'lat: 43.773598, lng: -79.505281,') {
            document.querySelector('button[data-action="change"]').addEventListener('click', function () {
                var el = document.querySelector('[gps-entity-place]');
                var newIdx = infoIdx % 3;

                const distance = document.querySelector('[gps-entity-place]').getAttribute('distance');

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
        //} else {
        //    div.innerText = ' ';
        //}

        scene.appendChild(model);
    });
}
