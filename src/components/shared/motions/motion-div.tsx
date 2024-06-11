'use client';
import { motion, MotionProps } from 'framer-motion';
import React from 'react';

interface MotionDivProps extends MotionProps {
  children?: React.ReactNode;
  className?: string;
  ref?: React.Ref<HTMLDivElement>;
}

const MotionDiv: React.FC<MotionDivProps> = ({
  children,
  className,
  ref,
  ...props
}) => {
  return (
    <motion.div {...props} className={className} ref={ref}>
      {children}
    </motion.div>
  );
};

export default MotionDiv;
