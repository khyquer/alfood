import {
	Box,
	Button,
	TextField,
	Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import http from '../../../http'
import IPrato from '../../../interfaces/IPrato'

const AdministracaoNovoPrato = () => {
	const params = useParams()
	const navigate = useNavigate()

	useEffect(() => {
		if (params.id) {
			http.get<IPrato>(`/v2/pratos/${params.id}/`)
				.then((resposta) => {
					setNomePrato(resposta.data.nome)
				})
				.catch((erro) => {
					console.log(erro)
				})
		}
	}, [params])

	const [nomePrato, setNomePrato] = useState('')

	const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
		evento.preventDefault()
		console.log(params.id)
		if (!params.id) {
			http.post('/v2/pratos/', {
				nome: nomePrato,
			})
				.then(() => {
					alert('Prato cadastrado com sucesso!')
					setNomePrato('')
				})
				.catch((erro) => {
					console.log(erro)
				})
		} else {
			http.put(`/v2/pratos/${params.id}/`, {
				nome: nomePrato,
			})
				.then(() => {
					alert('Prato atualizado com sucesso!')
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
			<Typography component='h2'>Prato</Typography>
			<Box component='form' onSubmit={aoSubmeterForm}>
				<TextField
					id='standard-basic'
					label='Nome do Prato'
					variant='standard'
					value={nomePrato}
					onChange={(evento) =>
						setNomePrato(evento.target.value)
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
				<Button onClick={() => navigate('/admin/pratos')}>
					Voltar
				</Button>
			</Box>
		</Box>
	)
}

export default AdministracaoNovoPrato
