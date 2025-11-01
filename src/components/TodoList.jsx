import { useState, useEffect } from "react"
import TodoItem from "./TodoItem"
import "./TodoList.css"

const TodoList = () => {
	const [todos, setTodos] = useState([])

	const [newTodo, setNewTodo] = useState("")

	const handleInputChange = (e) => {
		setNewTodo(e.target.value)
	}

	useEffect(() => {
		const savedTodos = JSON.parse(localStorage.getItem("todos")) || []
		setTodos(savedTodos)
	}, [])

	useEffect(() => {
		document.title = `Mis Tareas (${todos.length})`
	}, [todos])

	useEffect(() => {
		const handleEnter = (e) => {
			if (e.key !== "Enter") {
				return
			}
			handleAddTodo()
		}

		window.addEventListener("keydown", handleEnter)

		return () => window.removeEventListener("keydown", handleEnter)
	}, [todos, newTodo])

	const handleAddTodo = () => {
		const newTodoItem = {
			text: newTodo,
			completed: false,
		}

		const newTodos = [...todos, newTodoItem]

		setTodos(newTodos)

		addToLocalStorage(newTodos)

		setNewTodo("")
	}

	const addToLocalStorage = (arrTodos) => {
		localStorage.setItem("todos", JSON.stringify(arrTodos))
	}

	return (
		<div>
			<input
				type="text"
				placeholder="Nueva tarea"
				value={newTodo}
				onChange={handleInputChange}
			/>

			<button onClick={handleAddTodo}>Agregar</button>

			<ul className="todo-list">
				{todos.map((todo, index) => (
					<TodoItem key={index} todo={todo} />
				))}
			</ul>
		</div>
	)
}

export default TodoList
