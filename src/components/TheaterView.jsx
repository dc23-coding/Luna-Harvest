
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import MediaViewer from '@/components/MediaViewer';
import SocialLinks from '@/components/SocialLinks';
import ArtistInfo from '@/components/ArtistInfo';
import ConcertSchedule from '@/components/ConcertSchedule';
import { Menu, X, Home } from 'lucide-react';
import { useArtistData } from '@/hooks/useArtistData';
import { Helmet } from 'react-helmet';

const TheaterView = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { artistData, concerts, isLoading } = useArtistData();

  if (isLoading) {
    return <div className="min-h-screen bg-black flex items-center justify-center text-white">Loading Artist...</div>;
  }
  
  if (!artistData.name) {
     return <div className="min-h-screen bg-black flex items-center justify-center text-white">Artist not found. <Link to="/" className="ml-2 text-purple-400 hover:underline">Go Home</Link></div>;
  }

  return (
    <>
      <Helmet>
        <title>{artistData.name} - Media Hub</title>
        <meta name="description" content={`The official media hub for ${artistData.name}. Join live concerts, view exclusive content, and connect with the community.`} />
      </Helmet>
      <div className="relative min-h-screen theater-gradient">
        {/* Header */}
        <motion.header 
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-purple-900/30"
        >
          <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
              <Home size={20} />
            </Link>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {artistData.name}
            </span>
            <button 
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 hover:bg-purple-900/30 rounded-lg transition-colors"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </motion.header>

        {/* Side Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed top-16 right-0 bottom-0 w-80 max-w-[85vw] bg-black/95 backdrop-blur-xl border-l border-purple-900/30 z-40 overflow-y-auto"
            >
              <div className="p-6 space-y-6">
                <ArtistInfo artist={artistData} />
                <SocialLinks links={artistData.socialLinks} />
                <ConcertSchedule concerts={concerts} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="pt-20 pb-8">
          <div className="max-w-4xl mx-auto px-4">
            <MediaViewer />
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 text-center"
            >
              <h1 className="text-3xl font-bold mb-2">{artistData.currentShow}</h1>
              <p className="text-gray-300 text-md max-w-2xl mx-auto">{artistData.description}</p>
            </motion.div>
          </div>
        </main>
      </div>
    </>
  );
};

export default TheaterView;
