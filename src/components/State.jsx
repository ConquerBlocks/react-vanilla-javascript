import { useState } from "react"

const State = () => {
	const [count, setCount] = useState(0)

	return (
		<div>
			<h1>El valor de count es {count}</h1>

			<button onClick={() => setCount(count + 1)}>Incrementar</button>
			<button onClick={() => setCount(count - 1)}>Decrementar</button>
		</div>
	)
}

export default State
