import { Box, Button, Container, Theme, useMediaQuery } from "@mui/material";
import { useState } from "react";
import Text from "/components/atoms/text/Text.tsx";
import GraniteList from "./GraniteList.tsx";
import styles from "./styles.ts";
import { graniteItems } from "/utils/mock.tsx";

const Granite = () => {
  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );
  const [expanded, setExpanded] = useState(true);

  const onExpand = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <Box sx={styles.container}>
      <Container maxWidth="xl" sx={styles.content}>
        <Text
          variant={isSmallScreen ? "h2" : "h1"}
          customColor="text.primary"
          sx={styles.title}
        >
          Виды гранита
        </Text>
        <GraniteList cards={graniteItems} expanded={expanded} />
        <Button onClick={onExpand} sx={{ ...styles.button }}>
          {expanded ? "Развернуть" : "Свернуть"}
        </Button>
      </Container>
      <Box
        sx={{
          ...styles.smog,
          opacity: expanded ? "1" : "0",
          transition: "opacity 0.3s ease",
        }}
      />
    </Box>
  );
};

export default Granite;
