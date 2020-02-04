import React from 'react';
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import TodoListContainer from "./todo/TodoListContainer";
import AddTodoComponent from "./todo/AddTodoComponent";

const generateIdByTitle = () =>
	('_' + Math.random().toString(36).substr(2, 9));

class MainComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			todoList: []
		};
		this.addNewTodo = this.addNewTodo.bind(this);
	}

	addNewTodo(newTodoTitle) {
		const newTodo = {
			title: newTodoTitle,
			id: generateIdByTitle(newTodoTitle),
			status: 'TODO'
		};
		this.setState({
			todoList: this.state.todoList.concat(newTodo)
		});
	}

	render() {
		return (
			<Grid container
			      justify="center"
			>
				<Grid item
				      xs={6}
				>
					<Card classes={{
						      root: 'cardStyle'
						  }}
					>
						<AddTodoComponent addNewTodo={this.addNewTodo}/>
						<TodoListContainer  todoList={this.state.todoList}/>
					</Card>
				</Grid>
			</Grid>
		);
	}
}

export default MainComponent;
