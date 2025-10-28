
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import LandingPage from '@/pages/LandingPage';
import TheaterView from '@/components/TheaterView';
import GalleryPage from '@/pages/GalleryPage';
import { Toaster } from '@/components/ui/toaster';

function App() {
  return (
    <>
      <Helmet>
        <title>Amplify Hub - The Ultimate Fan Experience</title>
        <meta name="description" content="Your central hub for live concerts, exclusive content, and connecting with your favorite artists." />
      </Helmet>
      <Router>
        <div className="min-h-screen bg-black">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/artist/:artistId" element={<TheaterView />} />
            <Route path="/artist/:artistId/gallery" element={<GalleryPage />} />
          </Routes>
          <Toaster />
        </div>
      </Router>
    </>
  );
}

export default App;
