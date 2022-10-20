import {
	AppBar,
	Paper,
	Box,
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Link,
	Select,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
	Typography,
	Container,
	Toolbar,
} from '@mui/material'

import { useEffect, useState } from 'react'
import IRestaurante from '../../interfaces/IRestaurante'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { useNavigate } from 'react-router-dom'
import http from '../../http'

interface IParametrosBusca {
	ordering?: string
	search?: string
}

const AdministracaoRestaurantes = () => {
	const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])

	const [buscaRestaurante, setBuscaRestaurante] = useState('')

	const [ordenador, setOrdenador] = useState('')

	const onCLickButtonBbuscarRestaurante = () => {
		buscarRestaurantes()
	}

	const navigate = useNavigate()

	useEffect(() => {
		buscarRestaurantes()
	}, [ordenador])

	useEffect(() => {
		buscarRestaurantes()
	}, [])

	const buscarRestaurantes = () => {
		http.get<IRestaurante[]>('/v2/restaurantes/', {
			params: { ordering: ordenador },
		})
			.then((resposta) => {
				const temp = resposta.data?.filter((restaurante) => {
					const regex = new RegExp(buscaRestaurante, 'i')
					return regex.test(restaurante.nome)
				})
				setRestaurantes(temp)
			})
			.catch((erro) => {
				console.log(erro)
			})
	}

	const deleteRestaurante = (id: number) => {
		http.delete(`/v2/restaurantes/${id}/`)
			.then((resposta) => {
				buscarRestaurantes()
			})
			.catch((erro) => {
				console.log(erro)
			})
	}

	const editarRestaurante = (id: number) => {
		navigate(`/admin/restaurantes/${id}`)
	}
	const novoRestaurante = () => {
		navigate('/admin/restaurantes/novo')
	}

	return (
		<>
			<AppBar position='static'>
				<Container maxWidth='xl'>
					<Toolbar>
						<Typography variant='h6'>Administração</Typography>
						<Box sx={{ display: 'flex', flexGrow: 1 }}>
							<Link>
								<Button
									onClick={() => navigate('/restaurantes')}
									sx={{ my: 2, color: 'white' }}>
									Voltar
								</Button>
							</Link>
							<Link>
								<Button
									sx={{ my: 2, color: 'white' }}
									onClick={novoRestaurante}>
									Novo
								</Button>
							</Link>
						</Box>
					</Toolbar>
				</Container>
			</AppBar>
			<Box>
				<Container maxWidth='lg' sx={{ mt: 1 }}>
					<Paper>
						<Box>
							<section>
								<Box>
									<TextField
										id='standard-basic'
										label='Pesquisar Restaurante'
										variant='standard'
										value={buscaRestaurante}
										onChange={(e) =>
											setBuscaRestaurante(e.target.value)
										}
									/>

									<Button
										variant='contained'
										onClick={
											onCLickButtonBbuscarRestaurante
										}>
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
										onChange={(e) =>
											setOrdenador(e.target.value)
										}>
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
											<TableCell>Ações</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{restaurantes?.map((row) => (
											<TableRow key={row.id}>
												<TableCell
													component='th'
													scope='row'>
													{row.id}
												</TableCell>
												<TableCell>
													{row.nome}
												</TableCell>
												<TableCell>
													<Button
														key={row.id}
														onClick={() =>
															editarRestaurante(
																row.id
															)
														}>
														<EditIcon>
															edit
														</EditIcon>{' '}
														Editar
													</Button>
												</TableCell>
												<TableCell>
													<Button
														key={row.id}
														onClick={() =>
															deleteRestaurante(
																row.id
															)
														}>
														<DeleteIcon>
															edit
														</DeleteIcon>{' '}
														Excluir
													</Button>
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</TableContainer>
						</Box>
					</Paper>
				</Container>
			</Box>
		</>
	)
}

export default AdministracaoRestaurantes
