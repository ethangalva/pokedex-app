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
        if (typeof item == "string") {
            pokemonList.push(item);
        } else {
            console.log("item is not a string");
        }
        
        

    }

    //returns the values of the functions for them to be called outside of the IIFE
    return {
        add: add,
        getAll: getAll
    }

})();
//Print pokemons information in main body of html
pokemonRepository.getAll().forEach(function(pokemon){
    document.write(pokemon.name + " height: "+ pokemon.height + ", " + "<br/>");
  });
//Add pokemon to the end of the array
console.log(pokemonRepository.getAll());
pokemonRepository.add(9);
console.log(pokemonRepository.getAll());