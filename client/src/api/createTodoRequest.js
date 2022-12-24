//TODO: authentification
const API_URL = `http://localhost:3000`

export default (todo) => {
	return fetch(`${API_URL}/todos`, {
		method: 'POST',
		headers: {
			"Authozation": 'asdf',
			'Accept': 'application/json',
			"Content-Type": 'application/json'
		},
      body: JSON.stringify({
         title: todo.title,
         description: '',
         completed: false
      })
	})
	.then((response) => response.json())
}