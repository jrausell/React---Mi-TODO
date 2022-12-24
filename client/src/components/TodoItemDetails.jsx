import React, { useEffect } from "react";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { debounce } from "lodash";
import { useCallback } from "react";
import updateTodoRequest from "../api/updateTodoRequest";
import deleteTodoRequest from "../api/deleteTodoRequest";
import createSubTaskRequest from "../api/createSubTaskRequest";
import { SubTaskItem } from "./SubTaskItem";

//TODO: get active direct from parent?
export const TodoItemDetails = ({ todo, active, setTodoActive }) => {
	const [title, setTitle] = useState(todo.title)
	const [description, setDescription] = useState(todo.description ?? '')
	const [completed, setCompleted] = useState(todo.completed ?? false)
	const [subTasks, setSubTasks] = useState(todo.subTasks ?? [{}])

	const setActive = () => {
		active !== todo._id ? setTodoActive(todo) : setTodoActive(null);
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

	const { mutate: createSubTask } = useMutation(
		(data) => {
			return createSubTaskRequest(data.todo, data.subtask)
		},
		{
			onSettled: () => {
				queryClient.invalidateQueries('todos');
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
		if(todo.description !== description){
			setDescription(todo.description);
		}
		if(todo.completed !== completed){
			setCompleted(todo.completed);
		}
		if(todo.subTasks !== subTasks){
			setSubTasks(todo.subTasks);
		}
	}, [todo]);

	useEffect(() => {
		if (title !== todo.title) {
			debouncedUpdateTodo({
				...todo,
				title
			});
		}
		if (description !== todo.description) {
			debouncedUpdateTodo({
				...todo,
				description
			});
		}
		if (completed !== todo.completed) {
			updateTodo({
				...todo,
				completed
			});
		}
	}, [title, description, completed]);


	const addSubtask = (e) => {
		if(e.key === 'Enter' && title !== ""){
			console.log('adSub:'+e.target.value)
			createSubTask({todo, subtask: {title: e.target.value}});
			//setSubTasks([...subTasks, {title: e.target.value}])
			e.target.value = ""
		}
	}


	return (
		<div 
		className='w-1/2 absolute top-0 bottom-0 right-0 overflow-auto bg-white p-6 shadow-lg'
		onClick={(e) => e.stopPropagation()}
		>
			<div className="absolute top-0 right-0">
				<span className="p-2 font-bold" onClick={() => setTodoActive(null)}>X</span>
			</div>

			<input type="text" className="w-full font-medium text-xl mb-2" value={title} onChange={(e) => setTitle(e.target.value)} />

			<div className='mb-2'>
				<ul className='font-light text-sm'>
					<li>Creation date: {todo.createdAt ?? ' - '}</li>
					<li>Last update: {todo.updatedAt ?? ''}</li>
					<li className={`${todo.completed ? "text-green-600" : ""}`}>Task completed: {todo.completedAt ?? ' - '}</li>
				</ul>

				<span>
					<button 
					className=" text-xs border bg-gray-100 hover:bg-red-400 hover:text-white"
					onClick={() => deleteTodo(todo)}
					>Delete todo</button>
				</span>
			</div>

			<p>Description:</p>
			<div>
				<textarea 
				className='w-full border border-gray-50' 
				rows="5" 
				value={description} 
				onChange={(e) => setDescription(e.target.value)}
				/>
			</div>

			<p>Sub tasks:</p>
			<div className="flex text-gray-800 relative">
				 <span className="absolute top-0 left-2 z-0 text-gray-400">
					+
				 </span> 
				<input 
				type="text" 
				className="w-full pl-8 z-10 bg-transparent"
				placeholder="Add subtask and press Enter" 
				onKeyDown={(e) => addSubtask(e)} 
				/>
			</div>

			{subTasks.map((subTask, key) => (
				<SubTaskItem
				key={subTask._id}
				parentId={todo._id}
				subTask={subTask}
				/>
			))}
		</div>
	)
}