

//Global variable declaration containing beginning of Immeadiately Invoked Function Expression.
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
      
      //add "list-group-item" class to li elements
      listpokemon.classList.add("list-group-item", "mx-auto");



      //names button after pokemon in the array
      button.innerText = pokemon.name; 

      //adds class to button element for styling purposes
      button.classList.add("btn", "btn-success", "btn-sm"); 

      button.setAttribute('data-target', '#exampleModal');
      button.setAttribute('data-toggle', 'modal');

      //attaches button to li
      listpokemon.appendChild(button);

      //attaches li to ul
      pokemonList.appendChild(listpokemon); 

      //Notify console that a particular button has been preessed
      button.addEventListener("click", function(event) { 
        showDetails(pokemon);
      });
    }

    function showModal(pokemon) {
      let modalBody = $('.modal-body');
      let modalTitle = $('.modal-title');
      let modalHeader = $('.modal-header');
  
      // clear existing content of the modal
      modalTitle.empty();
      modalBody.empty();
  
        // creating element for name in modal content
    let nameElement = $('<h5 class="modal-title">' + pokemon.name + '</h5>');
    let imageElement = $('<img class="modal-img">');
      imageElement.attr('src', pokemon.imageUrl);
    let heightElement = $('<p>' + 'height : ' + pokemon.height + ' decimeters' + '</p>');
    let weightElement = $('<p>' + 'weight : ' + pokemon.weight + ' decagrams' + '</p>');
    let typesElement = $('<p>' + 'Types: ' + pokemon.types.join(', ') + '</p>');
    let abilitiesElement = $('<p>' + 'Abilities: ' + pokemon.abilities.join(', ') + '</p>');


    modalTitle.append(nameElement);
    modalBody.append(imageElement);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);
    modalBody.append(abilitiesElement);
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
        item.weight = details.weight;
      item.types = details.types.map(function (type) {
        return type.type.name;
      });
      item.abilities = details.abilities.map(function (ability) {
        return ability.ability.name;
      });
      }).catch(function(e) {
        console.error(e);
      });
    }

    function showDetails(pokemon) {
      pokemonRepository.loadDetails(pokemon).then(function() {
        showModal(pokemon);
      });
    }
    

    return {
    //key-value pairs
      add: add,
      getAll: getAll,
      addListItem: addListItem,
      loadList: loadList,
      loadDetails: loadDetails
    };
  })();
  
  
  pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon) {
      pokemonRepository.addListItem(pokemon);
    });
  });