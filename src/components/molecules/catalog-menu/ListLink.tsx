import { ListItemButton, Theme, SxProps } from "@mui/material";
import { SystemStyleObject } from "@mui/system/styleFunctionSx/styleFunctionSx";
import { FC, memo } from "react";
import styles from "./styles";
import Text from "/components/atoms/text/Text";

interface ListLinkProps {
  title: string;
  onClick: (e: React.MouseEvent) => void;
  icon?: React.ReactNode;
  isActive?: boolean;
  isNested?: boolean;
  sx?: SxProps<Theme>;
}

const ListLink: FC<ListLinkProps> = memo(
  ({ title, icon, onClick, isActive, isNested, sx }) => (
    <li>
      <ListItemButton
        onClick={onClick}
        sx={
          [
            styles.menuLink,
            isActive && styles.activeLink,
            isNested && styles.nestedLink,
            isNested && isActive && styles.activeNestedLink,
            ...(sx ? [sx] : []),
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
