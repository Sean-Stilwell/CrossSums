import Footer from "@/components/Footer";
import { Typography } from "@mui/material";
import Container from '@mui/material/Container';

export default function Home() {
  return (
    <Container maxWidth="md">
      <Typography variant="h3" component="h1">Welcome to Cross Sums!</Typography>
      <Footer />
    </Container>
  );
}
