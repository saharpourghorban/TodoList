import { createReducer } from '@reduxjs/toolkit';

import {
	removeTodo,
	removeCategory,
	addOrUpdateTodo,
	addOrUpdateCategory,
} from '../actions/LocalDataActions';

type initStateType = { todos: TodoType[]; categories: CategoryType[] };

const initState: initStateType = { todos: [], categories: [] };

const LocalStorageReducer = createReducer(initState, {
	//* --------------------------------------Todo-------------------------------------------
	[addOrUpdateTodo.type]: (state, { payload }) => {
		const data = payload as TodoType;
		let todos = [...(state?.todos || [])];
		const oldDataIndex = todos?.findIndex(t => t?.todoId === data?.todoId);
		if (oldDataIndex >= 0) todos[oldDataIndex] = { ...todos[oldDataIndex], ...data };
		else todos?.push(data);
		return { ...state, todos };
	},
	[removeTodo.type]: (state, { payload }) => {
		return {
			...state,
			todos: [...(state?.todos || [])]?.filter(t => t?.todoId !== payload),
		};
	},

	//* --------------------------------------Category-------------------------------------------
	[addOrUpdateCategory.type]: (state, { payload }) => {
		const data = payload as CategoryType;
		let categories = [...(state?.categories || [])];
		const oldDataIndex = categories?.findIndex(c => c?.categoryId === data?.categoryId);
		if (oldDataIndex >= 0) categories[oldDataIndex] = { ...categories[oldDataIndex], ...data };
		else categories?.push(data);
		return { ...state, categories };
	},
	[removeCategory.type]: (state, { payload }) => {
		return {
			...state,
			categories: [...(state?.categories || [])]?.filter(t => t?.categoryId !== payload),
		};
	},
});

export type TodoType = {
	date?: Date;
	title?: string;
	todoId?: string;
	isDone?: boolean;
	description?: string;
	categories?: string[];
};

export type CategoryType = {
	name?: string;
	categoryId?: string;
};

export default LocalStorageReducer;
