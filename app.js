const pokedex = document.getElementById("pokedex");
const loadingEl = document.querySelector(".loading-text");
const pokemonNumbers = 898;
let pokemons = [];

const searchInput = document.getElementById("search");

searchInput.addEventListener("keyup", (e) => {
    const searchString = e.target.value.toLowercase();
    const filteredCharacters = pokemons.filter((character) => {
        return character.name.toLowercase().includes(searchString);
    });

    displayPokemon(filteredCharacters);
});

const fetchPokemon = () => {
    let promises = [];
    for (let i = 1; i <= pokemonNumbers; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((res) => res.json()));
    }
    Promise.all(promises).then((results) => {
        const pokemon = results.map((result) => ({
            name: result.name,
            image: result.sprites["front_default"],
            mainType: result.types[0].type.name,
            types: result.types.map((type) => type.type.name).join(", "),
            id: result.id
        }));
        pokemons = pokemon;
        loadingEl.classList.add("hide");
        displayPokemon(pokemon);
    });
};

const displayPokemon = (pokemon) => {
    const pokemonHTMLString = pokemon
        .map(
            (data) => `
        <div class="card">
            <img class="card-image" src="${data.image}"/>
            <h2 class="card-title">${data.id}. ${data.name}</h2>
            <p class="card-subtitle">Type: ${data.types}</p>
        </div>
    `
        )
        .join("");
    pokedex.innerHTML = pokemonHTMLString;
};

fetchPokemon();

//SearchBar Functionality

searchInput.addEventListener("keyup", (e) => {
    const searchString = e.target.value;
    const filteredCharacters = pokemons.filter((character) => {
        return character.name.includes(searchString);
    });

    displayPokemon(filteredCharacters);
});
