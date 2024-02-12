import { Box, Container } from "@mui/material";
import FencesList from "./FencesList";
import styles from "./styles";
import Text from "/components/atoms/text/Text";
import { fencesItems } from "/utils/mock";

const Fences = () => {
  return (
    <Box sx={styles.container}>
      <Container maxWidth="xl" sx={styles.content}>
        <Text variant="h1" multiline sx={styles.title}>
          Благоустройство и ограды
        </Text>
        <FencesList cards={fencesItems} />
      </Container>
    </Box>
  );
};

export default Fences;
