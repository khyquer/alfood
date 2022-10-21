import {
	Box,
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import http from '../../../http'
import IPrato from '../../../interfaces/IPrato'
import IRestaurante from '../../../interfaces/IRestaurante'
import ITag from '../../../interfaces/ITag'

const AdministracaoNovoPrato = () => {
	const params = useParams()
	const navigate = useNavigate()

	const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])
	const [tags, setTags] = useState<ITag[]>([])
	const [nomePrato, setNomePrato] = useState('')
	const [descricaoPrato, setDescricaoPrato] = useState('')
	const [restaurantePrato, setRestaurantePrato] = useState('')
	const [tagPrato, setTagPrato] = useState('')
	const [imagemPrato, setImagemPrato] = useState<File | null>(null)
	const [imagemPratoUrl, setImagemPratoUrl] = useState('')

	useEffect(() => {
		if (params.id) {
			http.get<IPrato>(`/v2/pratos/${params.id}/`)
				.then((resposta) => {
					setNomePrato(resposta.data.nome)
					setDescricaoPrato(resposta.data.descricao)
					setRestaurantePrato(String(resposta.data.restaurante))
					setTagPrato(resposta.data.tag)
					setImagemPratoUrl(resposta.data.imagem)
				})
				.catch((erro) => {
					console.log(erro)
				})
		}
	}, [params])

	useEffect(() => {
		http.get<IRestaurante[]>('/v2/restaurantes/', {
			params: { ordering: 'nome' },
		})
			.then((resposta) => {
				setRestaurantes(resposta.data)
			})
			.catch((erro) => {
				console.log(erro)
			})
	}, [])

	useEffect(() => {
		http.get<{ tags: ITag[] }>('/v2/tags/', {
			params: { ordering: 'nome' },
		})
			.then((resposta) => {
				setTags(resposta.data.tags)
			})
			.catch((erro) => {
				console.log(erro)
			})
	}, [])

	const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
		evento.preventDefault()

		const formData = new FormData()

		formData.append('nome', nomePrato)
		formData.append('descricao', descricaoPrato)
		formData.append('tag', tagPrato)
		formData.append('restaurante', restaurantePrato)
		if (imagemPrato) {
			formData.append('imagem', imagemPrato)
		} 

		if (!params.id) {
			http.request({
				url: '/v2/pratos/',
				method: 'POST',
				headers: {
					'Content-Type': 'multipart/form-data',
				},
				data: formData,
			})
				.then(() => {
					alert('Prato cadastrado com sucesso!')
					setNomePrato('')
				})
				.catch((erro) => {
					console.log(erro)
				})
		} else {
			http.request({
				url: `/v2/pratos/${params.id}/`,
				method: 'PUT',
				headers: {
					'Content-Type': 'multipart/form-data',
				},
				data: formData,
			})
				.then(() => {
					alert('Prato atualizado com sucesso!')
					setNomePrato('')
				})
				.catch((erro) => {
					console.log(erro)
				})
		}
	}

	const inputFileImage = (evento: React.ChangeEvent<HTMLInputElement>) => {
		if (evento.target.files?.length) {
			return setImagemPrato(evento.target.files[0])
		} else {
			setImagemPrato(null)
		}
	}

	return (
		<FormControl
			sx={{
				display: 'flex',
				height: '720px',
				flexDirection: 'column',
				alignItems: 'center',
			}}>
			<Typography component='h2'>Prato</Typography>
			<FormControl component='form' onSubmit={aoSubmeterForm}>
				<TextField
					id='standard-basic'
					label='Nome do Prato'
					variant='standard'
					value={nomePrato}
					required
					onChange={(evento) => setNomePrato(evento.target.value)}
					fullWidth
					margin='dense'
				/>
				<TextField
					id='standard-basic'
					label='Descrição do Prato'
					variant='standard'
					multiline
					required
					rows={3}
					value={descricaoPrato}
					onChange={(evento) =>
						setDescricaoPrato(evento.target.value)
					}
					fullWidth
					margin='dense'
				/>
				<FormControl fullWidth margin='dense'>
					<InputLabel id='select-label-restaurante'>
						Restaurantes
					</InputLabel>
					<Select
						labelId='select-label-restaurante'
						id='select-restaurante'
						value={restaurantePrato}
						required
						onChange={(e) => setRestaurantePrato(e.target.value)}>
						{restaurantes?.map((item) => (
							<MenuItem key={item.id} value={item.id}>
								{item.nome}
							</MenuItem>
						))}
					</Select>
				</FormControl>

				<FormControl fullWidth margin='dense'>
					<InputLabel id='select-label-tags'>Tags</InputLabel>
					<Select
						labelId='select-label-tags'
						id='select-tags'
						value={tagPrato}
						required
						onChange={(e) => setTagPrato(e.target.value)}>
						{tags?.map((item) => (
							<MenuItem key={item.id} value={item.value}>
								{item.value}
							</MenuItem>
						))}
					</Select>
				</FormControl>
				<FormControl fullWidth margin='dense'>
					<input type='file' onChange={inputFileImage}></input>
				</FormControl>
				<FormControl fullWidth margin='dense'>
					<img src={imagemPratoUrl} alt={nomePrato} width='200px' />
				</FormControl>

				<FormControl fullWidth margin='dense'>
					<Button
						sx={{ marginTop: '20px' }}
						type='submit'
						variant='contained'
						fullWidth>
						Salvar
					</Button>
				</FormControl>
			</FormControl>
		</FormControl>
	)
}

export default AdministracaoNovoPrato
