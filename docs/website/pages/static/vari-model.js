var models = []

function ARModel(name, dialogue) {
    this.name = name;
    this.dialogue = dialogue;
}

ARModel.prototype.speak = function() {
    return this.dialogue;
}


//Character model
function Models(name, dialogue) {
    ARModel.call(this, name, dialogue);
}
Models.prototype = Object.create(ARModel.prototype);

// we would repeat an intialization step for each character we have
// so the parts between { }, in the charactersArray = []
// for example if I had a second character, `chocobo` I would add like so:
function initiateModels() {
    var modelsArray = [
      {
        name: 'vari',
        dialogue: 'Hi there, I\'m Bowser! I\'ve lost my skull. Let me know if you see it!',
      },
      {
        name: 'lassonde',
        dialogue: 'sqauak squaaak SQUAKKKKK',
      }
    ];

    modelsArray.forEach(function(model){
        models.push(new Model(model.name, model.dialogue));
    });

    console.log('models', models);
}

initiateModels();
