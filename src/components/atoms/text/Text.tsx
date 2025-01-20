import Box from "@mui/material/Box";
import Typography, { TypographyProps } from "@mui/material/Typography";
import { SxProps, Theme } from "@mui/material/styles";
import { ElementType, FC, useMemo } from "react";
import { getFontSizes } from "/utils/responsible";

export type TextVariants =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "subtitle1"
  | "subtitle2"
  | "body1"
  | "body2";

type FontWeight = 300 | 400 | 500 | 600 | 700;

export interface TextProps extends Omit<TypographyProps, "variant"> {
  variant?: TextVariants;
  className?: string;
  fontWeight?: FontWeight;
  customColor?: string;
  sx?: SxProps<Theme>;
  multiline?: boolean;
  color?: string;
  [otherProps: string]: unknown;
}

const variantMap: Record<TextVariants, TypographyProps["variant"]> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  subtitle1: "subtitle1",
  subtitle2: "subtitle2",
  body1: "body1",
  body2: "body2",
};

const variantMapping: Record<TextVariants, string> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  subtitle1: "div",
  subtitle2: "div",
  body1: "div",
  body2: "div",
};

const boxSettings: Record<TextVariants, Partial<IBoxSetting>> = {
  h1: {},
  h2: {},
  h3: {},
  h4: {},
  h5: {},
  h6: {},
  subtitle1: {},
  subtitle2: {},
  body1: {},
  body2: {},
};

interface IBoxSetting {
  fontWeight?: FontWeight;
  color?: string;
  component?: ElementType<unknown>;
}

const Text: FC<TextProps> = ({
  children,
  variant = "h5",
  className,
  fontWeight,
  customColor,
  multiline,
  sx,
  color,
  ...otherProps
}) => {
  const mappedVariant = variantMap[variant];
  const { adjustedFontSize, adjustedLineHeight } = getFontSizes(variant);

  const boxProps = useMemo<IBoxSetting>(() => {
    const baseProps = boxSettings[variant] || {};
    const mergedProps = {
      ...baseProps,
      ...(customColor && { color: customColor }),
      ...(fontWeight && { fontWeight }),
    };
    return mergedProps;
  }, [variant, customColor, fontWeight]);

  return (
    <Typography
      sx={{
        fontSize: adjustedFontSize,
        lineHeight: adjustedLineHeight,
        ...sx,
      }}
      variant={mappedVariant}
      variantMapping={variantMapping}
      {...otherProps}
    >
      <Box
        sx={{
          whiteSpace: multiline ? "pre-line" : "normal",
        }}
        {...boxProps}
      >
        {children}
      </Box>
    </Typography>
  );
};

export default Text;
