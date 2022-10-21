import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import http from '../../http'
import IRestaurante from '../../interfaces/IRestaurante'

const AdministracaoNovo = () => {
	const params = useParams()
	const navigate = useNavigate()

	useEffect(() => {
		if (params.id) {
			http.get<IRestaurante>(`/v2/restaurantes/${params.id}/`)
				.then((resposta) => {
					setNomeRestaurante(resposta.data.nome)
				})
				.catch((erro) => {
					console.log(erro)
				})
		}
	}, [params])

	const [nomeRestaurante, setNomeRestaurante] = useState('')

	const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
		evento.preventDefault()
		console.log(params.id)
		if (!params.id) {
			http.post('/v2/restaurantes/', {
				nome: nomeRestaurante,
			})
				.then(() => {
					alert('Restaurante cadastrado com sucesso!')
					setNomeRestaurante('')
				})
				.catch((erro) => {
					console.log(erro)
				})
		} else {
			http.put(`/v2/restaurantes/${params.id}/`, {
				nome: nomeRestaurante,
			})
				.then(() => {
					alert('Restaurante atualizado com sucesso!')
				})
				.catch((erro) => {
					console.log(erro)
				})
		}
	}

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
			}}>
			<Typography component='h2'>Restaurante</Typography>
			<Box component='form' onSubmit={aoSubmeterForm}>
				<TextField
					id='standard-basic'
					label='Nome do Restaurante'
					variant='standard'
					value={nomeRestaurante}
					onChange={(evento) =>
						setNomeRestaurante(evento.target.value)
					}
					fullWidth
				/>
				<Button
					sx={{ marginTop: '20px' }}
					type='submit'
					variant='contained'
					fullWidth>
					Salvar
				</Button>
				<Button onClick={() => navigate('/admin/restaurantes')}>
					Voltar
				</Button>
			</Box>
		</Box>
	)
}

export default AdministracaoNovo
