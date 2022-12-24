import React, { useState } from 'react';
import { useMutation, useQueryClient } from "react-query";
import createTodoRequest from "../api/createTodoRequest";

export const CreateTodoForm = ({setTodoActive}) => {
	const [newTodoTitle, setNewTodoTitle] = useState('');
	const queryClient = useQueryClient();

	const { mutate: createTodo } = useMutation(
		(newTodo) => createTodoRequest(newTodo),
		{
		  onSettled: () => {
			 queryClient.invalidateQueries('todos');
			 console.log('invalidateQueries createTodoRequest')
		  },
		}
	);

	const handleKeyDown = (e) => {
		if (e.key === 'Enter') {
			createTodo({
				title: newTodoTitle
			})
			setNewTodoTitle('')
		}
	}

    return (
        <div
		  className='ml-2'
        onClick={(e) => e.stopPropagation() }
        >
            <input 
            type="text" 
            className='w-full p-1'
            placeholder='+    Create New Task'
				onFocus={(e) => {e.target.placeholder = "->    Write your New Task and press Enter"}}
				onBlur={(e) => {e.target.placeholder = "+    Create New Task"}}
            value={newTodoTitle} 
            onClick={() => setTodoActive(null)}
            onChange={(e) => setNewTodoTitle(e.target.value)}
            onKeyDown={handleKeyDown} />
        </div>
    )
}