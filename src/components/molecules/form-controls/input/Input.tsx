import { FormControl, OutlinedInput } from "@mui/material";
import { SxProps, Theme } from "@mui/material/styles";
import { FC } from "react";
import styles from "./styles";
import Text from "/components/atoms/text/Text";

export interface IMuiInputProps {
  name: string;
  defaultValue?: string;
  label?: string;
  placeholder?: string;
  sx?: SxProps<Theme>;
  disabled?: boolean;
  [otherProps: string]: any;
}

const MuiInput: FC<IMuiInputProps> = ({
  defaultValue = "",
  name,
  label,
  placeholder,
  sx,
  disabled = false,
  ...otherProps
}) => {
  return (
    <FormControl sx={styles.formControl}>
      {label && (
        <Text variant="h6" sx={styles.label}>
          {label}
        </Text>
      )}
      <OutlinedInput
        notched
        id={`${name}-label`}
        placeholder={placeholder}
        sx={styles.input}
        {...otherProps}
      />
    </FormControl>
  );
};

export default MuiInput;
