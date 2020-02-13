import React from 'react';
import back from '../../assets/back.jpg';
import TodoComponent from "./TodoComponent";


// ЗАДАЧА ЭТОГО КОМПОНЕНТА - ОТРИСОВАТЬ ВСЕ ТУДУШКИ
function TodoListContainer(props) {
	const {todoList, updateTodo, deleteTodoById, onOpenModal} = props; // array of todo's
	return (
		<div style={{
				 position: 'relative',
				 background: `url(${back})`,
				 height: '100vh',
				 padding: '10px'
			 }}
		>
			{/* ПРОЦЕСС ОТРИСОВКИ ВСЕХ ТУДУШЕК */}
			{
				!!todoList.length
				&& (
					todoList.map(todo => (
						<TodoComponent key={todo.id}
						               todo={todo}
						               updateTodo={updateTodo}
						               deleteTodoById={deleteTodoById}
						               onOpenModal={onOpenModal}
						/>
					))
				)
			}
		</div>
	);
}

export default TodoListContainer;
