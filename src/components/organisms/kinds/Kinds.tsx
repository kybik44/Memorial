import { Box, Container, Theme, useMediaQuery } from "@mui/material";
import KindsList from "./KindsList";
import styles from "./styles";
import Text from "/components/atoms/text/Text";
import { kindsItems } from "/utils/mock";

const Kinds = () => {
  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  return (
    <Box sx={styles.container}>
      <Container maxWidth="xl" sx={styles.content}>
        <Text
          variant={isSmallScreen ? "h2" : "h1"}
          multiline
          customColor="text.secondary"
          sx={styles.title}
        >
          Виды памятников,{"\n"} которые мы изготавливаем
        </Text>
        <KindsList cards={kindsItems} />
      </Container>
    </Box>
  );
};

export default Kinds;
