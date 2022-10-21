import { Button, TextField } from '@mui/material'

import { useEffect, useState } from 'react'
import http from '../../http'
import { IPaginacao } from '../../interfaces/IPaginacao'
import IRestaurante from '../../interfaces/IRestaurante'
import style from './ListaRestaurantes.module.scss'
import Restaurante from './Restaurante'

const ListaRestaurantes = () => {
	const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])

	const [buscaRestaurante, setBuscaRestaurante] = useState('')

	const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
		evento.preventDefault()
	}

	const onCLickButtonBbuscarRestaurante = () => {
		const temp = restaurantes?.filter((restaurante) => {
			const regex = new RegExp(buscaRestaurante, 'i')
			return regex.test(restaurante.nome)
		})
		setRestaurantes(temp)
	}

	const [proximaPagina, setProximaPagina] = useState('')

	useEffect(() => {
		http.get<IPaginacao<IRestaurante>>('/v1/restaurantes/')
			.then((resposta) => {
				setRestaurantes(resposta.data.results)
				setProximaPagina(resposta.data.next)
			})
			.catch((erro) => {
				console.log(erro)
			})
	}, [])

	const onCLickProximaPagina = () => {
		http.get<IPaginacao<IRestaurante>>(proximaPagina)
			.then((resposta) => {
				setRestaurantes([...restaurantes, ...resposta.data.results ])
				setProximaPagina(resposta.data.next)
			})
			.catch((erro) => {
				console.log(erro)
			})
	}

	return (
		<section className={style.ListaRestaurantes}>
			<h1>
				Os restaurantes mais <em>bacanas</em>!
			</h1>
			<section>
				<form onSubmit={aoSubmeterForm}>
					<TextField
						id='standard-basic'
						label='Pesquisar Restaurante'
						variant='standard'
						value={buscaRestaurante}
						onChange={(e) => setBuscaRestaurante(e.target.value)}
					/>

					<Button
						variant='contained'
						onClick={onCLickButtonBbuscarRestaurante}>
						Buscar
					</Button>
				</form>
			</section>
			{restaurantes?.map((item) => (
				<Restaurante restaurante={item} key={item.id} />
			))}
			<section>
				{proximaPagina && (
					<Button variant='contained' onClick={onCLickProximaPagina}>
						Próxima
					</Button>
				)}
			</section>
		</section>
	)
}

export default ListaRestaurantes
