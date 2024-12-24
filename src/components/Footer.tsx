import React from 'react';
import { AppBar, Toolbar, Typography, Container } from '@mui/material';
import MuiLink from '@mui/material/Link';
import { getDictionary } from '../i18n/dictionaries';

interface FooterProps {
    lang: string;
}

export default async function Footer(props: FooterProps) {
    const { lang } = await props;
    const t = await getDictionary(lang);

    return (
        <AppBar position="fixed" sx={{ top: 'auto', bottom: 0 }}>
            <Container maxWidth="md">
                <Toolbar>
                    <Typography variant="body1" color="inherit">
                        {t.footer.message} <MuiLink  href="https://seanstilwell.ca/" color="inherit">Sean Stilwell</MuiLink>
                    </Typography>
                </Toolbar>
            </Container>
        </AppBar>
    );
};