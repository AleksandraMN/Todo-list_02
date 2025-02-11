import { useState } from "react";


export const useRequestDeleteTodo = (value, refreshTodos, resetForm) => {
	const [isDeleting, setIsDeleting] = useState(false);

	const requestDeleteTodo = () => {
		setIsDeleting(true);

		if (value === '') return;

		fetch(`http://localhost:3005/todos/${value}`, {
			method: 'DELETE',
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error('Ошибка при удалении дела');
				}
				console.log('Дело удалено, ответ сервера:', response);
				refreshTodos();
				resetForm();
			})
			.catch((error) => {
				console.error('Произошла ошибка:', error);
			})
			.finally(() => setIsDeleting(false));
		};

		return {
		requestDeleteTodo,
		isDeleting,
		};
};
