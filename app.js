
const container = document.querySelector(".container");
const input = document.querySelector("#number");
const btnSearch = document.querySelector("#btn-search");
const item = document.querySelector(".item");

const url = "https://pokeapi.co/api/v2/pokemon";

const getPokemonByAPI = async () => {
    try {
        const urlPokemon = `${url}/${input.value}`;
        const response = await fetch(urlPokemon);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Error al conectar con la API " + error);
    }
}

const createPokemon = (pokemon)=>{
    const {name, sprites, types, height, weight} = pokemon;
    return {
        type: types[0].type.name,
        height: height / 10,
        weight: weight / 10,
        image: front_default = sprites.front_default,
        name: name,
    }
}

const createPokemonTemplate = (pokemon) =>{
    const { name, type, height, weight, image } = createPokemon(pokemon)
    return `
        <div class="pokemon-card ${type}">
            <h2>${name}</h2>
            <img src="${image}" alt="${name}">
            <div class="types-container">
                <p class="type ${type}">${type}</p>
            </div>
            <p class="info">Height: ${height}</p>
            <p class="info">Weight: ${weight}</p>
        </div>
    `;
}

const renderPokemon = async() => {

    const data = await getPokemonByAPI();

    if(data){

    

        console.log(data);

        if(item.classList.contains("hidden")){
            item.classList.remove("hidden");
        }
        item.innerHTML = createPokemonTemplate(data);
    }
    else{
        item.innerHTML = `<p> No existe un Pokemon con ese ID.</p>`;
    }

    /*
    const pokemonDiv = document.createElement("div");
    pokemonDiv.classList.add("pokemon");
    pokemonDiv.innerHTML = `
        <h2>${pokemon.name}</h2>
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
    `;
    container.appendChild(pokemonDiv);
    */
}

const init = () => {

    btnSearch.addEventListener("click", renderPokemon); 

    input.addEventListener("change", renderPokemon)




}

init();