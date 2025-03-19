import { useState, useEffect } from 'react';

interface WindowDimension {
  width: number;
  height: number;
}

const useGetWindowDimension = (): WindowDimension => {
  const [windowDimension, setWindowDimension] = useState<WindowDimension>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowDimension({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimension;
};

export default useGetWindowDimension; 