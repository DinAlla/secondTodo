import React from 'react';
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import TodoListContainer from "./todo/TodoListContainer";
import AddTodoComponent from "./todo/AddTodoComponent";
import TodoModal from "./todo/TodoModal";

const generateIdByTitle = () =>
	('_' + Math.random().toString(36).substr(2, 9));

class MainComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			todoList: [],
			isOpenModal: null
		};
		this.addNewTodo = this.addNewTodo.bind(this);
		this.updateTodo = this.updateTodo.bind(this);
		this.deleteTodoById = this.deleteTodoById.bind(this);
		this.loadTodos = this.loadTodos.bind(this);
		this.onCloseModal = this.onCloseModal.bind(this);
		this.onOpenModal = this.onOpenModal.bind(this);
	}

	onCloseModal() {
		this.setState({
			isOpenModal: null
		});
	}

	onOpenModal(id) {
		this.setState({
			isOpenModal: id
		});
	}

	loadTodos() {
		fetch('http://localhost:3000/todos', {
			method: 'GET'
		})
			.then((response) => response.json())
			.then(todos => {
				console.log(todos);
				this.setState({
					todoList: todos
				});
			});
	}

	componentDidMount() {
		this.loadTodos();
	}

	addNewTodo(newTodoTitle) {
		const newTodo = {
			title: newTodoTitle,
			status: 'TODO' // DONE
		};
		fetch('http://localhost:3000/todos', {
			method: 'POST',
			headers: {'Content-Type':'application/json'},
			body: JSON.stringify(newTodo)
		})
			.then(response => {
				if (response.status === 200) {
					this.loadTodos();
				}
			})
	}

	updateTodo(newData) {
		fetch(`http://localhost:3000/todos/${newData.id}`, {
			method: 'PUT',
			headers: {'Content-Type':'application/json'},
			body: JSON.stringify(newData)
		})
			.then(response => {
				if (response.status === 200) {
					this.loadTodos();
				}
			})
	}

	deleteTodoById(id) {
		fetch(`http://localhost:3000/todos/${id}`, {
			method: 'DELETE'
		})
			.then(response => {
				if (response.status === 200) {
					this.loadTodos();
				}
			})
	}

	render() {
		console.log(this.state.todoList);
		return (
			<>
				<Grid container
				      justify="center"
					  classes={{
						  container: 'mainContainer'
					  }}
				>
					<Grid item
					      xs={6}
					>
						<Card classes={{
							      root: 'cardStyle'
							  }}
						>
							<AddTodoComponent addNewTodo={this.addNewTodo}/>
							<TodoListContainer  todoList={this.state.todoList}
							                    updateTodo={this.updateTodo}
							                    deleteTodoById={this.deleteTodoById}
							                    onOpenModal={this.onOpenModal}
							/>
						</Card>
					</Grid>
				</Grid>
				{!!this.state.isOpenModal && (
					<TodoModal onCloseModal={this.onCloseModal}
					           todoId={this.state.isOpenModal}
					/>
				)}
			</>
		);
	}
}

export default MainComponent;
