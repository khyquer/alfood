import {
	AppBar,
	Paper,
	Box,
	Link,
	Button,
	Typography,
	Container,
	Toolbar,
} from '@mui/material'
import { Link as RouterLink, Outlet} from 'react-router-dom'

const PaginaBase = () => {
	
	return (
		<>
			<AppBar position='static'>
				<Container maxWidth='xl'>
					<Toolbar>
						<Typography>Administração</Typography>
						<Box>
							<Link component={RouterLink} to='/'>
								<Button sx={{my: 2, color: 'white'}}>Home</Button>
							</Link>
							<Link component={RouterLink} to='/admin/restaurantes'>
								<Button sx={{my: 2, color: 'white'}}>Restaurantes</Button>
							</Link>
							<Link component={RouterLink} to='/admin/restaurantes/novo'>
								<Button sx={{my: 2, color: 'white'}}>Novo Restaurante</Button>
							</Link>
							<Link component={RouterLink} to='/admin/pratos'>
								<Button sx={{my: 2, color: 'white'}}>Pratos</Button>
							</Link>
							<Link component={RouterLink} to='/admin/pratos/novo'>
								<Button sx={{my: 2, color: 'white'}}>Novo Prato</Button>
							</Link>
						</Box>
					</Toolbar>
				</Container>
			</AppBar>
			<Box>
				<Container maxWidth='lg' sx={{mt: 1}}>
					<Paper>
						<Outlet />
					</Paper>
				</Container>
			</Box>
		</>
	)
}

export default PaginaBase