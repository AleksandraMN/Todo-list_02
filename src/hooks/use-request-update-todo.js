import { useState } from "react";

export const useRequestUpdateTodo = (value, newTodo, select, refreshTodos, resetForm) => {
  const [isUpdating, setIsUpdating] = useState(false);

	const requestUpdateTodo = () => {
		setIsUpdating(true);
		if (value === '') return;

		const body = {
			...(newTodo !== '' && { title: newTodo }),
			...(select !== '' && { completed: select }),
			};

		fetch(`http://localhost:3005/todos/${value}`, {
			method: 'PATCH',
			headers: {'Content-Type': 'application/json;charset=utf-8'},
			body: JSON.stringify(body),
		})
		.then((rawResponse) => {
			if (!rawResponse.ok) {
				throw new Error('Ошибка при обновлении дела');
			}
			return rawResponse.json();
		})
		.then((response) => {
			console.log(`Дело обновлено, ответ сервера:`, response);
			refreshTodos();
			resetForm();
		})
		.catch((error) => {
			console.error('Произошла ошибка:', error);
		})
		.finally(() => setIsUpdating(false));
	};

	return {
		requestUpdateTodo,
		isUpdating,
	};
};

