import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Image as ImageIcon, Video } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const galleryItems = [
  { type: 'image', alt: 'Luna Starlight posing backstage' },
  { type: 'image', alt: 'Crowd at a concert with lights' },
  { type: 'video', alt: 'Short clip of a soundcheck' },
  { type: 'image', alt: 'Close-up of Luna Starlight singing' },
  { type: 'image', alt: 'Aerial view of the concert stage' },
  { type: 'image', alt: 'Luna Starlight with her band' },
  { type: 'video', alt: 'Music video behind-the-scenes' },
  { type: 'image', alt: 'Fan meet and greet photo' },
];

const GalleryPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <>
      <Helmet>
        <title>Gallery - Luna Harvest</title>
        <meta name="description" content="Exclusive photos and videos from Luna Starlight's journey." />
      </Helmet>
      <div className="min-h-screen bg-black p-4 sm:p-6">
        <header className="flex items-center justify-between mb-8">
          <Link to="/" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
            <ArrowLeft size={20} />
            <span className="font-semibold">Back to Home</span>
          </Link>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Gallery
          </h1>
        </header>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {galleryItems.map((item, index) => (
            <motion.div
              key={index}
              className="relative aspect-square rounded-lg overflow-hidden group glow-effect"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <img className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" alt={item.alt} src="https://images.unsplash.com/photo-1626032751364-13868589f0b0" />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />
              <div className="absolute top-2 right-2 bg-black/50 rounded-full p-1.5">
                {item.type === 'image' ? (
                  <ImageIcon size={16} className="text-white" />
                ) : (
                  <Video size={16} className="text-white" />
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </>
  );
};

export default GalleryPage;