'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { hideSpin } from '@/store/volatile/spinSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { Progress } from 'antd';

// Chuyển đổi kích thước từ chuỗi sang pixel
const getSizeInPx = (size: 'small' | 'default' | 'large' | number | undefined): number => {
  if (typeof size === 'number') return size;
  switch (size) {
    case 'small': return 24;
    case 'large': return 64;
    default: return 48;
  }
};

// Hiệu ứng xoay cho spinner
const spinnerVariants = {
  initial: { rotate: 0 },
  animate: { 
    rotate: 360,
    transition: { 
      duration: 1, 
      repeat: Infinity, 
    }
  }
};

// Hiệu ứng fade cho overlay
const overlayVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
};

const SpinnerContent = ({ size, percent }: { size: number; percent?: number | 'auto' }) => {
  if (percent !== undefined && percent !== 'auto') {
    return (
      <motion.div 
        className="!relative !flex !flex-col !items-center !justify-center"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Progress
          type="circle"
          percent={percent}
          strokeColor="#3069DE"
          trailColor="#E6F0FF"
          strokeWidth={8}
          width={size}
          className="!text-blue-500"
        />
        <motion.div 
          className="!absolute !text-blue-500 !font-bold !text-lg"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          {percent}%
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={spinnerVariants}
      initial="initial"
      animate="animate"
      className="!relative"
      style={{ width: size, height: size }}
    >
      <div className="!absolute !inset-0 !rounded-full !border-4 !border-blue-200"></div>
      <div className="!absolute !inset-0 !rounded-full !border-t-4 !border-l-4 !border-blue-500"></div>
      <motion.div
        className="!absolute !top-1/2 !left-1/2 !w-2 !h-2 !bg-blue-500 !rounded-full"
        animate={{ 
          scale: [1, 1.5, 1],
          opacity: [0.7, 1, 0.7]
        }}
        transition={{ 
          duration: 1.5,
          repeat: Infinity
        }}
        style={{ marginTop: -4, marginLeft: -4 }}
      />
    </motion.div>
  );
};

export default function GlobalSpin() {
  const spin = useSelector((state: RootState) => state.volatile.spin);
  const dispatch = useDispatch();

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;
    if (spin.time && spin.spinning) {
      timeoutId = setTimeout(() => {
        dispatch(hideSpin());
      }, spin.time);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [spin.time, spin.spinning, dispatch]);

  return (
    <AnimatePresence>
      {spin.spinning && (
        <motion.div
          variants={overlayVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="!fixed !inset-0 !z-[9999] !flex !items-center !justify-center !bg-blue-50/80 !backdrop-blur-[2px]"
        >
          <div className="!p-6 !rounded-xl !bg-white !shadow-lg !border !border-blue-100">
            <SpinnerContent 
              size={getSizeInPx(spin.size)} 
              percent={spin.percent} 
            />
            
            {spin.percent === 'auto' && (
              <motion.div
                className="!mt-4 !text-center !text-blue-500 !font-medium"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                Đang xử lý...
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}