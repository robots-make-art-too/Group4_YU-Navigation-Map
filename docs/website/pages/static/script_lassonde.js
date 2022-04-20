window.onload = () => { //when the window loads in the browser
    const button = document.querySelector('button[data-action="change"]');
    button.innerText = 'Lassonde - click for more info';
    let places = staticLoadPlaces(); //create a variable called places, and let it be the staticLoadPlaces fuction
    renderPlaces(places);
};

function staticLoadPlaces() { //a function called staticLoadPlaces
   return [ //immediately returns and array that contains several keys which points to information regarding the "place"
       {
            name: 'LassondeBuilding', //has the name of the place be MyModel
            location: { //location is contains two other keys lat(latitude) and lng(longitude)
               //lat is a key that points towards your hard coded latitude value
               //lng is a key that points towards your hard coded longitude value
               lat: 43.773598,
               lng: -79.505281,
            },
       }
   ];
}
var infoIdx = 0;
var info = [
    { info: 'one', },
    { info: 'two', },
    { info: 'three', },
];

function renderPlaces(places) {
    let scene = document.querySelector('a-scene');//make a variable called scene and is the first element within the document that has the 'a-scene tag'

    places.forEach((place) => {//loops though each place once
        let latitude = place.location.lat;//assigns latitude to the place's lat
        let longitude = place.location.lng;//assigns longitude to the place's lng
       
        let model = document.createElement('a-entity');//create a variable called model with the tag name a-entity
        model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);//creates a new attribute called gps-entity-place and has the values of latitude and longitude that was assigned a few lines above
        model.setAttribute('gltf-model', './assets/models/LassondeBuilding.gltf');//creates a new attribute called gltf-model and has the value of the local path to the file scene.gltf
        model.setAttribute('rotation', '0 180 0');//creates a new attribute called rotation, and give it the value of 0.5x, 180y, and 0z
        model.setAttribute('animation-mixer', '');//creates a new attribute called animation-mixer and gives it a value of default
        model.setAttribute('scale', '0.5 0.5 0.5');//creates a new attribute called scale, and gives it the valies of 0.5x, 0.5y, and 0.5z (which just makes the model half it's original size)
        model.setAttribute('name', 'Lassonde Building');//creates a new attribute called info, and gives it the value of Lassonde Building
        model.setAttribute('info', '${info}');

        model.addEventListener('loaded', () => {//create a new event listener called loaded
            window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))//will trigger a custom event called gps-entity-place-loaded
        });

        document.querySelector('button[data-action="change"]').addEventListener('click', function () {
            var entity = document.querySelector('[gps-entity-place]');
            infoIdx++;
            var newIdx = infoIdx % 3
            entity.setAttribute('info', '${info[newIdx]}')
        });

        scene.appendChild(model);//add the model onto/into the scene
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

