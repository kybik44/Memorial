import { Box, Container } from "@mui/material";
import FencesList from "./FencesList";
import styles from "./styles";
import Text from "/components/atoms/text/Text";
import { useMainPageContext } from "/contexts/MainPageContext";
import Loading from "/components/atoms/loading/Loading";

const Fences = () => {
  const { fencesCatalog, loadingCatalogs } = useMainPageContext();

  if (loadingCatalogs) {
    return <Loading />;
  }

  if (!fencesCatalog.length) return null;

  return (
    <Box sx={styles.container}>
      <Container maxWidth="xl" sx={styles.content}>
        <Text variant="h1" multiline sx={styles.title}>
          Благоустройство и ограды
        </Text>
        <FencesList
          cards={fencesCatalog.map((item) => ({
            title: item.title,
            image: item.image || "",
          }))}
        />
      </Container>
    </Box>
  );
};

export default Fences;
