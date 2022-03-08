import './TodoModal.scss';
import useInputs from 'use-inputs';
import { uid } from '../../Tools/Utils/String';
import { FC, useEffect, useState } from 'react';
import useStore from '../../Tools/Store/useStore';
import useLocalData from '../../Tools/Hooks/useLocalData';
import { Modal, Button, FormControl, InputGroup } from 'react-bootstrap';
import CategoriesDropDown from '../CategoriesDropDown/CategoriesDropDown';
import { addOrUpdateTodo, removeTodo } from '../../Tools/Store/actions/LocalDataActions';

const TodoModal: FC<TodoModalPropType> = ({ todoId, open, setOpen }) => {
	const { dispatch } = useStore();
	const { todos } = useLocalData();
	const { register, Inputs, resetInputs } = useInputs();
	const [categories, setCategories] = useState<string[]>([]);

	const todo: any = !(todoId === 'new') && todos?.find(t => t?.todoId === todoId);
	const isNew = !todo;

	const isTitleExist = !!todos?.find(
		t =>
			t?.title?.toLocaleLowerCase() === Inputs?.title?.value?.toLocaleLowerCase() &&
			todoId !== t?.todoId
	);

	useEffect(() => {
		resetInputs();
	}, [open]);

	const closeModal = () => setOpen?.(false);

	const addOrUpdateHandler = () => {
		dispatch(
			addOrUpdateTodo({
				categories,
				date: new Date(),
				title: Inputs?.title?.value,
				description: Inputs?.description?.value,
				todoId: isNew ? uid() : todoId,
			})
		);
		closeModal();
	};

	const removeHandler = () => {
		dispatch(removeTodo(todo?.todoId));
		closeModal();
	};

	return (
		<Modal className='todo-modal' show={open} onHide={closeModal} centered>
			<Modal.Header closeButton>
				<Modal.Title>{isNew ? 'New Todo' : 'Edit Todo'}</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				<InputGroup>
					<FormControl
						placeholder='Title'
						{...register('title', { defaultValue: todo?.title })}
					/>
				</InputGroup>
				{isTitleExist && (
					<div className='todo-modal-error-unique'>Title must be unique</div>
				)}

				<InputGroup className='description'>
					<FormControl
						as='textarea'
						placeholder='Description'
						{...register('description', { defaultValue: todo?.description })}
					/>
				</InputGroup>
			</Modal.Body>

			<Modal.Footer>
				<CategoriesDropDown
					defaultChecked={todo?.categories || []}
					onCheck={catIds => setCategories(catIds || [])}
				/>
				<Button onClick={closeModal} variant='secondary'>
					Cancel
				</Button>
				{!isNew && (
					<Button onClick={removeHandler} variant='danger'>
						Remove
					</Button>
				)}
				<Button
					disabled={!Inputs?.title?.value || isTitleExist}
					onClick={addOrUpdateHandler}
					variant='primary'>
					Save
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

type TodoModalPropType = {
	open?: boolean;
	todoId?: string;
	setOpen?: Function;
};

export default TodoModal;
