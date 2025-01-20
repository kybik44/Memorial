import { Box, Container, useMediaQuery, useTheme } from "@mui/material";
import KindsList from "./KindsList";
import styles from "./styles";
import Text from "/components/atoms/text/Text";
import { useMainPageContext } from "/contexts/MainPageContext";
import Loading from "/components/atoms/loading/Loading";

const Kinds = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { kindsCatalog, loadingCatalogs } = useMainPageContext();

  if (loadingCatalogs) {
    return <Loading />;
  }

  if (!kindsCatalog.length) return null;

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
        <KindsList
          cards={kindsCatalog.map((item) => ({
            title: item.title,
            image: item.image || "",
          }))}
        />
      </Container>
    </Box>
  );
};

export default Kinds;
