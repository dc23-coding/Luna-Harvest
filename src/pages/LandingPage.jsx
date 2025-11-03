import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Users, Twitter, Instagram, Youtube, Music } from 'lucide-react';
import { Helmet } from 'react-helmet';
import { useArtistData } from '@/hooks/useArtistData';
import { useUser, SignInButton, SignOutButton } from '@clerk/clerk-react';

const LandingPage = () => {
  const { artists } = useArtistData();
  const { isSignedIn, user } = useUser();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.5 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
  };

  return (
    <>
      <Helmet>
        <title>Welcome to Amplify Hub</title>
        <meta name="description" content="Discover and connect with your favorite artists." />
      </Helmet>

      <div className="relative min-h-screen w-full overflow-hidden bg-black flex flex-col items-center justify-start text-center p-4 pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/40 via-black to-black"></div>
        <div className="absolute inset-0 opacity-10">
          <img
            className="w-full h-full object-cover"
            alt="Abstract background of vibrant soundwaves"
            src="https://images.unsplash.com/photo-1511379938547-c1f69419868d"
          />
        </div>

        <main className="relative z-10 flex flex-col items-center w-full max-w-4xl mx-auto">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
              Amplify Hub
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl">
              The ultimate experience — your portal to live concerts, exclusive content, and new discoveries.
            </p>
          </motion.div>

          {/* Featured Artists */}
          <h2 className="text-2xl font-bold text-purple-300 mb-6">Featured Artists</h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {artists.map((artist) => (
              <motion.div key={artist.id} variants={itemVariants}>
                <Link to={`/artist/${artist.id}`}>
                  <div className="bg-white/5 border border-purple-900/30 rounded-2xl p-4 flex items-center gap-4 hover:bg-purple-900/20 transition-all duration-300 glow-effect h-full">
                    <img
                      className="w-20 h-20 rounded-full object-cover border-2 border-purple-500"
                      alt={`${artist.name} profile picture`}
                      src="https://images.unsplash.com/photo-1591833330168-ddbc9ea80223"
                    />
                    <div>
                      <h3 className="text-xl font-bold text-left">{artist.name}</h3>
                      <p className="text-left text-sm text-gray-400">{artist.genre}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Auth Section */}
          {!isSignedIn ? (
            <div className="flex flex-col items-center gap-4">
              <p className="text-gray-400 flex items-center justify-center gap-2">
                <Users className="h-5 w-5" /> Sign in to join the movement
              </p>
              <div className="flex justify-center gap-4">
                <SignInButton mode="modal">
                  <Button variant="outline" className="border-gray-600 hover:bg-gray-800">
                    <Instagram className="h-5 w-5 text-pink-400" />
                  </Button>
                </SignInButton>
                <SignInButton mode="modal">
                  <Button variant="outline" className="border-gray-600 hover:bg-gray-800">
                    <Twitter className="h-5 w-5 text-blue-400" />
                  </Button>
                </SignInButton>
                <SignInButton mode="modal">
                  <Button variant="outline" className="border-gray-600 hover:bg-gray-800">
                    <Music className="h-5 w-5 text-green-400" />
                  </Button>
                </SignInButton>
                <SignInButton mode="modal">
                  <Button variant="outline" className="border-gray-600 hover:bg-gray-800">
                    <Youtube className="h-5 w-5 text-red-500" />
                  </Button>
                </SignInButton>
              </div>
            </div>
          ) : (
            <div className="text-center mt-6">
              <p className="text-purple-300 mb-4">
                Welcome back, {user?.fullName || user?.primaryEmailAddress?.emailAddress}!
              </p>
              <SignOutButton>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">Sign Out</Button>
              </SignOutButton>
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default LandingPage;
