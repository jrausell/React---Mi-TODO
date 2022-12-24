//TODO: authentification
const API_URL = `http://localhost:3000`

export default () => {
	return fetch(`${API_URL}/todos`, {
		method: 'GET',
		headers: {
			Authozation: 'asdf',
			"content-type": 'application/json'
		}
	})
	.then((response) => response.json())
}