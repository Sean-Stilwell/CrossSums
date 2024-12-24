import React from 'react';
import { AppBar, Toolbar, Typography, Container } from '@mui/material';
import MuiLink from '@mui/material/Link';

const Footer: React.FC = () => {
    return (
        <AppBar position="fixed" sx={{ top: 'auto', bottom: 0 }}>
            <Container maxWidth="md">
                <Toolbar>
                    <Typography variant="body1" color="inherit">
                        Developed by <MuiLink  href="https://seanstilwell.ca/" color="inherit">Sean Stilwell</MuiLink>
                    </Typography>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Footer;