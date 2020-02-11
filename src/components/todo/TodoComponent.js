import React from 'react';
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Delete from '@material-ui/icons/Delete';
import TextField from "@material-ui/core/TextField";
import Save from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";

class TodoComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isEdit: false,
			todoTitle: props.todo.title
		};
		this.onChangeCheckbox = this.onChangeCheckbox.bind(this);
		this.onTitleClick = this.onTitleClick.bind(this);
		this.onChangeOldTitle = this.onChangeOldTitle.bind(this);
		this.onUpdateTitle = this.onUpdateTitle.bind(this);
	}

	onChangeCheckbox(event) {
		const {todo, updateTodo} = this.props;
		const newTodo = {
			...todo,
			status: (event.target.value === "false") ? 'DONE' : 'TODO'
		};
		updateTodo(newTodo);
	}

	onTitleClick() {
		this.setState({
			isEdit: true
		});
	}

	onChangeOldTitle(event) {
		this.setState({
			todoTitle: event.target.value
		});
	}

	onUpdateTitle() {
		const {todo, updateTodo} = this.props;
		const newTodo = {
			...todo,
			title: this.state.todoTitle
		};
		updateTodo(newTodo);

		this.setState({
			isEdit: false
		});
	}

	render() {
		const {todo, deleteTodoById, onOpenModal} = this.props;
		return (
			<div className="todo"
			>
				<Checkbox value={todo.status === 'DONE'}
				          onChange={this.onChangeCheckbox}
				          disabled={this.state.isEdit}
				/>
				{this.state.isEdit
					? (
						<div className="todoInput">
							<TextField value={this.state.todoTitle}
							           onChange={this.onChangeOldTitle}
							/>
							<IconButton onClick={this.onUpdateTitle}>
								<Save />
							</IconButton>
						</div>
					)
					: (
						<>
							<div onClick={this.onTitleClick}
							     className="todoTitle"
							>
								{todo.title}
							</div>
							<Button onClick={() => onOpenModal(todo.id)}>
								Show more
							</Button>
						</>
					)
				}
				<IconButton onClick={() => deleteTodoById(todo.id)}
				            disabled={this.state.isEdit}
				>
					<Delete />
				</IconButton>
			</div>
		);
	}
}

export default TodoComponent;
