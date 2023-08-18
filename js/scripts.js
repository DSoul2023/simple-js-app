
let pokemonRepository = (function () { //Globl variable declaration containing beginning of Immeadiately Invoked Function Expression.
    let pokemonList = [ //Array [] containing pokemon objects.
        {name: 'Bulbasour', height: 0.7, type: ['Grass','Poison']}, //object containing descriptive pokemon keys (attribues).
    
        {name: 'Charmander', height: 0.6, type: ['Fire']},
    
        {name: 'Squirtle', height: 0.5, type: ['Water']}
    ]
        function getAll () {//function for calling contents of array outside of IIFE
            return pokemonList; 
        }
        function add (item) {//function for adding content to array outside of IIFE
        pokemonList.push(item);
        }
    return {
      getAll: getAll, //key-value pairs
      add: add
    };
  })();//end of IIFE.
  console.log(pokemonRepository.getAll());
  pokemonRepository.add ({name:'Vulpix', height:2, type: ['Fire']});
  pokemonRepository.add ({name:'Dragonite', height:7.03, type: ['Dragon','Flying']});
  pokemonRepository.add ({name:'Raichu', height:2.07, type: ['Electric']});
  console.log(pokemonRepository.getAll());

 pokemonRepository.getAll().forEach(function(pokemon) { //used .getAll() to call contents of pokemon repository outside of IIFE
        if (pokemon.height >= 7 ) {
            document.write ("<p>" + "<span class = name>" + pokemon.name + "</span>" + " (height: " + pokemon.height + "m). " + "<span class= exclaim>" + " Wow, that's big!" + "</span>" + "</p>");
        } else if (pokemon.height < 0.7 && pokemon.height > 0.5 ) {
            document.write ("<p>" + "<span class = name>" + pokemon.name + "</span>" + " (height: " + pokemon.height + "m). " + "</p>");
        } else {
            document.write ("<p>" + "<span class = name>" + pokemon.name + "</span>" + " (height: " + pokemon.height + "m). " + "</p>");
        };
    })
