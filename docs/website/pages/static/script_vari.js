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

    startLat = 43.773071;
    startLng = -79.503404;

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
            name: 'Vari Hall',
            location: {
               lat: 43.773071,
               lng: -79.503404,
            },
            url: '../../assets/models/VariHall.gltf',
            info: {
                short: 'Name: Vari Hall<br>adorned with yellow brick and two lower rectangular structures extending from its sides<br>Vari Hall is a well-designed and extraordinary space.',
                loc: 'The building was constructed in 1992<br>named after one of York Universitys benefactors George Vari (1923-2010)',
                hour: 'The Sociology Common Room (2101 Vari Hall) and the Ernest Lilienstein Library (2094 Vari Hall)<br>are open from 8:30 a.m. to 4:30 p.m. on weekdays',
            },
        }
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
        let location = place.info.loc
        let hours = place.info.hour;
       
        let model = document.createElement('a-entity');
        model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
        model.setAttribute('gltf-model', places.url);
        model.setAttribute('rotation', '0 180 0');
        model.setAttribute('animation-mixer', '');
        model.setAttribute('scale', '0.05 0.05 0.05');
        model.setAttribute('name', place.name);
        model.setAttribute('info', '')

        model.addEventListener('loaded', () => {
            window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))//, { detail: { component: this.el }}))
        });

        document.querySelector('button[data-action="change"]').addEventListener('click', function () {
            var el = document.querySelector('[gps-entity-place]');
            var newIdx = infoIdx % 3;

            if (newIdx === 1) {
                el.setAttribute('info', {event: 'updateInfo', message: shorthand});
                el.emit('updateInfo');
                div.innerText = shorthand;
            } else if (newIdx === 2)  {
                el.setAttribute('info', {event: 'updateInfo', message: location});
                el.emit('updateInfo');
                div.innerText = location;
            } else {
                el.setAttribute('info', {event: 'updateInfo', message: hours});
                el.emit('updateInfo');
                div.innerText = hours;
            }
            
            infoIdx++;

        });

        scene.appendChild(model);
    });
}