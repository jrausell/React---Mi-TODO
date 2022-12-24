import React, { useEffect } from "react";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { debounce } from "lodash";
import { useCallback } from "react";
import updateTodoRequest from "../api/updateTodoRequest";
import deleteTodoRequest from "../api/deleteTodoRequest";

//TODO: get active direct from parent?
export const TodoItem = ({ todo, active, setTodoActive }) => {
	const [title, setTitle] = useState(todo.title)
	const [completed, setCompleted] = useState(todo.completed)

	const setActive = () => {
		if(active !== todo._id){
			setTodoActive(todo);
		}else{
			//setTodoActive(null);
		}
	}

	const queryClient = useQueryClient();

	const { mutate: updateTodo } = useMutation(
		(updatedTodo) => updateTodoRequest(updatedTodo),
		{
			onSettled: () => {
				queryClient.invalidateQueries('todos');
			},
		}
	)

	const { mutate: deleteTodo } = useMutation(
		(deletedTodo) => deleteTodoRequest(deletedTodo),
		{
			onSettled: () => {
				queryClient.invalidateQueries('todos');
				setTodoActive(null);
			},
		}
	)

	const debouncedUpdateTodo = useCallback(
		debounce(updateTodo, 600),
		[updateTodo]
	);

	useEffect(() => {
		if(todo.title !== title){
			setTitle(todo.title);
		}
		if(todo.completed !== completed){
			//setCompleted(todo.completed);
		}
	}, [todo]);

	useEffect(() => {
		if (title !== todo.title) {
			debouncedUpdateTodo({
				...todo,
				title
			});
		}
		if (completed !== todo.completed) {
			updateTodo({
				...todo,
				completed
			});
		}
	}, [title, completed]);


	const cssItem = [
		'todoItem',
		'flex w-full text-left break-normal border-b p-1',
		'hover:border-b-gray-200',
		` ${active === todo._id ? "todo__active border-b-gray-400 bg-indigo-50" : "border-b-gray-50 hover:bg-gray-50"} `,
		`${completed ? "opacity-50" : ""}`
	];

	return (
		<div 
		className={cssItem.join(' ')} 
		onClick={(e) => e.stopPropagation() }
		>
			<span className="flex-no-shrink mr-2 p-1">
				<input className="" type="checkbox" onChange={() => { setCompleted(!completed) }} checked={completed} />
			</span>
			<span 
			className="w-full"
			onClick={() => setActive()}
			>
				<input 
				type="text" 
				className={`${completed ? "line-through text-gray-400" : ""} w-full p-1 bg-transparent focus:bg-white`} 
				value={title} 
				onFocus={(e) => setTitle(e.target.value)} 
				onChange={(e) => setTitle(e.target.value)} 
				/>
			</span>
			<span className="w-20 text-right px-2 border-l">
				{(todo.subTasks && todo.subTasks.length > 0) ? `${todo.subTasks.filter(sub => sub.completed === true).length}/${todo.subTasks.length}` : ''}
			</span>
			<span className="px-2 border-l">
				<button 
				className="todoItem__delete border hidden bg-gray-100 hover:bg-red-400 hover:text-white"
				onClick={() => deleteTodo(todo)}
				>Del</button>
			</span>
		</div>
	)
}