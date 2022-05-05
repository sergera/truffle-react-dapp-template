/********
 * Hook to run code after component render
 * 
 * In use it's similar to componentDidUpdate
 * 
 * Does NOT work server-side!
 * 
 */

import { useEffect, useRef } from 'react'

export const useAfterRender = (effect:Function) => {
  const hasMounted = useRef(false);

  useEffect(
    () => {
      if (!hasMounted.current) {
        hasMounted.current = true;
        return;
      }
      effect();
    }
  );
};
