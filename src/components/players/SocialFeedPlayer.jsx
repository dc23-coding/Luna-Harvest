import React from 'react';
import { motion } from 'framer-motion';
import { useArtistData } from '@/hooks/useArtistData';
import { Heart, MessageCircle, Send } from 'lucide-react';

const SocialFeedPlayer = () => {
  const { socialFeed, artistData, isLoading } = useArtistData();

  if (isLoading) {
    return <div className="aspect-video bg-black rounded-2xl flex items-center justify-center">Loading Social Feed...</div>;
  }
  
  if (!socialFeed || socialFeed.length === 0) {
    return <div className="aspect-video bg-black rounded-2xl flex items-center justify-center">No social posts available for this artist.</div>;
  }


  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="aspect-video rounded-2xl overflow-hidden bg-black glow-effect"
    >
      <div className="h-full w-full overflow-y-auto snap-y snap-mandatory scrollbar-hide">
        {socialFeed.map((post) => (
          <div key={post.id} className="h-full w-full snap-start relative flex items-center justify-center">
            <img class="w-full h-full object-cover" alt={post.caption} src="https://images.unsplash.com/photo-1578470155518-c5697b07e280" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-4 right-16 text-white">
              <p className="font-bold">{artistData.socialLinks.find(l=>l.platform === 'instagram')?.handle || artistData.name}</p>
              <p className="text-sm">{post.caption}</p>
            </div>
            <div className="absolute bottom-4 right-4 flex flex-col items-center gap-4 text-white">
              <button className="flex flex-col items-center">
                <Heart size={28} />
                <span className="text-xs">{post.likes}</span>
              </button>
              <button className="flex flex-col items-center">
                <MessageCircle size={28} />
                <span className="text-xs">{post.comments}</span>
              </button>
              <button>
                <Send size={28} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default SocialFeedPlayer;