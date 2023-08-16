let pokemonList = [
    {name: 'Bulbasour', height: 0.7, type: ['grass','poison']},

    {name: 'Charmander', height: 0.6, type: ['fire']},

    {name: 'Squirtle', height: 0.5, type: ['water']}
];

/*for (let i = 0; i < pokemonList.length; i++) {
   if (pokemonList[i].height >= 0.7 ) {
        document.write ("<p>" + "<span class = grass-name>" + pokemonList[i].name + "</span>" + " (height: " + pokemonList[i].height + "m). " + "<span class= exclaim>" + " Wow, that's big!" + "</span>" + "</p>");
    } else if (pokemonList[i].height < 0.7 && pokemonList[i].height > 0.5 ) {
        document.write ("<p>" + "<span class = fire-name>" + pokemonList[i].name + "</span>" + " (height: " + pokemonList[i].height + "m). " + "</p>");
    } else {
        document.write ("<p>" + "<span class = water-name>" + pokemonList[i].name + "</span>" + " (height: " + pokemonList[i].height + "m). " + "</p>");
    }
}*/
pokemonList.forEach(function(pokemon) {
    if (pokemon.height >= 0.7 ) {
        document.write ("<p>" + "<span class = grass-name>" + pokemon.name + "</span>" + " (height: " + pokemon.height + "m). " + "<span class= exclaim>" + " Wow, that's big!" + "</span>" + "</p>");
    } else if (pokemon.height < 0.7 && pokemon.height > 0.5 ) {
        document.write ("<p>" + "<span class = fire-name>" + pokemon.name + "</span>" + " (height: " + pokemon.height + "m). " + "</p>");
    } else {
        document.write ("<p>" + "<span class = water-name>" + pokemon.name + "</span>" + " (height: " + pokemon.height + "m). " + "</p>");
    }
});