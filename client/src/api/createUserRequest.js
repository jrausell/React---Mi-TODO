//TODO: authentification
const API_URL = `http://localhost:3000`

export default (todo) => {
	const connectionData = {
      at: Date.now(),
      browser: navigator.userAgent
   }

	return fetch(`${API_URL}/users`, {
		method: 'POST',
		headers: {
			"Authozation": 'asdf',
			'Accept': 'application/json',
			"Content-Type": 'application/json'
		},
      body: JSON.stringify({
         email: todo.title,
         givenName: '',
         familyName: '',
			lastLogin: connectionData
      })
	})
	.then((response) => response.json())
}