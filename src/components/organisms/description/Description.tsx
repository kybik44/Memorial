import { Box, Container, Grid } from "@mui/material";
import styles from "./styles";
import woman from "/assets/img/woman.png";
import Text from "/components/atoms/text/Text";

const Description = () => {
  return (
    <Container maxWidth="xl" sx={styles.container}>
      <Grid container columnGap={10} rowGap={2} sx={styles.content}>
        <Grid item lg={7}>
          <Box component="img" sx={styles.image} alt="Woman" src={woman} />
        </Grid>
        <Grid item lg={5}>
          <Text variant="h2" customColor="text.primary" sx={styles.title}>
            Добро пожаловать в Last Stone
          </Text>
          <Text multiline variant="h4" sx={styles.text}>
            Мы — команда профессионалов, предоставляющих уникальные надгробные
            памятники c глубоким пониманием чувств и потребностей в трудные
            моменты прощания.{"\n"}
            {"\n"}
            Наша миссия состоит в том, чтобы помочь вам выразить уважение и
            любовь к вашим близким через искусство вечной памяти.
          </Text>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Description;
