import {
  Button,
  Card,
  CardActions,
  CardContent,
  Theme,
  useMediaQuery,
} from "@mui/material";
import { FC } from "react";
import Text from "../../atoms/text/Text";
import styles from "./styles";
import OptimizedImage from "/components/atoms/optimized-image/OptimizedImage";

interface FenceCardProps {
  title: string;
  image: string;
  link: string;
}

const FenceCard: FC<FenceCardProps> = ({ title, image }) => {
  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  return (
    <Card sx={styles.card}>
      <OptimizedImage
        alt={title}
        src={image}
        fit="scale-down"
        style={{
          maxWidth: !isSmallScreen ? "100%" : "270px",
          maxHeight: "250px",
        }}
        wrapperStyle={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      />
      <CardContent sx={{ p: isSmallScreen ? "10px" : "16px" }}>
        <Text variant="h6" sx={styles.cardTitle}>
          {title}
        </Text>
      </CardContent>
      <CardActions sx={styles.actions}>
        <Button size="small" sx={styles.button}>
          Перейти в каталог
        </Button>
      </CardActions>
    </Card>
  );
};

export default FenceCard;
