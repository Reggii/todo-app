import { useState, useEffect, useRef } from 'react';
import plus_light from './plus-light.png'
import plus_dark from './plus-dark.png'

const API_BASE = 'http://localhost:3000';

function App() {
	const [todos, setTodos] = useState([]);
	const [popup, setPopupActive] = useState(false);
	const [over, setOver] = useState(false);
	const [newTodo, setNewTodo] = useState('');

	const inputRef = useRef(null);

	useEffect(() => {
		GetTodos();
	}, []);

	const GetTodos = () => {
		fetch(API_BASE + '/todos')
			.then((res) => res.json())
			.then((data) => setTodos(data))
			.catch((err) => console.error('Error: ', err));
	}

	const addToDo = async (text) => {
		console.log(text)
		const data = await fetch(API_BASE + '/todos/new', {
			method: "POST",
			body: JSON.stringify({
				'text': text
			}),
			headers: {
				'Content-type': 'application/json',
			},
		}).then(res => res.json())

		setTodos([...todos, data])
		inputRef.current.value = ""
	}

	const completeTodo = async (id) => {
		const data = await fetch(API_BASE + '/todos/complete/' + id)
			.then((res) => res.json())

		setTodos(todos.map((todo) => {
			if (todo._id === data._id) {
				todo.complete = data.complete;
			}
			return todo;
		}))
	}

	const deleteTodo = async (id) => {
		const data = await fetch(API_BASE + '/todos/delete/' + id, { method: 'DELETE' }) 
			.then((res) => res.json())

		setTodos(todos => 
			todos.filter(todo => 
				todo._id !== data._id))
	}
	return (
		<div className="App">
			<h1>Hi, $User</h1>
			<div className='addToDo'>
					<input type="text" ref={inputRef} className='addInput' placeholder='Enter a new todo'></input>
					<button className='submitToDo' type='submit'
					onClick={ () => addToDo(inputRef.current.value)}>
						Submit</button>
					<button className='cancelToDo'
					>
						Cancel</button>
			</div>
			<h4>Your Tasks</h4>
			<div className=" todos">
				{todos.map((todo) => (
				<div className={
					"todo" + (todo.complete ? " is-complete": "")
					} key={ todo._id } onClick={ () => completeTodo(todo._id)}>
					<div className="checkbox"></div>

					<div className="text">{ todo.text }</div> 

					<div className="delete-todo"
						onClick={(e) => { 
						e.stopPropagation()
						deleteTodo(todo._id) }}>
					X</div>
				</div>
				))}
			</div>
			<div className='addToDobtn'
				onMouseOver={() => setOver(true)}
				onMouseOut={() => setOver(false)}
				>
				<img 
				src={over ? plus_dark : plus_light} alt='add' 
				onClick={() => setPopupActive(!popup)}></img>
			</div>
		</div>
	);
}

export default App;
