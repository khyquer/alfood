import { Routes, Route } from 'react-router-dom'
import AdministracaoRestaurantes from './paginas/Administracao'
import AdministracaoNovo from './paginas/Administracao/novo'
import PaginaBase from './paginas/Administracao/PaginaBase'
import AdministracaoPratos from './paginas/Administracao/pratos'
import AdministracaoNovoPrato from './paginas/Administracao/pratos/novo'
import Home from './paginas/Home'
import VitrineRestaurantes from './paginas/VitrineRestaurantes'

function App() {

	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/restaurantes" element={<VitrineRestaurantes />} />
			<Route path="/admin" element={<PaginaBase />}>
				<Route path="restaurantes" element={<AdministracaoRestaurantes />} />
				<Route path="restaurantes/novo" element={<AdministracaoNovo />} />
				<Route path="restaurantes/:id" element={<AdministracaoNovo />} />
				<Route path="pratos" element={<AdministracaoPratos />} />
				<Route path="pratos/novo" element={<AdministracaoNovoPrato />} />
				<Route path="pratos/:id" element={<AdministracaoNovoPrato />} />
			</Route>
			<Route path="*" element={<Home />} />
		</Routes>
	)
}

export default App
