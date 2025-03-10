import { ListItemButton, Theme } from "@mui/material";
import { SystemStyleObject } from "@mui/system/styleFunctionSx/styleFunctionSx";
import { FC, memo } from "react";
import styles from "./styles";
import Text from "/components/atoms/text/Text";

interface ListLinkProps {
  title: string;
  onClick: () => void;
  icon?: React.ReactNode;
  isActive?: boolean;
  isNested?: boolean;
}

const ListLink: FC<ListLinkProps> = memo(
  ({ title, icon, onClick, isActive, isNested }) => (
    <li>
      <ListItemButton
        onClick={onClick}
        sx={
          [
            styles.menuLink,
            isActive && styles.activeLink,
            isNested && styles.nestedLink,
            isNested && isActive && styles.activeNestedLink,
          ].filter(Boolean) as SystemStyleObject<Theme>[]
        }
      >
        <Text
          variant="h5"
          customColor={isActive ? "primary.main" : "text.primary"}
          sx={styles.link}
        >
          {title}
        </Text>
        {icon}
      </ListItemButton>
    </li>
  )
);

export default ListLink;
