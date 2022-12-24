//TODO: authentification
const API_URL = `http://localhost:3000`

export default (email, user_credential = null, loginMethod = null) => {
	const connectionData = {
      at: Date.now(),
      browser: navigator.userAgent
   }

	return fetch(`${API_URL}/user/login`, {
		method: 'POST',
		headers: {
			"Authozation": 'asdf',
			'Accept': 'application/json',
			"Content-Type": 'application/json'
		},
      body: JSON.stringify({
         email,
			user_credential,
			loginMethod
      })
	})
	.then((response) => response.json())
}