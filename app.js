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
    this.move = handleMove(response.moves);
  }
}

function handleTypes(responseTypes) {
  const types = [];

  for (let i = 0; i < responseTypes.length; i++) {
    types.push(responseTypes[i].type.name);
  }
  return types;
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

async function assignMove(pokemon) {
  const allMoves = await getMoves();
  const possibleMoves = allMoves.filter((move) => {
    return move.power;
  });
  const pokemonMoves = pokemon.move;

  let commonMoves = possibleMoves.filter((x) => pokemonMoves.includes(x.identifier));

  const assignedMove = randomMove(commonMoves);

  pokemon.move = assignedMove;
}

async function createBattleField() {
  const pokemonOne = new Pokemon(await getPokemon());
  const pokemonTwo = new Pokemon(await getPokemon());
  await assignMove(pokemonOne);
  await assignMove(pokemonTwo);

  console.log(pokemonOne, pokemonTwo);
}

async function getMoves() {
  const data = await fetch("moves.json");
  const response = await data.json();

  return response;
}

function randomMove(array) {
  const random = Math.floor(Math.random() * array.length);

  return array[random];
}

getMoves();

createBattleField();
