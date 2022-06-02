class Battlefield {
  constructor(pokemonOne, pokemonTwo) {
    this.pokemonOne = pokemonOne;
    this.pokemon = pokemonTwo;
  }

  determineFastest() {}

  round() {}
}

class Pokemon {
  constructor(response) {
    this.name = response.name;
    this.sprite_front = response.sprites.front_default;
    this.sprite_back = response.sprites.back_default;
    this.base_hp = response.stats[0].base_stat;
    this.base_speed = response.stats[5].base_stat;
    this.type = handleTypes(response.types);
    this.moves = handleMove(response.moves);
  }

  attack() {}

  isSuccesfullHit(move) {
    const rng = Math.floor(Math.random() * 100);
    if (rng <= move.accuracy) {
      return true;
    } else if (move.accuracy === null) {
      return true;
    } else {
      return false;
    }
  }

  // checkMoveEfficiency(attackerPokemonMoveType, defenderPokemonType) {
  //   let multiplier;

  //   switch (defenderPokemonType) {
  //     case "normal":
  //       switch (attackerPokemonMoveType) {
  //         case 1:
  //           multiplier = 1;
  //           break;
  //         case 2:
  //           multiplier = 2;
  //           break;
  //         case 3:
  //           multiplier = 1;
  //           break;
  //         case 4:
  //           multiplier = 1;
  //           break;
  //         case 5:
  //           multiplier = 1;
  //           break;
  //         case 6:
  //           multiplier = 1;
  //           break;
  //         case 7:
  //           multiplier = 1;
  //           break;
  //         case 8:
  //           multiplier = 1;
  //           break;
  //         case 9:
  //           multiplier = 1;
  //           break;
  //         case 10:
  //           multiplier = 1;
  //           break;
  //         case 11:
  //           multiplier = 1;
  //           break;
  //         case 12:
  //           multiplier = 1;
  //           break;
  //         case 13:
  //           multiplier = 1;
  //           break;
  //         case 14:
  //           multiplier = 1;
  //           break;
  //         case 15:
  //           multiplier = 1;
  //           break;
  //       }
  //   }
  // }
}

function handleTypes(responseTypes) {
  const types = [];

  for (let i = 0; i < responseTypes.length; i++) {
    types.push(responseTypes[i].type.name);
  }
  const weaknesses = [];

  for (let i = 0; i < types.length; i++) {
    if (types[i] === "normal") {
      weaknesses.push(2);
    } else if (types[i] === "fighting") {
      weaknesses.push(3, 14, 18);
    } else if (types[i] === "flying") {
      weaknesses.push(13, 15, 6);
    } else if (types[i] === "poison") {
      weaknesses.push(5, 14);
    } else if (types[i] === "ground") {
      weaknesses.push(11, 12, 15);
    } else if (types[i] === "rock") {
      weaknesses.push(11, 12, 2, 5, 9);
    } else if (types[i] === "bug") {
      weaknesses.push(10, 3, 6);
    } else if (types[i] === "ghost") {
      weaknesses.push(8, 17);
    } else if (types[i] === "steel") {
      weaknesses.push(10, 2, 5);
    } else if (types[i] === "fire") {
      weaknesses.push(11, 5, 6);
    } else if (types[i] === "water") {
      weaknesses.push(12, 13);
    } else if (types[i] === "grass") {
      weaknesses.push(10, 15, 4);
    } else if (types[i] === "electric") {
      weaknesses.push(5);
    } else if (types[i] === "psychic") {
      weaknesses.push(7, 8, 17);
    } else if (types[i] === "ice") {
      weaknesses.push(10, 2, 6, 9);
    } else if (types[i] === "dragon ") {
      weaknesses.push(15, 16, 18);
    } else if (types[i] === "dark") {
      weaknesses.push(2, 7, 18);
    } else if (types[i] === "fairy") {
      weaknesses.push(4, 9);
    }
  }

  const resistances = [];

  for (let i = 0; i < types.length; i++) {
    if (types[i] === "normal") {
      resistances.push(null);
    } else if (types[i] === "fighting") {
      resistances.push(7, 6, 17);
    } else if (types[i] === "flying") {
      resistances.push(12, 2, 7);
    } else if (types[i] === "poison") {
      resistances.push(12, 2, 4, 7);
    } else if (types[i] === "ground") {
      resistances.push(4, 6, 18);
    } else if (types[i] === "rock") {
      resistances.push(1, 10, 4, 3);
    } else if (types[i] === "bug") {
      resistances.push(12, 2, 5);
    } else if (types[i] === "ghost") {
      resistances.push(4, 7);
    } else if (types[i] === "steel") {
      resistances.push(1, 12, 15, 3, 14, 7, 6, 16, 9, 18);
    } else if (types[i] === "fire") {
      resistances.push(10, 12, 15, 7, 9, 18);
    } else if (types[i] === "water") {
      resistances.push(10, 11, 15, 9);
    } else if (types[i] === "grass") {
      resistances.push(11, 12, 13, 5);
    } else if (types[i] === "electric") {
      resistances.push(13, 3, 9);
    } else if (types[i] === "psychic") {
      resistances.push(2, 14);
    } else if (types[i] === "ice") {
      resistances.push(15);
    } else if (types[i] === "dragon ") {
      resistances.push(10, 11, 12, 13);
    } else if (types[i] === "dark") {
      resistances.push(8, 17);
    } else if (types[i] === "fairy") {
      resistances.push(2, 7, 17);
    }
  }

  return { type: types, weakTo: weaknesses, resistantTo: resistances };
}

function handleMove(responseMoves) {
  const allResponseMoves = [];

  for (let i = 0; i < responseMoves.length; i++) {
    allResponseMoves.push(responseMoves[i].move.name);
  }

  return allResponseMoves;
}

async function getPokemon() {
  let randomNumber = Math.floor(Math.random() * 151);

  const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomNumber}`);
  const response = await data.json();

  return response;
}

async function assignMoves(pokemon) {
  const allMoves = await getMoves();
  const possibleMoves = allMoves.filter((move) => {
    return move.power;
  });
  const pokemonMoves = pokemon.moves;

  let commonMoves = possibleMoves.filter((x) => pokemonMoves.includes(x.identifier));

  pokemon.moves = randomMoves(commonMoves);
}

async function createBattleField() {
  const pokemonOne = new Pokemon(await getPokemon());
  // const pokemonTwo = new Pokemon(await getPokemon());
  await assignMoves(pokemonOne);
  // await assignMoves(pokemonTwo);

  console.log(pokemonOne);
}

async function getMoves() {
  const data = await fetch("moves.json");
  const response = await data.json();

  return response;
}

function randomMoves(array) {
  const moves = [];

  for (let i = 0; i < 4; i++) {
    let random = Math.floor(Math.random() * array.length);
    moves.push(array[random]);
  }

  return moves;
}

getMoves();

createBattleField();
