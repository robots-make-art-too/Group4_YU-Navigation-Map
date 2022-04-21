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
        dialogue1: 'text1',
        dialogue2: 'text2',
        dialogue3: 'text3'
      },
      {
        name: 'lassonde',
        dialogue1: 'text1',
        dialogue2: 'text2',
        dialogue3: 'text3'
      }
    ];

    modelsArray.forEach(function(model){
        models.push(new Model(model.name, model.dialogue));
    });

    console.log('models', models);
}

initiateModels();
