import { Box, Container, Grid } from "@mui/material";
import styles from "./styles";
import bigLogo from "/assets/img/bigLogo.png";
import Text from "/components/atoms/text/Text";

const Head = () => {
  return (
    <Box sx={styles.container}>
      <Container maxWidth="xl" sx={styles.content}>
        <Grid
          container
          direction="column"
          flexWrap="nowrap"
          rowGap={{ xs: 30, sm: 30 }}
          sx={styles.gridContainer}
        >
          <Grid item lg={6} sx={styles.logo}>
            <Box component="img" sx={styles.logo} alt="logo" src={bigLogo} />
          </Grid>
          <Grid item lg={6}>
            <Text
              variant="h1"
              multiline
              customColor="text.secondary"
              sx={styles.title}
            >
              Наши уникальные творения для вашего последнего прощания
            </Text>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Head;
