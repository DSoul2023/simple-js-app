
//Globl variable declaration containing beginning of Immeadiately Invoked Function Expression.
let pokemonRepository = (function() { 
    
    //Array [] containing pokemon objects.
    let pokemonList = []; 
    
    //makes external api a variable.
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150'; 
    
    //function for adding content to array
    function add(pokemon) { 
      if (
        typeof pokemon === "object" &&
        "name" in pokemon
      ) {
        pokemonList.push(pokemon);
      } else {
        console.log("pokemon is not correct");
      }
    }
    
    //function for calling contents of array 
    function getAll() { 
      return pokemonList;
    }
    function addListItem(pokemon) {
      //connects to ul element class
      let pokemonList = document.querySelector(".pokemon-list"); 
      //creates an li element under ul element
      let listpokemon = document.createElement("li"); 
      //creates a button
      let button = document.createElement("button"); 
      //names button after pokemon in the array
      button.innerText = pokemon.name; 
      //adds class to button element for styling purposes
      button.classList.add("button-class"); 
      //attaches button to li
      listpokemon.appendChild(button); 
      //attaches li to ul
      pokemonList.appendChild(listpokemon); 
      //Notify console that a particular button has been preessed
      button.addEventListener("click", function(event) { 
        showDetails(pokemon);
      });
    }
  
    function loadList() {
      return fetch(apiUrl).then(function(response) {
        return response.json();
      }).then(function(json) {
        json.results.forEach(function(item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
          console.log(pokemon);
        });
      }).catch(function(e) {
        console.error(e);
      })
    }
  
    function loadDetails(item) {
      let url = item.detailsUrl;
      return fetch(url).then(function(response) {
        return response.json();
      }).then(function(details) {
        //add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      }).catch(function(e) {
        console.error(e);
      });
    }
  
    function showDetails(item) {
      pokemonRepository.loadDetails(item).then(function() {
        console.log(item);
      });
    }
  
    return {
    //key-value pairs
      add: add,
      getAll: getAll,
      addListItem: addListItem,
      loadList: loadList,
      loadDetails: loadDetails,
      showDetails: showDetails
    };
  })();
  
  
  pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon) {
      pokemonRepository.addListItem(pokemon);
    });
  });

