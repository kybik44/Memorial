import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import { SxProps, Theme } from "@mui/material/styles";
import { SystemStyleObject } from "@mui/system/styleFunctionSx/styleFunctionSx";
import { FC, memo, ReactNode, useEffect, useState } from "react";
import styles from "./styles.ts";
import Text from "/components/atoms/text/Text";

interface ILabelDropdownProps {
  content: ReactNode;
  label?: string;
  onOpen?: () => void;
  sx?: SxProps<Theme>;
}

const LabelDropdown: FC<ILabelDropdownProps> = ({
  label,
  content,
  onOpen = () => {},
  sx,
}): JSX.Element => {
  const [shown, setShown] = useState(false);
  const iconStyle = [styles.arrowIcon, shown && styles.showArrowIcon] as Array<
    SystemStyleObject<Theme>
  >;

  const headerStyle = [styles.header] as Array<SystemStyleObject<Theme>>;

  const toggle = () => {
    setShown((currentShow) => !currentShow);
  };

  useEffect(() => {
    if (shown) {
      onOpen();
    }
  }, [shown]);

  return (
    <Box
      sx={[shown && styles.openDropdown, ...(Array.isArray(sx) ? sx : [sx])]}
    >
      <Box sx={headerStyle} onClick={toggle}>
        <Text variant="body1" sx={styles.label}>
          {label}
        </Text>
        <ArrowDropDownIcon sx={iconStyle} />
      </Box>
      <Collapse in={shown}>{content}</Collapse>
    </Box>
  );
};

export default memo(LabelDropdown);
