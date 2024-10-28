import { useState, useEffect } from 'react';

export const usePasswordStrength = (password) => {
  const [strength, setStrength] = useState('');

  useEffect(() => {
    if (password.length >= 8 && /[A-Z]/.test(password) && /\d/.test(password)) {
      setStrength('strong');
    } else if (password.length >= 6) {
      setStrength('medium');
    } else {
      setStrength('weak');
    }
  }, [password]);

  return strength;
};
