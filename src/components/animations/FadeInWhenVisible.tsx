import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface FadeInWhenVisibleProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  threshold?: number;
  triggerOnce?: boolean;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
}

const FadeInWhenVisible: React.FC<FadeInWhenVisibleProps> = ({
  children,
  delay = 0,
  duration = 0.5,
  threshold = 0.1,
  triggerOnce = true,
  direction = 'up',
  distance = 50,
}) => {
  const [ref, inView] = useInView({
    triggerOnce,
    threshold,
  });

  const getDirectionalVariants = () => {
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
          delay,
          ease: [0.22, 1, 0.36, 1], // Custom cubic-bezier for smooth acceleration and deceleration
        }
      }
    };
    return variants;
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={getDirectionalVariants()}
      style={{ willChange: 'opacity, transform' }} // Optimize performance
    >
      {children}
    </motion.div>
  );
};

export default FadeInWhenVisible; 