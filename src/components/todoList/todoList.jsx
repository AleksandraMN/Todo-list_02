import React from 'react';
import styles from './todoList.module.css';
import PropTypes from 'prop-types';


export const TodoList = ({isLoading, sortedTodos, error}) => {
	return (
		<div >
			<h1>Список дел</h1>
			{isLoading ? (
				<div className={styles.loader}></div>
			) :  error ? (
        <div>{error}</div>
      ) : (
				<ul>
					{sortedTodos?.map((todo) => (
						<li
							key={todo.id}
							className={todo.completed === 'true' ? styles.completed : ''}
						>
							{todo.id}. {todo.title}.
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

TodoList.propTypes = {
  isLoading: PropTypes.bool,
  sortedTodos: PropTypes.array,
  todos: PropTypes.array,
  error: PropTypes.string,
};
