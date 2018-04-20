const API_URL = 'http://localhost:8000/api';

module.exports = {
	getContacts(success) {
		fetch(API_URL + '/contacts/')
			.then(response => response.json())
			.then(success)
	},

	getTodos(success) {
		fetch(API_URL + '/todos/')
			.then(response => response.json())
			.then(success)
	},

	createContact(data, success) {
		fetch(API_URL + '/add_contact/', {
			method: 'POST',
			body: data
		})
			.then(response => response.json())
			.then(success)
	},

	createTodo(data, succcess) {
		fetch(API_URL + '/add_todo/', {
			method: 'POST',
			body: data
		})
	},

	updateContact(id, data, success) {
		fetch(API_URL + '/contact_detail/' + id.toString(), {
			method: 'POST',
			body: data
		})
			.then(response => response.json())
			.then(success)
	},

	updateTodo(id, data, success) {
		fetch(API_URL + '/todo_detail/' + id.toString(), {
			method: 'POST',
			body: data
		})
			.then(response => response.json())
			.then(success)
	},

	deleteContact(id, success) {
		fetch(API_URL + '/contact_detail/' + id.toString(), {
			method: 'DELETE'
		})
			.then(response => response.json())
			.then(success)
	},

	deleteTodo(id, success) {
		fetch(API_URL + '/todo_detail/' + id.toString(), {
			method: 'DELETE'
		})
			.then(response => response.json())
			.then(success)	
	}
}