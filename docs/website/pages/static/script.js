window.onload = () => { 
    const button = document.querySelector('button[data-action="change"]');
    button.innerText = '?';
    
    var currentLat = 43.773598; //0.00
    var currentLng = -79.505281; //0.00

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position=> {
                console.log(`Lat ${position.coords.latitude} Lon ${position.coords.longitude}`); // show on the console
                currentLng = position.coords.longitude;
                currentLat = position.coords.latitude;
            },
            err=> {
                alert(`An error occurred: ${err.code}`);
            }
        );
    } else {
        alert("Sorry, geolocation not supported in this browser");
    }

    let places = loadPlaces();
    renderPlaces(places);
    console.log('Hello');
    
};


function loadPlaces(position) {
    currentLng = position.coords.longitude;
    currentLat = position.coords.latitude;
    console.log(`Lat ${position.coords.latitude} Lon ${position.coords.longitude}`);

    let params = {
        radius: 10, //meters
    }
    currentLat = 0.00
    if (currentLat === 0.00) {
        return [ 
            {
            name: 'Lassonde Building',
            location: { 
                lat: 43.773598,
                lng: -79.505281,
                },
            url: '../../assets/models/LassondeBuilding.gltf',
            info: {
                short: 'LSB',
                loc: 'here LSB',
                hour: 'time LSB',
                },
            }
       ]
    } else {
        return [
            {
            name: 'Vari Hall',
            location: {
               lat: 43.773071,
               lng: -79.503404,
                },
            url: '../../assets/models/VariHall.gltf',
            info: {
                short: 'VH',
                loc: 'here VH',
                hour: 'time VH',
                },
            }
        ]
    }      
};

var infoIdx = 0;
function renderPlaces(places) {
    let scene = document.querySelector('a-scene');
    
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
        model.setAttribute('scale', '0.5 0.5 0.5');
        model.setAttribute('name', place.name);

        model.addEventListener('loaded', () => {
            window.dispatchEvent(new CustomEvent('gps-entity-place-loaded', { detail: { component: this.el }}))
        });

        document.querySelector('button[data-action="change"]').addEventListener('click', function () {
            var entity = document.querySelector('[gps-entity-place]');
            const div = document.querySelector('.instructions');
            var newIdx = infoIdx % length(place.info);
            div.innerText = place.info[newIdx];
            infoIdx++;
        });

        scene.appendChild(model);
    });
}

//function infoLassonde() {
    //<a-text value="Sample Test of Text."  scale="40 40 40" gps-entity-place="latitude: 51.0493; longitude: -0.7238;"></a-text>
    //var p = document.getElementById('mydata');
    //p.innerHTML = '<p>Lassonde Building LSA (formerly Computer Science & Engineering Building<br>120 Campus Walk<br>Building operating hours: 7:00am to 9:00pmMonday to Friday, weekends building is locked 24hr</p>';
    //let info = document.createElement('a-text');
    //info.setAttribute('value', 'Lassonde Building LSA (formerly Computer Science & Engineering Building<br>120 Campus Walk<br>Building operating hours: 7:00am to 9:00pmMonday to Friday, weekends building is locked 24hr');
    //info.setAttribute('scale', '20, 20, 20');
    //info.setAttribute('gps-entity-place', 'latitude: 43.773598; longitude: -79.505281;')
//}

// 
