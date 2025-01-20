import { ListItemButton, SxProps, Theme } from "@mui/material";
import { FC, memo } from "react";
import styles from "./styles";
import Text from "/components/atoms/text/Text";

interface ListLinkProps {
  title: string;
  onClick: () => void;
  color?: string;
  icon?: React.ReactNode;
  sx?: SxProps<Theme>;
}

const ListLink: FC<ListLinkProps> = memo(
  ({ title, color, icon, onClick, sx }) => (
    <li>
      <ListItemButton
        onClick={onClick}
        sx={[styles.menuLink, ...(Array.isArray(sx) ? sx : [sx])]}
      >
        <Text variant="h5" color={color} sx={styles.link}>
          {title}
        </Text>
        {icon}
      </ListItemButton>
    </li>
  )
);

export default ListLink;
