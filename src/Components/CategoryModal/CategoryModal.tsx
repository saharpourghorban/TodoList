import useInputs from 'use-inputs';
import { FC, useEffect } from 'react';
import { uid } from '../../Tools/Utils/String';
import useStore from '../../Tools/Store/useStore';
import useLocalData from '../../Tools/Hooks/useLocalData';
import { Modal, Button, FormControl, InputGroup } from 'react-bootstrap';
import { addOrUpdateCategory, removeCategory } from '../../Tools/Store/actions/LocalDataActions';

const CategoryModal: FC<CategoryModalPropType> = ({ categoryId, open, setOpen }) => {
	const { dispatch } = useStore();
	const { categories } = useLocalData();
	const { register, Inputs, resetInputs } = useInputs();

	const category: any =
		!(categoryId === 'new') && categories?.find(c => c?.categoryId === categoryId);
	const isNew = !category;

	useEffect(() => {
		resetInputs();
	}, [open]);

	const closeModal = () => setOpen?.(false);

	const addOrUpdateHandler = () => {
		dispatch(
			addOrUpdateCategory({
				name: Inputs?.name?.value,
				categoryId: isNew ? uid() : categoryId,
			})
		);
		closeModal();
	};

	const removeHandler = () => {
		dispatch(removeCategory(category?.categoryId));
		closeModal();
	};

	return (
		<Modal show={open} onHide={closeModal} centered>
			<Modal.Header closeButton>
				<Modal.Title>{isNew ? 'New Category' : 'Edit Category'}</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				<InputGroup>
					<FormControl
						{...register('name', { defaultValue: category?.name })}
						placeholder='Category Name'
					/>
				</InputGroup>
			</Modal.Body>

			<Modal.Footer>
				<Button onClick={closeModal} variant='secondary'>
					Cancel
				</Button>
				{!isNew && (
					<Button onClick={removeHandler} variant='danger'>
						Remove
					</Button>
				)}
				<Button
					disabled={!Inputs?.name?.value}
					onClick={addOrUpdateHandler}
					variant='primary'>
					Save
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

type CategoryModalPropType = {
	open?: boolean;
	setOpen?: Function;
	categoryId?: string;
};

export default CategoryModal;
