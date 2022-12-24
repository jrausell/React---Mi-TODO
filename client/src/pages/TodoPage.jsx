import React, { useContext } from 'react';
import { useState } from 'react';
import { QueryClient, useMutation, useQuery } from 'react-query';
import readTodosRequest from '../api/readTodosRequest';
import { TodoItem } from '../components/TodoItem';
import { TodoItemDetails } from '../components/TodoItemDetails';
import { CreateTodoForm } from '../components/CreateTodoForm';


const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});

export const TodoPage = () => {

	const [todoActive, setTodoActive] = useState(null);

	const { isLoading, isError, data: todos } = useQuery({
		queryKey: 'todos',
		queryFn: () => readTodosRequest(),
		refetchOnWindowFocus: false,
		onSuccess: (data) => {
			console.log('re fetch', data)

			if (todoActive !== null) {
				let newActiveData = data.find(tod => todoActive._id === tod._id)
				if (newActiveData) {
					setTodoActive(newActiveData);
					//console.log('newActiveData', newActiveData, todoActive)
				} else {
					console.log('not found: new todoActive', todoActive._id)
				}
			}
		}
	});


	return (
			<div className='flex w-full relative justify-center content-center'
			onClick={() => { setTodoActive(null); console.log('wrap click') }}>
				<div className="w-3/5 p-4">
	
					<CreateTodoForm setTodoActive={setTodoActive} />
	
					{isLoading ? (
						'Loading ...'
					) : (
						todos.map((todo) => (
							<TodoItem
								key={todo._id}
								todo={todo}
								active={todoActive ? todoActive._id : null}
								setTodoActive={setTodoActive}
							/>
						)
						)
					)
					}
	
				{(!isLoading && todoActive !== null) ? (
					<TodoItemDetails
						todo={todoActive}
						active={todoActive ? todoActive._id : null}
						setTodoActive={setTodoActive}
					/>
				) : null}
	
			</div>
			</div>
	)
}