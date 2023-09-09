
//Globl variable declaration containing beginning of Immeadiately Invoked Function Expression.
let pokemonRepository = (function() { 
  let modalContainer = document.querySelector('#modal-container');
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

    function showModal(title, text, image) {
    
      // Clear all existing modal content
      modalContainer.innerHTML = '';

      let modal = document.createElement('div');
      modal.classList.add('modal');

      // Add the new modal content
      let closeButtonElement = document.createElement('button');
      closeButtonElement.classList.add('modal-close');
      closeButtonElement.innerText = 'Close';
      closeButtonElement.addEventListener('click', hideModal);

      let titleElement = document.createElement('h1');
      titleElement.innerText = title;

      let contentElement = document.createElement('p');
      contentElement.innerText = text;

      let imageElement = document.createElement('img');
      imageElement.classList.add('PokePic')
      imageElement.src = image;
      

      modal.appendChild(closeButtonElement);
      modal.appendChild(titleElement);
      modal.appendChild(contentElement);
      modal.appendChild(imageElement);
      modalContainer.appendChild(modal);



      modalContainer.classList.add('is-visible');
    }

    function hideModal() {
      modalContainer.classList.remove('is-visible');
    }

    //Event listener for escape key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
        hideModal();  
      }
    });
    
    modalContainer.addEventListener('click', (e) => {
      // Since this is also triggered when clicking INSIDE the modal
      // We only want to close if the user clicks directly on the overlay
      let target = e.target;
      if (target === modalContainer) {
        hideModal();
      }
    });

    document.querySelector('#show-modal').addEventListener('click', () => {
      showModal('Choose a pokemon', 'The Pokemon'+'s'+' name, height, and image will be displayed.','Enjoy');
    });

    function showDetails(item) {
      pokemonRepository.loadDetails(item).then(function() {
        showModal(item.name, 'Height:'+ item.height, item.imageUrl);
      });
    }
    

    return {
    //key-value pairs
      add: add,
      getAll: getAll,
      addListItem: addListItem,
      loadList: loadList,
      loadDetails: loadDetails,
      showDetails: showDetails,
      showModal: showModal
    };
  })();
  
  
  pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon) {
      pokemonRepository.addListItem(pokemon);
    });
  });

