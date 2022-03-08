import { createAction } from '@reduxjs/toolkit';
import { TodoType, CategoryType } from '../reducers/LocalDataReducer';

export const removeTodo = createAction<string>('removeTodo');
export const addOrUpdateTodo = createAction<TodoType>('addOrUpdateTodo');

export const removeCategory = createAction<string>('removeCategory');
export const addOrUpdateCategory = createAction<CategoryType>('addOrUpdateCategory');
