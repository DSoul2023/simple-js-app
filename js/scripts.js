
let pokemonRepository = (function () { //Globl variable declaration containing beginning of Immeadiately Invoked Function Expression.
    let pokemonList = [ //Array [] containing pokemon objects.
        {name: 'Bulbasour', height: 0.7, type: ['Grass','Poison']}, //object containing descriptive pokemon keys (attribues).
    
        {name: 'Charmander', height: 0.6, type: ['Fire']},
    
        {name: 'Squirtle', height: 0.5, type: ['Water']}
    ];
    function add (pokemon) {//function for adding content to array outside of IIFE
        if (typeof pokemon ==='object' && 'name' in pokemon && 'height' in pokemon && 'type' in pokemon) {
            pokemonList.push(pokemon);
        } else {
            console.log('invalid entry');
        }
    }
        function getAll () {//function for calling contents of array outside of IIFE
            return pokemonList; 
        }
        
        function addListItem(pokemon){
            let pokemonList = document.querySelector('.pokemon-list'); //connects to ul element class
            let listItem = document.createElement('li'); //creates an li element under ul element
            let button = document.createElement('button'); //creates a button
            button.innerText = pokemon.name; //names button after pokemon in the array
            button.classList.add('button-class'); //adds class to button element for styling purposes
            listItem.appendChild(button); //attaches button to li
            pokemonList.appendChild(listItem); //attaches li to ul
            button.addEventListener('click', function(event) {//Notify console that a particular button has been preessed
                console.log(event); 
            })
        }
        function showDetails(pokemon) {
            console.log(pokemon)
        }
    return {
      getAll: getAll, //key-value pairs
      add: add,
      addListItem: addListItem
    };
  })();//end of IIFE.
  //adds following pokemon to the repository
  pokemonRepository.add ({name:'Vulpix', height:2, type: ['Fire']});
  pokemonRepository.add ({name:'Dragonite', height:7.03, type: ['Dragon','Flying']});
  pokemonRepository.add ({name:'Raichu', height:2.07, type: ['Electric']});

  console.log(pokemonRepository.getAll());

 pokemonRepository.getAll().forEach(function(pokemon) { //used .getAll() to call contents of pokemon repository outside of IIFE
      pokemonRepository.addListItem(pokemon); //calls addListItem functions contenets
    })
