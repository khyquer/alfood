import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import axios from 'axios'

import { useEffect, useState } from 'react'
import IRestaurante from '../../interfaces/IRestaurante'

const AdministracaoRestaurantes = () => {
	const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])

	useEffect(() => {
		axios
			.get<IRestaurante[]>('http://localhost:8000/api/v2/restaurantes/')
			.then((resposta) => {
				console.log(resposta.data)
				setRestaurantes(resposta.data)
			})
			.catch((erro) => {
				console.log(erro)
			})
	}, [])

	

	return (
		<TableContainer component={Paper}>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Id</TableCell>
						<TableCell>Nome</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{restaurantes?.map((row) => (
						<TableRow
							key={row.id}
						>
							<TableCell component="th" scope="row">
								{row.id}
							</TableCell>
							<TableCell>{row.nome}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	)
}

export default AdministracaoRestaurantes
