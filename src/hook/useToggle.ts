"use client"
import { useState } from 'react';

export const useToggle = (initialState: boolean = false) => {
  const [state, setIsOpen] = useState(initialState);

  const toggle = () => {
    setIsOpen(prev => !prev);
  };
  return [state, toggle] as const;
};
