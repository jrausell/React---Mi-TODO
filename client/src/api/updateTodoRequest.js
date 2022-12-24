//TODO: authentification
const API_URL = `http://localhost:3000`

export default (todo) => {
	return fetch(`${API_URL}/todo/${todo._id}`, {
		method: 'PUT',
		headers: {
			"Authozation": 'asdf',
			'Accept': 'application/json',
			"Content-Type": 'application/json'
		},
      body: JSON.stringify({
         title: todo.title,
         description: todo.description,
         completed: todo.completed
      })
	})
	.then((response) => response.json())
}