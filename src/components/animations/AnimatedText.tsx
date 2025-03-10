import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import { Typography, TypographyProps } from "@mui/material";

interface AnimatedTextProps extends TypographyProps {
  children: ReactNode;
  animationType?: "fadeIn" | "typewriter" | "highlight" | "wave";
  delay?: number;
  duration?: number;
  staggerChildren?: number;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  children,
  animationType = "fadeIn",
  delay = 0,
  duration = 0.5,
  staggerChildren = 0.03,
  ...props
}) => {
  // Преобразуем текст в массив символов для анимации по буквам
  const getTextAsArray = () => {
    if (typeof children !== "string") {
      return [children];
    }

    if (animationType === "wave") {
      return children.split("");
    }

    return [children];
  };

  // Определяем анимацию в зависимости от типа
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

  // Стили для разных типов анимации
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

  const textArray = getTextAsArray();
  const variants = getAnimationVariants();
  const style = getAnimationStyle();

  if (animationType === "wave") {
    return (
      <Typography component="div" {...props}>
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
      </Typography>
    );
  }

  return (
    <Typography
      component={motion.div}
      initial="hidden"
      animate="visible"
      variants={variants}
      style={{ ...style, ...props.style }}
      {...props}
    >
      {children}
    </Typography>
  );
};

export default AnimatedText;
