let pokemonList = [
    {name: 'Charmander',height: .6,types: 'Fire'},
    {name: 'Squirtle',height: .5,types: 'Water'},
    {name: 'Jigglypuff',height: .5,types: ['Fairy', 'Normal']}
]
//loop that reads and list off the name and height of the pokemons in pokemonList
for (let i = 0; i < pokemonList.length; i++) {
    //if pokemon is >= .6 then print special message 
    document.write(` ${pokemonList[i].name} is ${pokemonList[i].height} meters tall. ${pokemonList[i].height >= .6 ? "That is a above average sized pokemon!" : ""}`)
}