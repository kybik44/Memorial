import React from 'react';
import { motion } from 'framer-motion';
import { Button, ButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';

// Стилизованная кнопка Material UI с эффектом свечения
const StyledButton = styled(Button)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(255, 255, 255, 0.1)',
    transform: 'translateX(-100%)',
    transition: 'transform 0.3s ease-out',
  },
  '&:hover::after': {
    transform: 'translateX(0)',
  },
}));

interface AnimatedButtonProps extends ButtonProps {
  whileHoverScale?: number;
  whileTapScale?: number;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  whileHoverScale = 1.03,
  whileTapScale = 0.97,
  ...props
}) => {
  return (
    <motion.div
      whileHover={{ 
        scale: whileHoverScale,
      }}
      whileTap={{ 
        scale: whileTapScale,
      }}
      transition={{ 
        type: 'spring', 
        stiffness: 400, 
        damping: 17 
      }}
      style={{ display: 'inline-block', width: props.fullWidth ? '100%' : 'auto' }}
    >
      <StyledButton {...props}>
        {children}
      </StyledButton>
    </motion.div>
  );
};

export default AnimatedButton; 