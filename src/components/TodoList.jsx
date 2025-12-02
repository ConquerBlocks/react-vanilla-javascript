import { useState, useEffect } from "react"
import TodoItem from "./TodoItem"

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
		<div className="flex flex-col container mx-auto max-w-md pt-19 text-white">
			<input
				className="w-full p-2 rounded-md border border-gray-300"
				type="text"
				placeholder="Nueva tarea"
				value={newTodo}
				onChange={handleInputChange}
			/>

			<button
				onClick={handleAddTodo}
				className="w-full p-2 rounded-md border border-gray-300"
			>
				Agregar
			</button>

			<ul className="w-full p-2 mt-20 list-disc">
				{todos.map((todo, index) => (
					<TodoItem key={index} todo={todo} />
				))}
			</ul>
		</div>
	)
}

export default TodoList
