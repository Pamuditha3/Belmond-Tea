import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { FeedbackProvider } from './context/FeedbackContext';

// Import Screens
import HomeScreen from './screens/HomeScreen';
import CollectionScreen from './screens/CollectionScreen';
import JournalScreen from './screens/JournalScreen';
import NewsScreen from './screens/NewsScreen';

// Import Components
import Header from './components/Header';
import Footer from './components/Footer';
import FeedbackDrawer from './components/FeedbackDrawer';

// Scroll to top helper on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Skip scroll to top if hash anchor exists (e.g. #about)
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
};

const App = () => {
  return (
    <FeedbackProvider>
      <Router>
        <ScrollToTop />
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          
          {/* Global Header */}
          <Header />
          
          {/* Main Views Container */}
          <div style={{ flexGrow: 1 }}>
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/collection" element={<CollectionScreen />} />
              <Route path="/journal" element={<JournalScreen />} />
              <Route path="/news" element={<NewsScreen />} />
            </Routes>
          </div>
          
          {/* Global Footer */}
          <Footer />

          {/* Sliding Feedback Side Drawer */}
          <FeedbackDrawer />
          
        </div>
      </Router>
    </FeedbackProvider>
  );
};

export default App;
