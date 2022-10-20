import { Routes, Route } from 'react-router-dom'
import AdministracaoRestaurantes from './paginas/Administracao'
import AdministracaoNovo from './paginas/Administracao/novo'
import Home from './paginas/Home'
import VitrineRestaurantes from './paginas/VitrineRestaurantes'

function App() {

	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/restaurantes" element={<VitrineRestaurantes />} />
			<Route path="/admin/restaurantes" element={<AdministracaoRestaurantes />} />
			<Route path="/admin/restaurantes/novo" element={<AdministracaoNovo />} />
			<Route path="/admin/restaurantes/:id" element={<AdministracaoNovo />} />
			<Route path="*" element={<Home />} />
		</Routes>
	)
}

export default App
