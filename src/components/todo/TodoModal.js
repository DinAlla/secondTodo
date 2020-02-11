import React from 'react';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

class TodoModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			description: '',
			status: ''
		};
	}

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

	render() {
		return (
			<Dialog open={!!this.props.todoId}
			        onClose={this.props.onCloseModal}
			>
				<DialogTitle>
					{this.state.title}
				</DialogTitle>
				<DialogContent>
					{this.state.description}
				</DialogContent>
				<DialogActions>
				</DialogActions>
			</Dialog>
		);
	}
}

export default TodoModal;
