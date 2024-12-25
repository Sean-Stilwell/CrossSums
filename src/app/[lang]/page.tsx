import Footer from "@/components/Footer";
import Game from "@/components/Game";
import { Typography } from "@mui/material";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { getDictionary } from '../../i18n/dictionaries';

export default async function Home(props: { params: Promise<{lang: string}> }) {
  const { lang } = await props.params;
  const t = await getDictionary(lang);
  return (
    <Container maxWidth="md">
      <Box display="flex" justifyContent="center" alignItems="center" flexDirection={'column'} minHeight="100vh">
        <Typography variant="h3" component="h1">{t.game.title}</Typography>
        <Game rows={5} columns={5} messages={{ win: t.game.win, newgame: t.game.newgame, lose: t.game.lose, help: t.help.title }} />
      </Box>
      <Footer lang={lang} />
    </Container>
  );
}
