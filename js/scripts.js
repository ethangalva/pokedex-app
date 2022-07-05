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


    let modalContainer = document.querySelector('#modal-container');

    // displays details of the pokemon in the paramenter (clicked) [in console]
    function showDetails(pokemon) { // from api
        loadDetails(pokemon).then(function () {
            console.log(pokemon);

            modalContainer.innerHTML = '';

            // here add code to generate the modal 
            let modal = document.createElement('div');
            modal.classList.add('modal')

            let closeButtonElement = document.createElement('button'); // creates close element
            closeButtonElement.classList.add('modal-close'); // adds class to close button
            closeButtonElement.innerHTML = 'Close'; // adds html code inside of button
            closeButtonElement.addEventListener('click', hideModal) // runs hideModal function when cliked 

            let titleElement = document.createElement('h1');
            titleElement.innerText = pokemon.name;

            let contentElement = document.createElement('p');
            contentElement.innerText = 'Height: ' + pokemon.height/10 + ' meters' ;

            let imgElement = document.createElement('img');
            imgElement.src = pokemon.imageURL;
            imgElement.classList.add('imgPokemon')

            modal.appendChild(closeButtonElement);
            modal.appendChild(titleElement);
            modal.appendChild(contentElement);
            modal.appendChild(imgElement);
            modalContainer.appendChild(modal);

            modalContainer.classList.add('is-visible');
        });
    }

    function hideModal() { // we call this function whenThe user clicks Close button/presses the Esc key/clicks outside of the modal
        modalContainer.classList.remove('is-visible'); // removes class that makes the modal visible

        let dialogPromiseReject;

        if (dialogPromiseReject) {
            dialogPromiseReject();
            dialogPromiseReject = null;
        }
    }

    modalContainer.addEventListener('click', (e) => {
        // Since this is also triggered when clicking INSIDE the modal
        // We only want to close if the user clicks directly on the overlay
        let target = e.target;
        if (target === modalContainer) {
            hideModal();
        }
    });

    window.addEventListener('keydown', (e) => { // listens for key down
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) { // if keydown is escape and modalContainer has class is-visible
            hideModal(); // this runs if true
        }
    });

    // //displays pokemons in html body as buttons
    // function addListItem(pokemon){
    //     //assigns ul to variable
    //     let list = document.querySelector('.pokemon-list');
    //     //creates li 
    //     let listItem = document.createElement('li');
    //     //creates button 
    //     let button = document.createElement('button');
    //     //assigns inner text for button
    //     button.innerText = pokemon.name;
    //     //adds class "pokemons" to buttons
    //     button.classList.add('pokemons');
    //     //assigns button as child to newly created li item
    //     listItem.appendChild(button);
    //     //assigns li as child to ul
    //     list.appendChild(listItem);
    //     //show details about pokemon when clicked
    //     button.addEventListener('click', function() {
    //         showDetails(pokemon);
    //     }); 
    // }

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
        // creates img 
        let imgThumbnail = document.createElement('img');
        imgThumbnail.classList.add('imgThumbnail');
        imgThumbnail.src = pokemon.imageURL;
        // creates h2 for id
        let idThumbnail = document.createElement('h2');
        idThumbnail.innerText = '#' + pokemon.id;

        

        // assigns idThumbnail as buttons child
        button.appendChild(idThumbnail);
        // assigns img as buttons child
        button.appendChild(imgThumbnail);
        // assigns button as child of li
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
            pokemon.imageURL = details.sprites.other.dream_world.front_default; // adds URL to img to the pokemon object inside of the array under the key [imageURL]
            pokemon.height = details.height; // adds height data to the object in the array u nder the key [height]
            pokemon.types = details.types; // gets the types of the pokemon
            pokemon.id = details.id; // gets id 
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



// pokemonRepository.loadList().then(function() {
//     pokemonRepository.getAll().forEach(function(pokemon) {
//         pokemonRepository.loadDetails(pokemon); // loads extra details of each pokemon
//         pokemonRepository.addListItem(pokemon);
//     });
// })

// pokemonRepository.loadList().then(function() {
//     pokemonRepository.getAll().forEach(function(pokemon) {
//         pokemonRepository.loadDetails(pokemon).then(function () {
//             pokemonRepository.addListItem(pokemon);
//         })// loads extra details of each pokemon
//     });
// })

pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon) {
        pokemonRepository.loadDetails(pokemon).then(function () {
            pokemonRepository.addListItem(pokemon);
        })// loads extra details of each pokemon
    });
})

// checks for information from api before calling modals
console.log(pokemonRepository.getAll());