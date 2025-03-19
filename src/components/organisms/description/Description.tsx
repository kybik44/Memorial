import { Box, Container, Grid } from "@mui/material";
import styles from "./styles";
import womanImage from "/assets/img/woman.png";
import Text from "/components/atoms/text/Text";
import FadeInWhenVisible from "/components/animations/FadeInWhenVisible";

const Description = () => {
  return (
    <Container maxWidth="xl" sx={styles.container}>
      <Grid
        container
        columnGap={{ xs: 2, sm: 4, md: 4, lg: 6, xl: 10 }}
        rowSpacing={2}
        sx={styles.content}
      >
        <Grid item sm={12} lg={6}>
          <FadeInWhenVisible delay={0.1}>
            <Box
              component="img"
              src={womanImage}
              alt="Woman"
              sx={styles.image}
            />
          </FadeInWhenVisible>
        </Grid>
        <Grid item sm={12} lg={6}>
          <Text 
            variant="h2" 
            color="text.primary" 
            sx={styles.title}
            animated
            animationType="fadeIn"
            delay={0.2}
          >
            Добро пожаловать в Last Stone
          </Text>
          <Text 
            multiline 
            variant="h4" 
            sx={styles.text}
            animated
            animationType="fadeIn"
            delay={0.3}
          >
            Мы — команда профессионалов, предоставляющих уникальные надгробные
            памятники с глубоким пониманием чувств и потребностей в трудные
            моменты прощания.{"\n\n"}
            Наша миссия состоит в том, чтобы помочь вам выразить уважение и
            любовь к вашим близким через искусство вечной памяти.
          </Text>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Description;
