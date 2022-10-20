import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@mui/material'
import axios from 'axios'

import { useEffect, useState } from 'react'
import IRestaurante from '../../interfaces/IRestaurante'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { Link } from 'react-router-dom'

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
	}, [restaurantes])

	const deleteRestaurante = (id: number) => {
		axios
			.delete(`http://localhost:8000/api/v2/restaurantes/${id}/`)
			.catch((erro) => {
				console.log(erro)
			})
	}

	return (
		<TableContainer component={Paper}>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Id</TableCell>
						<TableCell>Nome</TableCell>
						<TableCell>Ações</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{restaurantes?.map((row) => (
						<TableRow key={row.id}>
							<TableCell component='th' scope='row'>
								{row.id}
							</TableCell>
							<TableCell>{row.nome}</TableCell>
							<TableCell>
								<Link to={`/admin/restaurantes/${row.id}`}>
									<EditIcon>edit</EditIcon>
								</Link>
							</TableCell>
							<TableCell>
								<DeleteIcon key={row.id} onClick={()=> deleteRestaurante(row.id)}>edit</DeleteIcon>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	)
}

export default AdministracaoRestaurantes
