import './Assets/scss/App.scss';
import { useState } from 'react';
import useInputs from 'use-inputs';
import './Assets/scss/base/export.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { PlusIcon } from '@heroicons/react/solid';
import TodoItem from './Components/TodoItem/TodoItem';
import useLocalData from './Tools/Hooks/useLocalData';
import TodoModal from './Components/TodoModal/TodoModal';
import { Button, FormControl, InputGroup } from 'react-bootstrap';
import CategoriesDropDown from './Components/CategoriesDropDown/CategoriesDropDown';

const App = () => {
	const { todos } = useLocalData();
	const { Inputs, register } = useInputs();
	const [open, setOpen] = useState<boolean>(false);
	const [categories, setCategories] = useState<string[]>([]);

	//? Search Filter
	let filteredTodos = [...todos]?.filter(t => {
		const searchInputValue = Inputs?.search?.value;
		if (!searchInputValue) return true;
		return t?.title?.toLocaleLowerCase()?.includes(searchInputValue?.toLocaleLowerCase());
	});

	//? Categories Filter
	filteredTodos = filteredTodos?.filter(t => {
		if (categories?.length === 0) return true;
		return categories?.every(catId => t?.categories?.includes(catId));
	});

	//? Sort by Done Todos
	filteredTodos = filteredTodos?.sort((a, b) => (!!b?.isDone ? 0 : 1) - (!!a?.isDone ? 0 : 1));

	return (
		<div className='app-layout'>
			<div className='app-box'>
				<div className='todo-header'>
					<h3>Todos</h3>
					<CategoriesDropDown onCheck={catIds => setCategories(catIds || [])} />
					<Button onClick={() => setOpen(true)}>
						<PlusIcon />
						Add TODO
					</Button>
				</div>
				<InputGroup>
					<FormControl
						{...register('search')}
						placeholder='Search...'
						aria-label="Recipient's username"
						aria-describedby='basic-addon2'
					/>
				</InputGroup>
				<div className='todo-items'>
					{filteredTodos?.length === 0 && !!Inputs?.search?.value && (
						<div className='todo-items-no-result'>Nothing Found</div>
					)}
					{filteredTodos?.map(t => (
						<TodoItem key={t?.todoId} todoId={t?.todoId} />
					))}
				</div>
			</div>

			<TodoModal todoId='new' {...{ open, setOpen }} />
		</div>
	);
};

export default App;
