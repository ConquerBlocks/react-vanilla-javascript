import { useState } from "react"

const Formulario = () => {
	const [name, setName] = useState("")

	const handleChange = (e) => {
		const userName = e.target.value
		setName(userName)
	}

	return (
		<div>
			<input type="text" value={name} onChange={handleChange} />
			<p>Hola {name || "Invitado"}</p>
		</div>
	)
}

export default Formulario
