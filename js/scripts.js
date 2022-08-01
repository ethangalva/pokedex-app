let pokemonRepository = (function () {
    let pokemonList = [];
    let apiURL = 'https://pokeapi.co/api/v2/pokemon/?limit=300';
    let modalContainer = document.querySelector('#modal-container');

    // function to get api response and transform it into JS object with keys
    function loadList() { 
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

    // function to load second api from the detailsURL obtained from first API key
    function loadDetails(pokemon) {
        let url = pokemon.detailsURL;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            pokemon.imageURL = details.sprites.other.dream_world.front_default; // adds URL to img to the pokemon object inside of the array under the key [imageURL]
            pokemon.height = details.height; // adds height data to the object in the array u nder the key [height]
            pokemon.id = details.id; // gets id 
            pokemon.weight = details.weight; // gets weight
            pokemon.abilities = details.abilities.map((ability) => ability.ability.name).join(', ');
            pokemon.types = details.types.map((name) => name.type.name).join(', ') ; // gets the types of the pokemon
            pokemon.speciesURL = details.species.url; // url to get color info about pokemon
        }).catch(function (e) {
            console.log(e);
        });
    }

    //displays pokemons in html body as buttons
    function addListItem(pokemon){
        //assigns ul to variable
        let list = document.querySelector('.list-group');
        //creates button 
        let button = document.createElement('button');
        button.classList.add('list-group-item')
        button.classList.add('pokemons');
        button.classList.add('list-group-item-action');

        button.classList.add('btn');
        button.classList.add('btn-primary')

        button.setAttribute('data-toggle', 'modal');
        button.setAttribute('type', 'button');
        button.setAttribute('data-target', '.modal')
        
        button.setAttribute('id', pokemon.id)

        // adds class to change the background of thumbnail based on pokemon.colorID
        let colorClassAdd = addColor(pokemon);
        button.classList.add(colorClassAdd);

        //assigns inner text for button
        button.innerText = pokemon.name;
        // creates img 
        let imgThumbnail = document.createElement('img');
        imgThumbnail.classList.add('imgThumbnail');
        imgThumbnail.src = pokemon.imageURL;
        imgThumbnail.setAttribute('alt', 'image of pokemon');
        // creates h2 for id
        let idThumbnail = document.createElement('h2');
        idThumbnail.innerText = '#' + addLeadingZeros(pokemon.id, 3); // checks for id lenght and adds 0s to make a 3 digit number
        idThumbnail.classList.add('idThumbnail')





        // assigns idThumbnail as buttons child
        button.appendChild(idThumbnail);
        // assigns img as buttons child
        button.appendChild(imgThumbnail);
        //assigns li as child to ul
        list.appendChild(button);
        //show details about pokemon when clicked
        button.addEventListener('click', function() {
            showDetails(pokemon);
        }); 
    }

    // displays details of the pokemon in a modal
    function showDetails(pokemon) { // from api
        console.log(pokemon);

        modalContainer.innerHTML = '';

        // creates modal dialog 
        let modalDialog = document.createElement('div');
        modalDialog.classList.add('modal-dialog');
        modalDialog.classList.add('modal-dialog-centered'); // this is to make it align vertically to the center 
        modalDialog.setAttribute('role', 'document');

        // here add code to generate the modal content [append to .modal-dialog]
        let modal = document.createElement('div');
        modal.classList.add('modal-content');

        // creates top section of modal for header
        let modalHeader = document.createElement('div');
        modalHeader.classList.add('modal-header');
        // adds color to header background
        let colorClassAdd = addColor(pokemon);
        modalHeader.classList.add(colorClassAdd);
        // Header [ID]
        let modalHeaderID = document.createElement('p');
        modalHeaderID.classList.add('modal-id')
        modalHeaderID.innerText = '#' + addLeadingZeros(pokemon.id, 3); // checks for id lenght and adds 0s to make a 3 digit number
        // Header [title]
        let modalHeaderTitle = document.createElement('h4');
        modalHeaderTitle.classList.add('modal-title')
        modalHeaderTitle.innerText = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1); // uppercases the 1st letter
        // Header [close button]
        let modalHeaderClose = document.createElement('button');
        modalHeaderClose.classList.add('close');
        modalHeaderClose.setAttribute('type', 'button');
        modalHeaderClose.setAttribute('data-dismiss', 'modal');
        modalHeaderClose.setAttribute('aria-label', 'Close');
        // Button [inside button]
        let modalHeaderCloseSpan = document.createElement('span');
        modalHeaderCloseSpan.setAttribute('aria-hidden', 'true');
        modalHeaderCloseSpan.innerHTML = '&times;'; // adds x for close button 

        // creates body section of modal for info
        let modalBody = document.createElement('div');
        modalBody.classList.add('modal-body');
        // Body [IMG]
        let modalBodyIMG = document.createElement('img');
        modalBodyIMG.src = pokemon.imageURL;
        modalBodyIMG.classList.add('modalIMG');
        modalBodyIMG.classList.add('modalBodyItem');
        // Body [Type]
        let modalBodyTypes = document.createElement('h5');
        modalBodyTypes.innerText = "Types: " + pokemon.types;
        modalBodyTypes.classList.add('modalBodyTypes');
        modalBodyTypes.classList.add('modalBodyItem');
        // Body [Heigth]
        let modalBodyHeigth = document.createElement('h5');
        modalBodyHeigth.innerText = "Heigth: " + pokemon.height/10 + " meters";
        modalBodyHeigth.classList.add('modalBodyHeigth');
        modalBodyHeigth.classList.add('modalBodyItem');
        // Body [Weigth]
        let modalBodyWeight = document.createElement('h5');
        modalBodyWeight.innerText = "Weight: " + pokemon.weight/10 + " pounds";
        modalBodyWeight.classList.add('modalBodyWeight');
        modalBodyWeight.classList.add('modalBodyItem');
        // Body [Abilities]
        let modalBodyAbilities = document.createElement('h5');
        modalBodyAbilities.innerText = "Abilities: " + pokemon.abilities;
        modalBodyAbilities.classList.add('modalBodyAbilities');
        modalBodyAbilities.classList.add('modalBodyItem');



        // append to create modal
        modalContainer.appendChild(modalDialog);
        modalDialog.appendChild(modal);
        
        modal.appendChild(modalHeader);
        modalHeader.appendChild(modalHeaderID);
        modalHeader.appendChild(modalHeaderTitle);
        modalHeader.appendChild(modalHeaderClose);
        modalHeaderClose.appendChild(modalHeaderCloseSpan);

        modal.appendChild(modalBody);
        modalBody.appendChild(modalBodyIMG);
        modalBody.appendChild(modalBodyHeigth);
        modalBody.appendChild(modalBodyWeight);
        modalBody.appendChild(modalBodyAbilities);
        modalBody.appendChild(modalBodyTypes); 
    }

    // checks for id lenght and adds 0s to make a 3 digit number
    function addLeadingZeros(num, totalLength) {
        return String(num).padStart(totalLength, '0');
    }

    // we call this function whenThe user clicks Close button/presses the Esc key/clicks outside of the modal
    function hideModal() { 
        modalContainer.classList.remove('is-visible'); // removes class that makes the modal visible

        let dialogPromiseReject;

        if (dialogPromiseReject) {
            dialogPromiseReject();
            dialogPromiseReject = null;
        }
    }

    // hides modal when x is clicked
    modalContainer.addEventListener('click', (e) => {
        // Since this is also triggered when clicking INSIDE the modal
        // We only want to close if the user clicks directly on the overlay
        let target = e.target;
        if (target === modalContainer) {
            hideModal();
        }
    });

    // hides modal when chicled outside of it and is visible
    window.addEventListener('keydown', (e) => { // listens for key down
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) { // if keydown is escape and modalContainer has class is-visible
            hideModal(); // this runs if true
        }
    });

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

    // gets species color from pokemon.speciesURL
    function loadSpeciesInfo(pokemon) {
        let url = pokemon.speciesURL;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (species) {
            pokemon.colorID = species.color.url; // gets color of pokemon 

            // converts link into a id from 1-10
            pokemon.colorID = pokemon.colorID.replace("https://pokeapi.co/api/v2/pokemon-color/", "");
            pokemon.colorID = pokemon.colorID.replace("/", "");
            pokemon.colorID = parseInt(pokemon.colorID);
        }).catch(function (e) {
            console.log(e);
        });
    }

    // based on color id, add class to button for background
    function addColor(pokemon) {
        let color = pokemon.colorID;

        if (color === 1) {
            return "colorBlack-1";
        } else if (color === 2) {
            return "colorBlue-2";
        } else if (color === 3) {
            return "colorBrown-3";
        } else if (color === 4) {
            return "colorGray-4";
        } else if (color === 5) {
            return "colorGreen-5";
        } else if (color === 6) {
            return "colorPink-6";
        } else if (color === 7) {
            return "colorPurple-7";
        } else if (color === 8) {
            return "colorRed-8";
        } else if (color === 9) {
            return "colorWhite-9";
        } else if (color === 10) {
            return "colorYellow-10";
        }
    }

    // assigns search id to variable and adds event listener for user input
    const search = document.getElementById('search')
    search.addEventListener('input', searchList);

    // checks for input in search field and makes it work
    function searchList() {
        let searchInput = document.getElementById('search').value;
        searchInput = searchInput.toLowerCase();
        const listItems = $('button');
        listItems.each(function() {
            const item = $(this);
            const name = item.text();
            if (name.includes(searchInput)) {
                item.show();
            } else {
                item.hide();
            }
        });
    }

    //returns the values of the functions for them to be called outside of the IIFE
    return {
        add: add,
        getAll: getAll,
        loadList: loadList,
        loadDetails: loadDetails,
        addListItem: addListItem,
        showDetails: showDetails,
        loadSpeciesInfo: loadSpeciesInfo,
        addColor: addColor
    };
})();

// parent function that displays and loads information from the api
pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon) {
        pokemonRepository.loadDetails(pokemon).then(function () {
            pokemonRepository.loadSpeciesInfo(pokemon).then(function() {
                pokemonRepository.addListItem(pokemon);
            });
        });// loads extra details of each pokemon
    });
})

// // parent function that displays and loads information from the api
// pokemonRepository.loadList().then(function() {
//     pokemonRepository.getAll().forEach(function(pokemon) {
//         pokemonRepository.loadDetails(pokemon).then(function () {
//             pokemonRepository.loadSpeciesInfo(pokemon);
//             pokemonRepository.addListItem(pokemon);
//         });// loads extra details of each pokemon
//     });
// })




// TODO: 
// -modal: id, heigth, color, types
// -thumbnail: id styling, types st