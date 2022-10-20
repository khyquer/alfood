import { Button, TextField } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import IRestaurante from '../../interfaces/IRestaurante'

const AdministracaoNovo = () => {

	const params = useParams()

	useEffect(() => {
		if(params.id){
			axios
				.get<IRestaurante>(`http://localhost:8000/api/v2/restaurantes/${params.id}/`)
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

		if(params.id){
			axios
				.post('http://localhost:8000/api/v2/restaurantes/', {
					nome: nomeRestaurante
				})
				.then(() => {
					alert('Restaurante cadastrado com sucesso!')
				})
				.catch((erro) => {
					console.log(erro)
				})
		} else {
			axios
				.put(`http://localhost:8000/api/v2/restaurantes/${params.id}`, {
					nome: nomeRestaurante
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
		<form onSubmit={aoSubmeterForm}>
			<TextField
				id='standard-basic'
				label='Nome do Restaurante'
				variant='standard'
				value={nomeRestaurante}
				onChange={(evento) => setNomeRestaurante(evento.target.value)}
			/>
			<Button type='submit' variant='contained'>
				Contained
			</Button>
		</form>
	)
}

export default AdministracaoNovo
