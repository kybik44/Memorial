import { FormControl, FormHelperText, OutlinedInput, Theme } from "@mui/material";
import { SxProps } from "@mui/system";
import { FC } from "react";
import { useFormContext } from "react-hook-form";
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

/**
 * Компонент ввода текста
 */
const MuiInput: FC<IMuiInputProps> = ({
  defaultValue = "",
  name,
  label,
  placeholder,
  sx = {},
  disabled = false,
  ...otherProps
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name];

  return (
    <FormControl sx={styles.formControl} error={!!error}>
      {label && (
        <Text variant="h6" sx={styles.label}>
          {label}
        </Text>
      )}
      <OutlinedInput
        {...register(name)}
        notched
        id={`${name}-label`}
        placeholder={placeholder}
        sx={styles.input}
        disabled={disabled}
        error={!!error}
        {...otherProps}
      />
      {error && (
        <FormHelperText error sx={styles.errorText}>
          {error.message as string}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default MuiInput;
