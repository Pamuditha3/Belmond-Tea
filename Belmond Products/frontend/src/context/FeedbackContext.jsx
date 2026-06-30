import React, { createContext, useState, useContext } from 'react';

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openDrawer = () => {
    setIsDrawerOpen(true);
    document.body.style.overflow = 'hidden'; // Lock background scroll
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    document.body.style.overflow = ''; // Unlock scroll
  };

  return (
    <FeedbackContext.Provider value={{ isDrawerOpen, openDrawer, closeDrawer }}>
      {children}
    </FeedbackContext.Provider>
  );
};

export const useFeedback = () => {
  const context = useContext(FeedbackContext);
  if (!context) {
    throw new Error('useFeedback must be used within a FeedbackProvider');
  }
  return context;
};
