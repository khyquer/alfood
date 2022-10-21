import {
	Paper,
	Box,
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
} from '@mui/material'

import { useEffect, useState } from 'react'
import IPrato from '../../../interfaces/IPrato'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { useNavigate } from 'react-router-dom'
import http from '../../../http'

const AdministracaoPratos = () => {
	const [pratos, setPratos] = useState<IPrato[]>([])

	const [buscaPrato, setBuscaPrato] = useState('')

	const [ordenador, setOrdenador] = useState('')

	const onCLickButtonBuscarPrato = () => {
		buscarPratos()
	}

	const navigate = useNavigate()

	useEffect(() => {
		buscarPratos()
	}, [ordenador])

	useEffect(() => {
		buscarPratos()
	}, [])

	const buscarPratos = () => {
		http.get<IPrato[]>('/v2/pratos/', {
			params: { ordering: ordenador },
		})
			.then((resposta) => {
				const temp = resposta.data?.filter((prato) => {
					const regex = new RegExp(buscaPrato, 'i')
					return regex.test(prato.nome)
				})
				setPratos(temp)
			})
			.catch((erro) => {
				console.log(erro)
			})
	}

	const deletePrato = (id: number) => {
		http.delete(`/v2/pratos/${id}/`)
			.then((resposta) => {
				buscarPratos()
			})
			.catch((erro) => {
				console.log(erro)
			})
	}

	const editarPrato = (id: number) => {
		navigate(`/admin/pratos/${id}`)
	}
	const novoPrato = () => {
		navigate('/admin/pratos/novo')
	}

	return (
		<Box>
			<section>
				<Box>
					<TextField
						id='standard-basic'
						label='Pesquisar Prato'
						variant='standard'
						value={buscaPrato}
						onChange={(e) => setBuscaPrato(e.target.value)}
					/>

					<Button
						variant='contained'
						onClick={onCLickButtonBuscarPrato}>
						Buscar
					</Button>
				</Box>

				<FormControl>
					<InputLabel id='demo-simple-select-label'>
						Ordenar por
					</InputLabel>
					<Select
						labelId='demo-simple-select-label'
						id='demo-simple-select'
						label='Ordenar por'
						value={ordenador}
						sx={{ width: '200px' }}
						onChange={(e) => setOrdenador(e.target.value)}>
						<MenuItem value={'id'}>Código</MenuItem>
						<MenuItem value={'nome'}>Nome</MenuItem>
					</Select>
				</FormControl>
			</section>
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Id</TableCell>
							<TableCell>Nome</TableCell>
							<TableCell>Descrição</TableCell>
							<TableCell>Tag</TableCell>
							<TableCell>Imagem</TableCell>
							<TableCell>Ações</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{pratos?.map((row) => (
							<TableRow key={row.id}>
								<TableCell component='th' scope='row'>
									{row.id}
								</TableCell>
								<TableCell>{row.nome}</TableCell>
								<TableCell>{row.descricao}</TableCell>
								<TableCell>{row.tag}</TableCell>
								<TableCell>
									<a
										href={row.imagem}
										rel='noreferrer'
										target='_blank'>
										Abrir
									</a>
								</TableCell>
								<TableCell>
									<Button
										key={row.id}
										onClick={() => editarPrato(row.id)}>
										<EditIcon>edit</EditIcon> Editar
									</Button>
								</TableCell>
								<TableCell>
									<Button
										key={row.id}
										onClick={() => deletePrato(row.id)}>
										<DeleteIcon>edit</DeleteIcon> Excluir
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	)
}

export default AdministracaoPratos
