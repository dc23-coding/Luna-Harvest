
import React from 'react';
import { motion } from 'framer-motion';
import { Users, MapPin } from 'lucide-react';

const ArtistInfo = ({ artist }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <div className="relative">
        <img class="w-full h-48 object-cover rounded-xl" alt="Artist profile photo with stage lighting" src="https://images.unsplash.com/photo-1443744741613-bd24aba5004e" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent rounded-xl" />
        <div className="absolute bottom-4 left-4 right-4">
          <h2 className="text-2xl font-bold">{artist.name}</h2>
          <p className="text-sm text-gray-300">{artist.genre}</p>
        </div>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2 text-gray-300">
          <Users size={16} className="text-purple-400" />
          <span>{artist.followers} followers</span>
        </div>
        <div className="flex items-center gap-2 text-gray-300">
          <MapPin size={16} className="text-purple-400" />
          <span>{artist.location}</span>
        </div>
      </div>

      <p className="text-sm text-gray-400 leading-relaxed">
        {artist.bio}
      </p>
    </motion.div>
  );
};

export default ArtistInfo;
