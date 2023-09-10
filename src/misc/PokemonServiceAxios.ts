
const apiBaseUrl = "https://pokeapi.co/api/v2/pokemon";

export function getPokemon(number: number, offset: number){
		return fetch(`${apiBaseUrl}?limit=${number}&offset=${offset}`).then(data => data.json())
	}
export function getPokemonImg(name: string){
		return fetch(`${apiBaseUrl}/${name}`).then(data => data.json())
	}
