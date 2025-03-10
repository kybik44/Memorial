import { Box, Container } from "@mui/material";
import FencesList from "./FencesList";
import styles from "./styles";
import Text from "/components/atoms/text/Text";
import { useMainPageContext } from "/contexts/MainPageContext";
import Loading from "/components/atoms/loading/Loading";
import FadeInWhenVisible from "/components/animations/FadeInWhenVisible";

const Fences = () => {
  const { fencesCatalog, catalogSections } = useMainPageContext();

  // Находим секцию с position: 3
  const fencesSection = catalogSections.find(section => section.position === 3);
  
  if (!fencesCatalog.length || !fencesSection) return null;

  return (
    <Box sx={styles.container}>
      <Container maxWidth="xl" sx={styles.content}>
        <Text 
          variant="h1" 
          multiline 
          sx={styles.title}
          animated
          animationType="fadeIn"
          delay={0.1}
        >
          {fencesSection.title}
        </Text>
        <FadeInWhenVisible delay={0.2} direction="right">
          <FencesList
            items={fencesCatalog.map((item) => ({
              id: item.id,
              title: item.title,
              image: item.image || "",
              link: item.full_slug,
            }))}
          />
        </FadeInWhenVisible>
      </Container>
    </Box>
  );
};

export default Fences;
