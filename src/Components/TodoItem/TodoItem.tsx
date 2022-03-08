import './TodoItem.scss';
import moment from 'moment';
import { FC, useState } from 'react';
import { FormCheck } from 'react-bootstrap';
import TodoModal from '../TodoModal/TodoModal';
import useStore from '../../Tools/Store/useStore';
import { PencilIcon } from '@heroicons/react/solid';
import useLocalData from '../../Tools/Hooks/useLocalData';
import { addOrUpdateTodo } from '../../Tools/Store/actions/LocalDataActions';

const TodoItem: FC<TodoItemPropType> = ({ todoId }) => {
	const { dispatch } = useStore();
	const { todos, categories } = useLocalData();
	const [open, setOpen] = useState(false);

	const todo = todos?.find(t => t?.todoId === todoId);

	const { title, categories: todoCategories, date, isDone, description }: any = todo;

	const onCheckHandler = () => {
		dispatch(
			addOrUpdateTodo({
				todoId,
				isDone: !isDone,
			})
		);
	};

	return (
		<div className={`todo-item ${!!isDone ? 'todo-item-done' : ''}`}>
			<FormCheck checked={isDone} onChange={onCheckHandler} />
			<div onClick={() => setOpen(true)} className='title'>
				<span>{title}</span>
				{description && <div className='description'>{description}</div>}
				<div className='sub-title'>
					{!!date && (
						<div className='todo-item-date'>
							{moment(date)?.format('YYYY/MM/DD - hh:mm A')}
						</div>
					)}
					{todoCategories
						?.map(
							(catId: string) => categories?.find(c => c?.categoryId === catId)?.name
						)
						?.filter((c: any) => !!c)
						?.map((catName: string, i: number) => (
							<div
								key={catName + i}
								className='todo-item-category'
								onClick={e => e?.stopPropagation()}>
								{catName}
							</div>
						))}
				</div>
			</div>

			<div className='right-box'>
				<PencilIcon onClick={() => setOpen(true)} className='todo-item-edit' />
			</div>
			<TodoModal {...{ open, setOpen, todoId }} />
		</div>
	);
};

type TodoItemPropType = {
	todoId?: string;
};

export default TodoItem;
