import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Box, BoxProps } from '@mui/material';

interface AnimatedListProps extends BoxProps {
  children: ReactNode[];
  staggerDelay?: number;
  initialDelay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
  duration?: number;
}

const AnimatedList: React.FC<AnimatedListProps> = ({
  children,
  staggerDelay = 0.1,
  initialDelay = 0,
  direction = 'up',
  distance = 30,
  duration = 0.5,
  ...props
}) => {
  // Анимация для контейнера
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: initialDelay,
      },
    },
  };

  // Анимация для отдельных элементов списка
  const getItemVariants = () => {
    const variants = {
      hidden: {
        opacity: 0,
        y: direction === 'up' ? distance : direction === 'down' ? -distance : 0,
        x: direction === 'left' ? distance : direction === 'right' ? -distance : 0,
      },
      visible: {
        opacity: 1,
        y: 0,
        x: 0,
        transition: {
          duration,
          ease: [0.22, 1, 0.36, 1],
        },
      },
    };
    return variants;
  };

  return (
    <Box
      component={motion.div}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      {...props}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div
          key={index}
          variants={getItemVariants()}
          style={{ willChange: 'opacity, transform' }}
        >
          {child}
        </motion.div>
      ))}
    </Box>
  );
};

export default AnimatedList; 