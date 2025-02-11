import { useState } from "react";

export const useRequestAddTodo = (newTodo, refreshTodos, resetForm) => {
	const [isCreating, setIsCreating] = useState(false);
	const [error, setError] = useState(null);

	const requestAddTodo = () => {
		setIsCreating(true);

		if (newTodo === '') return;
		fetch(`http://localhost:3005/todos`, {
			method: 'POST',
			headers: {'Content-Type': 'application/json;charset=utf-8'},
			body: JSON.stringify({
				title: newTodo,
				completed: false,
			}),
		})
			.then((rawResponse) => {
				if (!rawResponse.ok) {
					throw new Error('Ошибка при добавлении дела');
				}
			 return rawResponse.json();
	    })
			.then((response) => {
				console.log(`Дело добавлено, ответ сервера:`, response);
				refreshTodos();
				resetForm();
			})
			.catch((error) => {
				setError(error.message);
				console.error('Произошла ошибка:', error);
			})
			.finally(() => setIsCreating(false));
	};

	return {
		requestAddTodo,
		isCreating,
		error,
	};
};

