import React from 'react';
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import TodoListContainer from "./todo/TodoListContainer";
import AddTodoComponent from "./todo/AddTodoComponent";
import TodoModal from "./todo/TodoModal";

// КЛАССОВЫЙ КОМПОНЕНТ - ГЛАВНОЕ ХРАНИЛИЩЕ ВСЕХ ДАННЫХ
class MainComponent extends React.Component {
	// КОНСТРУКТОР КЛАССА
	constructor(props) {
		// ИНИЦИАЛИЗИРУЕМ НАСЛЕДОВАНИЕ ПО-МОДНОМУ
		super(props);
		// СОЗДАЕМ СОСТОЯНИЕ КОМПОНЕНТА - ХРАНИМ СПИСОК ТУДУШЕК
		// ТАКЖЕ ДОБАВЛЯЕМ РЕЖИМ ОТКРЫТИЯ/ЗАКРЫТИЯ ДЛЯ МОДАЛЬНОГО ОКНА
		this.state = {
			todoList: [],
			isOpenModal: null
		};

		// НЕ ЗАБЫВАЕМ ЯВНО УКАЗЫВАТЬ КОНТЕКСТ ВМЕХ ФУНКЦИЙ - МЕТОДОВ
		this.addNewTodo = this.addNewTodo.bind(this);
		this.updateTodo = this.updateTodo.bind(this);
		this.deleteTodoById = this.deleteTodoById.bind(this);
		this.loadTodos = this.loadTodos.bind(this);
		this.onCloseModal = this.onCloseModal.bind(this);
		this.onOpenModal = this.onOpenModal.bind(this);
	}

	// ФУНКЦИЯ РЕАГИРОВАНИЯ НА ЖЕЛАНИЕ ПОЛЬЗОВАТЕЛЯ ЗАКРЫТЬ МОДАЛЬНОЕ ОКНО
	onCloseModal() {
		// ОБНОВЛЯЕМ СОСТОЯНИЕ
		this.setState({
			isOpenModal: null
		});
	}

	// ФУНКЦИЯ РЕАГИРОВАНИЯ НА ЖЕЛАНИЕ ПОЛЬЗОВАТЕЛЯ ОТКРЫТЬ МОДАЛЬНОЕ ОКНО
	onOpenModal(id) {
		this.setState({
			isOpenModal: id
		});
	}

	// ФУНКЦИЯ ЗАГРУЗКИ СПИСКА ТУТШЕК С СЕРВЕРА
	loadTodos() {
		// САМ ЗАПРОС
		// ПЕРВЫЙ ПАРАМЕТР - АДРЕС ЗАПРОСА
		// ВТОРОЙ - ДОПОЛНИТЕЛЬНЫЕ НАСТРОЙКИ
		fetch('http://localhost:3000/todos', {
			method: 'GET' // ТИП ЗАПРОСА
		})
			.then((response) => response.json()) // ОБРАБОТКА ОБЕЩАНИЕ И ЧТЕНИЕ READABLE STREAM
			.then(todos => {
				// СОХРАНЯЕМ СПИСОК ТУУШЕК, ПОЛУЧЕННЫЕ С СЕРВЕРА
				this.setState({
					todoList: todos
				});
			});
	}

	// ПОСЛЕ ПЕРВОЙ ЗАГРУЗКИ КОМПОНЕНТА ОТПРАВДЯЕМ ЗАПРОС НА СЕРВЕР
	componentDidMount() {
		this.loadTodos();
	}

	// ФУНКЦИЯ, РЕАГИРУЮЩАЯ НА ЖЕЛАНИЕ ПОЛЬЗОВАТЕЛЯ ДОБАВИТЬ ТУДУШКУ
	addNewTodo(newTodoTitle) {
		// СОЗДАЕМ В ПАМЯТИ ОБЪЕКТ ТУДУШКИ ИЗ НОВЫХ ДАННЫХ
		const newTodo = {
			title: newTodoTitle,
			status: 'TODO' // DONE
		};

		// ШЛЕМ ЗАПРОС НА СЕРВЕР ДЛЯ СОЗДАНИЯ НОВОЙ ТУДУШКИ
		fetch('http://localhost:3000/todos', {
			method: 'POST',
			headers: {'Content-Type':'application/json'},
			body: JSON.stringify(newTodo) // В BODY КЛАДЕМ САМУ ТУДУШКУ НОВУЮ
		})
			.then(response => {
				// ЕСЛИ ВСЕ ОК, ТО ПЕРЕЗАГРУЖАЕМ СПИСОК ТУДУШЕК (ОБНОВЛЯЕМ - ТАМ УЖЕ БУДЕТ НОВАЯ ТУДУШКА)
				if (response.status === 200) {
					this.loadTodos();
				}
			})
	}

	// ФУНКЦИЯ, РЕАГИРУЮЩАЯ НА ЖЕЛАНИЕ ПОЛЬЗОВАТЕЛЯ ОБНОВИТЬ УЖЕ СУЩЕСТВУЮЩУЮ ТУДУШКУ
	updateTodo(newData) {
		fetch(`http://localhost:3000/todos/${newData.id}`, {
			method: 'PUT',
			headers: {'Content-Type':'application/json'},
			body: JSON.stringify(newData) // ДАННЫЕ ДЛЯ ОБНОВЛЕНИЯ
		})
			.then(response => {
				if (response.status === 200) {
					this.loadTodos();
				}
			})
	}

	// ФУНКЦИЯ, РЕАГИРУЮЩАЯ НА ЖЕЛАНИЕ ПОЛЬЗОВАТЕЛЯ УДАЛИТЬ УЖЕ ТУДУШКУ
	deleteTodoById(id) {
		fetch(`http://localhost:3000/todos/${id}`, {
			method: 'DELETE'
		})
			.then(response => {
				// ЕСЛИ ВСЕ ОК УДАЛИЛОСЬ, ТО НАДО ОБНОВИТЬ СПИСОК - ТАМ НЕ УДЕТ ОДНОЙ ИЗ ТУДУШЕК
				if (response.status === 200) {
					this.loadTodos();
				}
			})
	}

	render() {
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
							{/* КОМПОНЕНТ С  ЛОГИКОЙ ДОБАВЛЕНИЯ ТУДУШКИ */}
							<AddTodoComponent addNewTodo={this.addNewTodo}/>
							{/* КОМПОНЕНТ СО СПИСКОМ ТУДУШЕК*/}
							<TodoListContainer  todoList={this.state.todoList}
							                    updateTodo={this.updateTodo}
							                    deleteTodoById={this.deleteTodoById}
							                    onOpenModal={this.onOpenModal}
							/>
						</Card>
					</Grid>
				</Grid>
				{/* МОДАЛЬКА */}
				{!!this.state.isOpenModal && (
					<TodoModal onCloseModal={this.onCloseModal}
					           todoId={this.state.isOpenModal}
					           loadTodos={this.loadTodos}
					/>
				)}
			</>
		);
	}
}

export default MainComponent;
