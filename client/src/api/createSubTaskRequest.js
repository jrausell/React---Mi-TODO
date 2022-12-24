//TODO: authentification
const API_URL = `http://localhost:3000`

export default (todo, subtask) => {

	console.log('todo', todo, 'new subtask', subtask)

	return fetch(`${API_URL}/todo/${todo._id}/subtask`, {
		method: 'POST',
		headers: {
			"Authozation": 'asdf',
			'Accept': 'application/json',
			"Content-Type": 'application/json'
		},
      body: JSON.stringify({
         title: subtask.title
      })
	})
	.then((response) => response.json())
}