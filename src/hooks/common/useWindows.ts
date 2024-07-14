'use effect';
import { useEffect, useState } from 'react';

export const useIsWindows = () => {
  const [isWindows, setIsWindows] = useState(false);
  useEffect(() => {
    // Function to detect if the user is on Windows
    const detectWindows = () => {
      const platform = window.navigator.platform;
      if (platform.indexOf('Win') > -1) {
        setIsWindows(true);
      }
    };

    detectWindows();
  }, []);

  return isWindows;
};
