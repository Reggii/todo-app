import { useState, useEffect } from 'react';

const API_BASE = 'http://localhost:3000';

function App() {
	const [todos, setTodos] = useState([]);
	const [popup, setPopupActive] = useState(false);
	const [newTodo, setNewTodo] = useState('');

	useEffect(() => {
		GetTodos();
	}, []);

	const GetTodos = () => {
		fetch(API_BASE + '/todos')
			.then((res) => res.json())
			.then((data) => {
				setTodos(data);
			})
			.catch((err) => {
				console.error('Error: ', err);
			})

	}
	if (typeof window !== 'undefined') { 
		console.log(todos);
	 }
	return (
		<div className="App">
			<h1>Hi, $User</h1>
			<h4>Your Tasks</h4>
			<div className=" todos">
				<div className="todo">
					<div className="checkbox"></div>

					<div className="text">File your taxes</div> 

					<div className="delete-todo">X</div>
				</div>

				<div className="todo is-complete">
					<div className="checkbox"></div>
					
					<div className="text">Go to the dentist</div> 

					<div className="delete-todo">X</div>
				</div>
			</div>
		</div>
	);
}

export default App;
