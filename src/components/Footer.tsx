import React from 'react';
import { AppBar, Toolbar, Typography, Container, Box, Button } from '@mui/material';
import MuiLink from '@mui/material/Link';
import LanguageIcon from '@mui/icons-material/Language';
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
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="body1" color="inherit">
                            {t.footer.message} <MuiLink  href="https://seanstilwell.ca/" color="inherit">Sean Stilwell</MuiLink>
                        </Typography>
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        <Button variant="outlined" color="inherit" startIcon={<LanguageIcon />} href={lang === 'en' ? '/CrossSums/fr' : '/CrossSums/en'} >
                            {lang === 'en' ? 'FR' : 'EN'}
                        </Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};