import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import avatar from '../assets/avatar.jpg';

function HeaderComponent() {
	return (
		<AppBar position="relative">
			<Grid container>
				<Grid item
				      xs={6}
				>
					<div style={{
						    width: '450px',
							margin: '30px auto'
						 }}
					>
						<Typography variant="h2">
							Todo application
						</Typography>
						<Typography variant="subtitle2"
						            align="right"
						>
							by Angelina
						</Typography>
					</div>
				</Grid>
				<Grid item
				      xs={6}
				      container
				      justify="center"
				      alignItems="center"
				>
					<Avatar alt="Angelina"
					        src={avatar}
					        size="large"
					        classes={{
					        	root: 'custom-avatar'
					        }}
					/>
				</Grid>
			</Grid>
		</AppBar>
	);
}

export default HeaderComponent;
