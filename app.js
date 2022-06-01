const forbiddenMoves = [
  "guillotine",
  "swords-dance",
  "whirlwind",
  "sand-attack",
  "horn-drill",
  "tail-whip",
  "leer",
  "growl",
  "roar",
  "sing",
  "supersonic",
  "sonic-boom",
  "disable",
  "mist",
  "low-kick",
  "counter",
  "seismic-toss",
  "leech-seed",
  "growth",
  "poison-powder",
  "stun-spore",
  "sleep-powder",
  "string-shot",
  "dragon-rage",
  "thunder-wave",
  "fissure",
  "toxic",
  "hypnosis",
  "meditate",
  "agility",
  "teleport",
  "night-shade",
  "mimic",
  "screech",
  "double-team",
  "recover",
  "harden",
  "minimize",
  "smokescreen",
  "confuse-ray",
  "withdraw",
  "defense-curl",
  "barrier",
  "light-screen",
  "haze",
  "reflect",
  "focus-energy",
  "bide",
  "metronome",
  "mirror-move",
  "amnesia",
  "kinesis",
  "soft-boiled",
  "glare",
  "poison-gas",
  "lovely-kiss",
  "transform",
  "spore",
  "flash",
  "psywave",
  "splash",
  "acid-armor",
  "rest",
  "sharpen",
  "conversion",
  "substitute",
];

console.log(forbiddenMoves.length);

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
    this.type = this.handleTypes(response.types);
    this.move = this.handleMove(response.moves);
  }

  handleTypes(responseTypes) {
    const types = [];

    for (let i = 0; i < responseTypes.length; i++) {
      types.push(responseTypes[i].type.name);
    }
    return types;
  }

  handleMove(responseMoves) {
    const allPossibleMoves = [];

    for (let i = 0; i < responseMoves.length; i++) {
      allPossibleMoves.push({ name: responseMoves[i].move.name, url: responseMoves[i].move.url });
    }
    return allPossibleMoves;
  }
}

async function getPokemon() {
  let randomNumber = Math.floor(Math.random() * 151);

  const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomNumber}`);
  const response = await data.json();

  console.log(response);

  return response;
}

async function createBattlefield() {
  const pokemonOne = new Pokemon(await getPokemon());
  const pokemonTwo = new Pokemon(await getPokemon());

  console.log(pokemonOne, pokemonTwo);
}

createBattlefield();
