import {
  Box,
  Button,
  Container,
  Grid,
  Theme,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import GraniteList from "./GraniteList";
import styles from "./styles";
import Text from "/components/atoms/text/Text";
import { useMainPageContext } from "/contexts/MainPageContext";
import FadeInWhenVisible from "/components/animations/FadeInWhenVisible";

const Granite = () => {
  const { materials, loadingMaterials } = useMainPageContext();
  const [expanded, setExpanded] = React.useState(false);
  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  const toggleExpand = () => setExpanded((prevExpanded) => !prevExpanded);

  // Если materials undefined или пустой, возвращаем null
  if (!materials || materials.length === 0) return null;

  return (
    <Box sx={styles.container}>
      <Container maxWidth="xl" sx={styles.content}>
        <Text
          variant={isSmallScreen ? "h2" : "h1"}
          customColor="text.primary"
          sx={styles.title}
          animated
          animationType="fadeIn"
          delay={0.1}
        >
          Виды гранита
        </Text>
        {loadingMaterials ? (
          <Grid item xs={12}>
            <Text animated animationType="fadeIn">
              Loading materials...
            </Text>
          </Grid>
        ) : (
          <>
            <FadeInWhenVisible delay={0.2}>
              <GraniteList materials={materials} expanded={expanded} />
            </FadeInWhenVisible>
            {materials.length > 12 && (
              <Box sx={{ position: 'relative', zIndex: 2 }}>
                <FadeInWhenVisible delay={0.3}>
                  <Button onClick={toggleExpand} sx={styles.button}>
                    {expanded ? "Свернуть" : "Развернуть"}
                  </Button>
                </FadeInWhenVisible>
              </Box>
            )}
          </>
        )}
      </Container>
      {!expanded && materials.length > 12 && (
        <Box
          sx={{
            ...styles.smog,
            opacity: expanded ? 0 : 1,
            transform: expanded ? "translateY(100%)" : "translateY(0)",
            transition: "opacity 1s ease, transform 1s ease",
          }}
        />
      )}
    </Box>
  );
};

export default Granite;
