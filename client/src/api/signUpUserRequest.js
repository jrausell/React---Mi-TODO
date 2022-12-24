//TODO: authentification
const API_URL = `http://localhost:3000`

export default (data, loginMethod = null) => {
	return fetch(`${API_URL}/user/signup`, {
		method: 'POST',
		headers: {
			"Authozation": 'asdf',
			'Accept': 'application/json',
			"Content-Type": 'application/json'
		},
      body: JSON.stringify({
         data,
			loginMethod
      })
	})
	.then((response) => response.json())
}