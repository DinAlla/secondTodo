import React from 'react';
import AppBar from "@material-ui/core/AppBar";

function FooterComponent() {
	return (
		<AppBar position="fixed"
		        color="primary"
		        classes={{
			        root: 'footerStyle'
		        }}
		>
			Todo App by Angelina © 2020
		</AppBar>
	);
}

export default FooterComponent;
