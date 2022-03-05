//array of pokemon in the pokedex
let pokemonList = [
    {name: 'Charmander',height: .6,types: 'Fire'},
    {name: 'Squirtle',height: .5,types: 'Water'},
    {name: 'Jigglypuff',height: .5,types: ['Fairy', 'Normal']}
]
//loop that reads and list off the name and height of the pokemons in pokemonList


pokemonList.forEach( item => console.log(item));
