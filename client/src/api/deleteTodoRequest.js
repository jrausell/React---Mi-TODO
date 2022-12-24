//TODO: authentification
const API_URL = `http://localhost:3000`

export default (todo) => {
	return fetch(`${API_URL}/todo/${todo._id}`, {
		method: 'DELETE',
		headers: {
			"Authozation": 'asdf',
			'Accept': 'application/json',
			"Content-Type": 'application/json'
		},
      body: JSON.stringify({
         _id: todo._id
      })
	})
	.then((response) => response.json())
}