import React from 'react';
import back from '../../assets/back.jpg';

function TodoListContainer(props) {
	const {todoList} = props; // array of todo's
	return (
		<div style={{
				 position: 'relative',
				 background: `url(${back})`,
				 height: '100vh'
			 }}
		>
			{
				!!todoList.length
				&& (
					todoList.map(todo => (
						<div key={todo.id}
							 className="todo"
						>
							{todo.title}
						</div>
						// границы
						// заливка
						// тени
						// паддинги (внутренние отступы)
						// дисплей флекс
						// марджины
					))
				)
			}
		</div>
	);
}

export default TodoListContainer;
