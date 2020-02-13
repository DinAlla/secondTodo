import React from 'react';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import {Close} from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import DialogContentText from "@material-ui/core/DialogContentText";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";

class TodoModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			description: '',
			status: '',
			isEditTitle: false
		};
		this.onStatusChange = this.onStatusChange.bind(this);
		this.clickOnUpdateTodo = this.clickOnUpdateTodo.bind(this);
		this.onOpenEditTitle = this.onOpenEditTitle.bind(this);
	}

	// ПОСЛЕ УСПЕШНОЙ ОТРИСОВКИ КОМПОНЕНТА ДЕЛАЕМ ЗАПРОС НА ДАННЫЕ
	componentDidMount() {
		fetch(`http://localhost:3000/todos/${this.props.todoId}`, {
			method: 'GET'
		})
			.then(response => response.json())
			.then(todo => {
				console.log(todo);
				const {id, ...restProps} = todo;
				this.setState({
					...restProps
				});
			})
	}

	// ИЗМЕНЯЕМ СТАТУС ТУДУШКИ
	onStatusChange(event) {
		this.setState({
			status: event.target.value
		});
	}

	// ОБНОВЛЯЕМ ВСЕ, ЧТО ИЗМЕНИЛИ, ЧЕРЕЗ ОТПРАВКУ НА СЕРВЕР
	clickOnUpdateTodo() {
		fetch(`http://localhost:3000/todos/${this.props.todoId}`, {
			method: 'PUT',
			headers: {'Content-Type':'application/json'},
			body: JSON.stringify({
				title: this.state.title,
				description: this.state.description,
				status: this.state.status
			})
		})
			.then(response => {
				if (response.status === 200) {
					this.props.loadTodos();
					this.props.onCloseModal();
				}
			})
	}

	// ВКЛЮЧАЕМ РЕЖИМ РЕДАКТИРВОАНИЯ ДЛЯ ЗАГОЛОВКА
	onOpenEditTitle() {
		this.setState({
			isEditTitle: true
		})
	}

	render() {
		return (
			<Dialog open={!!this.props.todoId}
			        onClose={this.props.onCloseModal}
			>
				<DialogTitle classes={{
							    root: 'modalTitle'
							 }}
				>
					{(this.state.isEditTitle)
						? (
							<div>
								<TextField value={this.state.title}
								           onChange={(event) => {
								           	this.setState({
									            title: event.target.value
								            });
								           }}
								/>
							</div>
						)
						: (<div onClick={this.onOpenEditTitle}>
							{this.state.title}
							</div>)
					}
					<IconButton onClick={this.props.onCloseModal}>
						<Close/>
					</IconButton>
				</DialogTitle>
				<DialogContent>
					<DialogContentText>
						{this.state.description}
					</DialogContentText>
					<FormControl>
						<InputLabel id="demo-simple-select-label">
							Status
						</InputLabel>
						<Select labelId="demo-simple-select-label"
						        id="demo-simple-select"
						        value={this.state.status}
						        onChange={this.onStatusChange}
						>
							<MenuItem value="DONE">
								DONE
							</MenuItem>
							<MenuItem value="TODO">
								TODO
							</MenuItem>
						</Select>
					</FormControl>
				</DialogContent>
				<DialogActions>
					<Button onClick={this.props.onCloseModal}>
						Cancel
					</Button>
					<Button color="success"
					        onClick={this.clickOnUpdateTodo}
					>
						Save
					</Button>
				</DialogActions>
			</Dialog>
		);
	}
}

export default TodoModal;
