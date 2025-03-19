import Box from "@mui/material/Box";
import MuiTypography, { TypographyProps } from "@mui/material/Typography";
import { SxProps, Theme } from "@mui/material/styles";
import { SystemStyleObject } from "@mui/system";
import { motion } from "framer-motion";
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

export interface CustomTextProps extends Omit<TypographyProps, "variant"> {
  variant?: TextVariants;
  className?: string;
  fontWeight?: FontWeight;
  customColor?: string;
  sx?: SystemStyleObject<Theme> | SxProps<Theme>;
  multiline?: boolean;
  color?: string;
  animated?: boolean;
  animationType?: "fadeIn" | "typewriter" | "highlight" | "wave";
  delay?: number;
  duration?: number;
  staggerChildren?: number;
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

const boxSettings: Record<TextVariants, Partial<BoxSetting>> = {
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

interface BoxSetting {
  fontWeight?: FontWeight;
  color?: string;
  component?: ElementType;
}

const Text: FC<CustomTextProps> = ({
  children,
  variant = "h5",
  className,
  fontWeight,
  customColor,
  multiline,
  sx,
  color,
  animated = false,
  animationType = "fadeIn",
  delay = 0,
  duration = 0.5,
  staggerChildren = 0.03,
  ...otherProps
}) => {
  const mappedVariant = variantMap[variant];
  const { adjustedFontSize, adjustedLineHeight } = getFontSizes(variant);

  const boxProps = useMemo<BoxSetting>(() => {
    const baseProps = boxSettings[variant] || {};
    const mergedProps = {
      ...baseProps,
      ...(customColor && { color: customColor }),
      ...(fontWeight && { fontWeight }),
    };
    return mergedProps;
  }, [variant, customColor, fontWeight]);

  const getTextAsArray = () => {
    if (typeof children !== "string") {
      return [children];
    }

    if (animationType === "wave") {
      return children.split("");
    }

    return [children];
  };

  const getAnimationVariants = () => {
    switch (animationType) {
      case "fadeIn":
        return {
          hidden: { opacity: 0, y: 20 },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              duration,
              delay,
              ease: [0.22, 1, 0.36, 1],
            },
          },
        };
      case "typewriter":
        return {
          hidden: { width: 0, opacity: 0 },
          visible: {
            width: "100%",
            opacity: 1,
            transition: {
              width: {
                duration: duration * 2,
                delay,
                ease: "linear",
              },
              opacity: {
                duration: 0.1,
                delay,
              },
            },
          },
        };
      case "highlight":
        return {
          hidden: { backgroundSize: "0% 100%" },
          visible: {
            backgroundSize: "100% 100%",
            transition: {
              duration,
              delay,
              ease: [0.22, 1, 0.36, 1],
            },
          },
        };
      case "wave":
        return {
          hidden: { y: 0 },
          visible: (i: number) => ({
            y: [0, -10, 0],
            transition: {
              delay: delay + i * staggerChildren,
              duration: duration,
              repeat: 0,
              ease: "easeInOut",
            },
          }),
        };
      default:
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        };
    }
  };

  const getAnimationStyle = () => {
    switch (animationType) {
      case "typewriter":
        return {
          display: "inline-block",
          whiteSpace: "nowrap",
          overflow: "hidden",
        };
      case "highlight":
        return {
          display: "inline",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "0 90%",
          backgroundSize: "0% 100%",
          padding: "0 4px",
        };
      default:
        return {};
    }
  };

  if (!animated) {
    return (
      <MuiTypography
        sx={{
          fontSize: adjustedFontSize,
          lineHeight: adjustedLineHeight,
          ...sx,
        }}
        variant={mappedVariant}
        variantMapping={variantMapping}
        className={className}
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
      </MuiTypography>
    );
  }

  if (animated && animationType === "wave") {
    const textArray = getTextAsArray();
    const variants = getAnimationVariants();

    return (
      <MuiTypography
        sx={{
          fontSize: adjustedFontSize,
          lineHeight: adjustedLineHeight,
          ...sx,
        }}
        variant={mappedVariant}
        variantMapping={variantMapping}
        className={className}
        {...otherProps}
      >
        <Box
          component="div"
          sx={{
            whiteSpace: multiline ? "pre-line" : "normal",
          }}
          {...boxProps}
        >
          <motion.div
            initial="hidden"
            animate="visible"
            style={{ display: "inline-flex" }}
          >
            {textArray.map((char, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={variants}
                style={{ display: "inline-block" }}
              >
                {char}
              </motion.span>
            ))}
          </motion.div>
        </Box>
      </MuiTypography>
    );
  }

  const variants = getAnimationVariants();
  const animationStyle = getAnimationStyle();

  return (
    <MuiTypography
      sx={{
        fontSize: adjustedFontSize,
        lineHeight: adjustedLineHeight,
        ...sx,
      }}
      variant={mappedVariant}
      variantMapping={variantMapping}
      className={className}
      {...otherProps}
    >
      <Box
        component={motion.div}
        initial="hidden"
        animate="visible"
        variants={variants}
        sx={{
          whiteSpace: multiline ? "pre-line" : "normal",
          ...animationStyle,
        }}
        {...boxProps}
      >
        {children}
      </Box>
    </MuiTypography>
  );
};

export default Text;
