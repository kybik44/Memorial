import { Card, CardProps, styled } from "@mui/material";
import { motion } from "framer-motion";
import React, { ReactNode } from "react";

// Стилизованная карточка с эффектом стекла
const GlassCard = styled(Card)(() => ({
  background: "rgba(255, 255, 255, 0.8)",
  backdropFilter: "blur(10px)",
  borderRadius: "16px",
  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
  border: "1px solid rgba(255, 255, 255, 0.3)",
  overflow: "hidden",
  transition: "all 0.3s ease",
}));

interface AnimatedCardProps extends CardProps {
  children: ReactNode;
  hoverEffect?: "lift" | "glow" | "tilt" | "none";
  delay?: number;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  hoverEffect = "lift",
  delay = 0,
  ...props
}) => {
  // Определяем эффекты при наведении
  const getHoverAnimation = () => {
    switch (hoverEffect) {
      case "lift":
        return {
          y: -10,
          boxShadow:
            "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        };
      case "glow":
        return {
          boxShadow: "0 0 15px 5px rgba(110, 128, 97, 0.4)",
        };
      case "tilt":
        return {
          rotateX: 5,
          rotateY: 5,
          boxShadow:
            "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        };
      case "none":
      default:
        return {};
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
          delay,
          ease: [0.22, 1, 0.36, 1],
        },
      }}
      whileHover={getHoverAnimation()}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
    >
      <GlassCard {...props}>{children}</GlassCard>
    </motion.div>
  );
};

export default AnimatedCard;
