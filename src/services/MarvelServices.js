class MarvelServices {
	_apiBase = 'https://gateway.marvel.com:443/v1/public/';
	_apiKey = 'apikey=8593fef007768c69bd7d62745df90ef1';

	getResource = async (url) => {
		const res = await fetch(url);

		if (!res.ok) {
			throw new Error(`Could not fetch ${url}, status: ${res.status}`);
		}

		return await res.json();
	}

	getAllCharacters = () => {
		return this.getResource(`${this._apiBase}characters?limit=9&offset=250&${this._apiKey}`);
	}

	getCharacter = async (id) => {
		const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
		return this._transformCharacter(res.data.results[0]);
	}

	_transformCharacter = (char) => {
		console.log(char.description.length);
		return {
			name: char.name,
			description: char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character',
			thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
			homepage: char.urls[0].url,
			wiki: char.urls[1].url,
		}
	}
}

export default MarvelServices;