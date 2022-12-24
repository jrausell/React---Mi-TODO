//TODO: authentification
const API_URL = `http://localhost:3000`

export default (parentId, subtask) => {
	return fetch(`${API_URL}/todo/${parentId}/subtask/${subtask._id}`, {
		method: 'PATCH',
		headers: {
			"Authozation": 'asdf',
			'Accept': 'application/json',
			"Content-Type": 'application/json'
		},
      body: JSON.stringify({
         title: subtask.title,
         completed: subtask.completed
      })
	})
	.then((response) => response.json())
}