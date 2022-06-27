let pokemonRepository = (function () {
    let pokemonList = [];
    let apiURL = 'https://pokeapi.co/api/v2/pokemon/';

    //returns all information of pokemons
    function getAll() {
        return pokemonList;
    }

    //pushes new pokemons onto the array
    function add(item) {
        //checks if inserted text is an object
        if (typeof item === 'object') {
            pokemonList.push(item);
        } else {
            return false;
        }
    }

    // displays details of the pokemon in the paramenter (clicked) [in console]
    function showDetails(pokemon) { // from api
        loadDetails(pokemon).then(function () {
            console.log(pokemon);
        });
    }

    //displays pokemons in html body as buttons
    function addListItem(pokemon){
        //assigns ul to variable
        let list = document.querySelector('.pokemon-list');
        //creates li 
        let listItem = document.createElement('li');
        //creates button 
        let button = document.createElement('button');
        //assigns inner text for button
        button.innerText = pokemon.name;
        //adds class "pokemons" to buttons
        button.classList.add('pokemons');
        //assigns button as child to newly created li item
        listItem.appendChild(button);
        //assigns li as child to ul
        list.appendChild(listItem);
        //show details about pokemon when clicked
        button.addEventListener('click', function() {
            showDetails(pokemon);
        });
    }
    
    function loadList() { // function to get api response and transform it into JS object with keys
        return fetch(apiURL).then(function (response) { // gets JSON data 
            return response.json(); // transforms it into JS object
        }).then(function (json) { 
            json.results.forEach(function (item) { // for each item it runs the following function
                let pokemon = {
                    name: item.name,
                    detailsURL: item.url
                };
                add(pokemon); // adds each object inside of the data from JSON into out array
            }); 
        }).catch(function (e) {
            console.error(e);
        });
    }

    function loadDetails(pokemon) {
        let url = pokemon.detailsURL;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            item.imageURL = details.sprites.front_default; // adds URL to img to the pokemon object inside of the array under the key [imageURL]
            item.heigh = details.heigh; // adds height data to the object in the array u nder the key [height]
            item.types = details.types;
        }).catch(function (e) {
            console.log(e);
        });
    }

    //returns the values of the functions for them to be called outside of the IIFE
    return {
        add: add,
        getAll: getAll,
        loadList: loadList,
        loadDetails: loadDetails,
        addListItem: addListItem,
        showDetails: showDetails
    };

})();

console.log("hi");

pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
})

//instantly runs to display all array items as html button elements
// pokemonRepository.getAll().forEach(function(pokemon) {
//     pokemonRepository.addListItem(pokemon);
// });



