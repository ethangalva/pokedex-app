let pokemonRepository = (function () {
    let pokemonList = [
    {name: 'Charmander',height: .6,types: 'Fire'},
    {name: 'Squirtle',height: .5,types: 'Water'},
    {name: 'Jigglypuff',height: .5,types: ['Fairy', 'Normal']}
    ]

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
        //assigns li to ul
        list.appendChild(listItem);
        //show details about pokemon when clicked
        button.addEventListener('click', function() {
            showDetails(pokemon);
        })
    }
    //displays details of the pokemon in the paramenter (clicked)
    function showDetails(pokemon) {
        console.log(pokemon);
    }

    //returns the values of the functions for them to be called outside of the IIFE
    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        showDetails: showDetails
    }

})();

pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });

//Add pokemon to the end of the array
console.log(pokemonRepository.getAll());
pokemonRepository.add(9);
console.log(pokemonRepository.getAll());