import React, { useEffect } from "react";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { debounce } from "lodash";
import { useCallback } from "react";
import updateSubTaskRequest from "../api/updateSubTaskRequest";
import deleteSubTaskRequest from "../api/deleteSubTaskRequest";

export const SubTaskItem = ({ parentId, subTask }) => {
	const [title, setTitle] = useState(subTask.title)
	const [completed, setCompleted] = useState(subTask.completed)

	const queryClient = useQueryClient();

	const { mutate: updateSubTask } = useMutation(
		(updatedSubTask) => updateSubTaskRequest(parentId, updatedSubTask),
		{
			onSettled: () => {
				queryClient.invalidateQueries('todos');
			},
		}
	)

	const { mutate: deleteSubTask } = useMutation(
		(deletedSubTask) => deleteSubTaskRequest(parentId, deletedSubTask),
		{
			onSettled: () => {
				queryClient.invalidateQueries('todos');
				setSubTaskActive(null);
			},
		}
	)

	const debouncedUpdateSubTask = useCallback(
		debounce(updateSubTask, 600),
		[updateSubTask]
	);

	useEffect(() => {
		if(subTask.title !== title){
			setTitle(subTask.title);
		}
		if(subTask.completed !== completed){
			//setCompleted(subTask.completed);
		}
	}, [subTask]);

	useEffect(() => {
		if (title !== subTask.title) {
			debouncedUpdateSubTask({
				...subTask,
				title
			});
		}
		if (completed !== subTask.completed) {
			updateSubTask({
				...subTask,
				completed
			});
		}
	}, [title, completed]);


	const cssItem = [
		'todoSubtask',
		'flex w-full text-left break-normal border-b p-1',
		'hover:border-b-gray-200',
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
			>
				<input 
				type="text" 
				className={`${completed ? "line-through" : ""} w-full p-1 bg-transparent focus:bg-white`} 
				value={title} 
				onFocus={(e) => setTitle(e.target.value)} 
				onChange={(e) => setTitle(e.target.value)} 
				/>
			</span>
			<span className="px-2 border-l">
				<button 
				className="todoSubtask__delete border hidden bg-gray-100 hover:bg-red-400 hover:text-white"
				onClick={() => deleteSubTask(subTask)}
				>Del</button>
			</span>
		</div>
	)
}