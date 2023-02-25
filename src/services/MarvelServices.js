class MarvelServices {
	getResource = async (url) => {
		const res = await fetch(url);

		if (!res.ok) {
			throw new Error(`Could not fetch ${url}, status: ${res.status}`);
		}

		return await res.json();
	}

	getAllCharacters = () => {
		return this.getResource('https://gateway.marvel.com:443/v1/public/characters?limit=9&offset=250&apikey=8593fef007768c69bd7d62745df90ef1');
	}
}

export default MarvelServices;