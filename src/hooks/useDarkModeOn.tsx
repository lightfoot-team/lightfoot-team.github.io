import { useState, useEffect } from 'react';

export function useDarkModeOn() {
  const [darkModeOn, setDarkModeOn] = useState(false);
      useEffect(() => {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setDarkModeOn(prefersDark);
      }, []);
  return darkModeOn;
}
