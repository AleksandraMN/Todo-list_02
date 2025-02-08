import styles from './app.module.css';
import { useState } from 'react';
import { TodoList } from './components/todoList';
import { Button } from './components/button';
import { SelectModule } from './components/select';
import { Input } from './components/input';
import { debounceRaf } from './utils';
import {
	useRequestAddTodo,
	useRequestDeleteTodo,
	useRequestGetTodo,
	useRequestUpdateTodo,
} from './hooks';
import { handleOnChange, onChange } from './handlers';

export const App = () => {
	const [newTodo, setNewTodo] = useState('');
	const [refreshTodosFlag, setRefreshTodosFlag] = useState(false);
	const [value, setValue] = useState('');
	const [select, setSelect] = useState('');
	const [searchTerm, setSearchTerm] = useState('');
	const [isSorted, setIsSorted] = useState(false);

	const refreshTodos = () => setRefreshTodosFlag(!refreshTodosFlag);

	const { todos, isLoading, error } = useRequestGetTodo(refreshTodosFlag);
	const { requestAddTodo, isCreating } = useRequestAddTodo(
		newTodo,
		refreshTodos,
		setNewTodo,
		setSelect,
		setValue,
	);
	const { requestUpdateTodo, isUpdating } = useRequestUpdateTodo(
		value,
		newTodo,
		select,
		refreshTodos,
		setNewTodo,
		setSelect,
		setValue,
	);
	const { requestDeleteTodo, isDeleting } = useRequestDeleteTodo(
		value,
		refreshTodos,
		setNewTodo,
		setSelect,
		setValue,
	);

	const handleSearch = debounceRaf((term) => {
		setSearchTerm(term);
	}, 300);

	const filteredTodos = todos.filter((todo) =>
		todo.title.toLowerCase().includes(searchTerm.toLowerCase()),
	);
	const sortedTodos = isSorted
		? [...filteredTodos].sort((a, b) => a.title.localeCompare(b.title))
		: filteredTodos;

	return (
		<div className={styles.app}>
			
			<TodoList
				isLoading={isLoading}
				sortedTodos={sortedTodos}
				todos={todos}
				error={error}
			/>

			<Input
				placeholder='Введите наименование дела для добавления или обновления.'
				type="text"
				value={newTodo}
				onChange={({ target }) => onChange({ target }, setNewTodo)}
			/>

			<Input
				placeholder='Введите номер дела для обновления или удаления.'
				type="number"
				value={value}
				onChange={({ target }) => handleOnChange({ target }, setValue)}
			/>

			<SelectModule setSelect={setSelect} />

			<Button
				onClick={requestAddTodo}
				disabled={isCreating}
			>
				Добавить новое дело
			</Button>

			<Button
				onClick={requestUpdateTodo}
				disabled={isUpdating}
			>
			  Обновить дело
      </Button>

			<Button
				onClick={requestDeleteTodo}
				disabled={isDeleting}
			>
			  Удалить дело
      </Button>

			<Input
				type={'text'}
				onChange={(e) => handleSearch(e.target.value)}
				placeholder="Поиск дел"
			/>

			<Button onClick={() => setIsSorted(!isSorted)}>
				{isSorted ? 'Снять сортировку' : 'Сортировать по алфавиту'}
			</Button>
		</div>
	);
};
