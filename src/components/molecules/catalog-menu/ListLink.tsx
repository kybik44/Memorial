import { ListItemButton, SxProps, Theme } from "@mui/material";
import { FC } from "react";
import styles from "./styles";
import Text from "/components/atoms/text/Text";

interface ListLinkProps {
  title: string;
  onClick: () => void;
  color?: string;
  icon?: JSX.Element | null;
  sx?: SxProps<Theme>;
}

const ListLink: FC<ListLinkProps> = ({ title, color, icon, onClick, sx }) => (
  <li>
    <ListItemButton
      onClick={onClick}
      sx={[styles.menuLink, ...(Array.isArray(sx) ? sx : [sx])]}
    >
      <Text variant="h5" customColor={color} sx={styles.link}>
        {title}
      </Text>
      {icon}
    </ListItemButton>
  </li>
);

export default ListLink;
