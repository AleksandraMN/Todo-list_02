import { useEffect, useState } from "react";

export const useRequestGetTodo = (refreshTodosFlag) => {
  const [todos, setTodos] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

		useEffect(() => {
			setIsLoading(true);

			fetch('http://localhost:3005/todos')
				.then((data) => {
					if (!data.ok) {
						throw new Error('Ошибка при загрузке дел');
					}
					return data.json();
				})
				.then((loadedTodo) => {
					setTodos(loadedTodo);
				})
				.catch((err) => {
					setError(err.message);
					console.error('Произошла ошибка:', err);
				})
				.finally(() => setIsLoading(false));
		}, [refreshTodosFlag]);

		return {
			todos,
			isLoading,
			error,
		};
	};



